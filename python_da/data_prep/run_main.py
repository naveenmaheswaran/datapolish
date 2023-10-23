import os
import io
import logging
import time
import json
import pandas as pd
from azure.core.exceptions import AzureError
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from azure.servicebus import ServiceBusClient, ServiceBusMessage
from data_prep import DataPrep
from azure_package.src.azure_functions import (download_blob_csv_data, 
                                               upload_result_csv_to_azure,
                                               receive_message_from_queue)

# Set up logging
logger = logging.getLogger('data-prep')
logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

# Load configuration from JSON file
with open('python_da/pyconfigurations/azure_config.json', 'r') as file:
    config = json.load(file)

SERVICE_BUS_CONNECTION_STRING = config["SERVICE_BUS_CONNECTION_STRING"]
SERVICE_BUS_QUEUE_NAME = config["SERVICE_BUS_QUEUE_1_NAME"]
connection_string = config["AZURE_CONNECTION_STRING"]

if connection_string is None:
    raise Exception("Failed to get connection string from environment variable")

container_name_data_input = config["DATA_INPUT_CONTAINER"]


def apply_transformations(dataset: pd.DataFrame) -> pd.DataFrame:
    """
    Apply transformations to the dataset using the functionalities defined in the DataPrep class.
    Parameters:
    dataset (pd.DataFrame): The dataset to transform.
    Returns:
    pd.DataFrame: The transformed dataset.
    """
    if not isinstance(dataset, pd.DataFrame):
        logging.error('Provided dataset is not a pandas DataFrame')
        raise TypeError('Expected dataset to be a pandas DataFrame')
    try:
        prep = DataPrep(dataset)
        prep.remove_duplicates()
    except Exception as e:
        logging.error(f'Error occurred during transformation: {e}')
        raise e

    logging.info('Data transformations applied successfully')
    return prep.dataframe


def main():
    while True:
        try:
            logger.info('Checking for new messages...')

            # Receiving a message from the queue to get a new blob or file for processing.
            msg = receive_message_from_queue(SERVICE_BUS_CONNECTION_STRING, SERVICE_BUS_QUEUE_NAME)
            logger.info(msg)
            
            if msg is not None:
                filename = msg['filename']  # Adjust the key as per your message structure.
                logger.info(f'Received message with filename: {filename}')

                data = download_blob_csv_data(connection_string=connection_string, container_name=container_name_data_input, blob_name=filename)
                result = apply_transformations(data)
                upload_result_csv_to_azure(result, connection_string=connection_string)
                
                logger.info('Clean data uploaded in data prep')
            else:
                logger.info('No new messages. Waiting for next check...')
            
            # Wait for a while before checking again, to not overwhelm your resources.
            time.sleep(60)  # waits for 60 seconds before checking again

        except AzureError as ae:
            logger.error(f"AzureError: {str(ae)}")
        except pd.errors.EmptyDataError as ede:
            logger.error(f"Pandas EmptyDataError: {str(ede)}")
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")

if __name__ == '__main__':
    main()

