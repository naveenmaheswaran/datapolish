import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { Routes, RouterModule } from '@angular/router';
import { DataProfileComponent } from './data-profile/data-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ExportComponent } from './export/export.component'; // CLI imports router
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { DataCleaningComponent } from './data-cleaning/data-cleaning.component'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SidebarModule } from 'primeng/sidebar';
import {CookieService} from 'ngx-cookie-service';
import { TerminalModule, TerminalService } from 'primeng/terminal';
import { DockModule } from 'primeng/dock';
import { FormsModule } from '@angular/forms';
import { MissingValuesChartComponent } from './D3/missing-values-chart/missing-values-chart.component';
import { DataTypesChartComponent } from './D3/data-types-chart/data-types-chart.component';
import { AppSettings, constants2 } from './Const/config';
import { NewHomeComponent } from './new-home/new-home.component';
import { SetpsHomeComponent } from './setps-home/setps-home.component';
import { NavigatationService } from './Services/navigate/navigatation.service';
import { TabViewModule } from 'primeng/tabview';
import { StepsModule } from 'primeng/steps';
import { SpeedDialModule } from 'primeng/speeddial';
import { DataPreviewComponent } from './data-preview/data-preview.component';
import { SplitterModule } from 'primeng/splitter';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { RulesComponent } from './data-cleaning/rules/rules.component';
import { CardinalityComponent } from './D3/cardinality/cardinality.component';
import { DuplicateChartComponent } from './D3/duplicate-chart/duplicate-chart.component';
import { NumberFieldsChartComponent } from './D3/number-fields-chart/number-fields-chart.component';
import { RecordsChartComponent } from './D3/records-chart/records-chart.component';
import { OutliersComponent } from './outliers/outliers.component';
import { D3DashboardService } from './Services/D3/d3-dashboard.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SpiderChartComponent } from './D3/spider-chart/spider-chart.component';
import { DataQualityMetricComponent } from './D3/data-quality-metric/data-quality-metric.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AdvanceOptionsButtonComponent } from './data-cleaning/rules/nested-components/advance-options-button/advance-options-button.component';
import { DropdownModule } from 'primeng/dropdown';
import { OutliersScatterPlotComponent } from './D3/outliers-scatter-plot/outliers-scatter-plot.component';
import { CorrelationScatterPlotComponent } from './D3/correlation-scatter-plot/correlation-scatter-plot.component';
import { HistogramComponent } from './D3/histogram/histogram.component';

import { BubbleChartComponent } from './D3/bubble-chart/bubble-chart.component';
import { CompletenessMetricComponent } from './D3/completeness-metric/completeness-metric.component';
import { ConsistencyMetricComponent } from './D3/consistency-metric/consistency-metric.component';
import { ReadabilityMetricComponent } from './D3/readability-metric/readability-metric.component';
import { UniquenessMetricComponent } from './D3/uniqueness-metric/uniqueness-metric.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabMenuModule } from 'primeng/tabmenu';
import { ChipsModule } from 'primeng/chips';
import { constants } from './Const/config';
import { TokenInterceptor } from './Services/token.interceptor';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import {MatTabsModule} from '@angular/material/tabs';
const routes: Routes = [
    {path:'',redirectTo:'/1',pathMatch:'full'},
    {path:'newjob',component:SetpsHomeComponent},
    {path:'1',component:UploadFileComponent},
    {path:'2',component:DataPreviewComponent},
    {path:'3',component:DataProfileComponent},
    {path:'4',component:DataCleaningComponent},
    {path:'5',component:ExportComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    DataProfileComponent,
    HomePageComponent,
    ExportComponent,
    DataCleaningComponent,   
    DataTypesChartComponent,
    NewHomeComponent,
    SetpsHomeComponent,
    DataPreviewComponent,
    RulesComponent,
    MissingValuesChartComponent,
    CardinalityComponent,
    DuplicateChartComponent,
    NumberFieldsChartComponent,
    RecordsChartComponent,
    SetpsHomeComponent,
    DataPreviewComponent,
    RulesComponent,
    OutliersComponent,
    OutliersScatterPlotComponent,
    AdvanceOptionsButtonComponent,
    SpiderChartComponent,
    DataQualityMetricComponent,
    CorrelationScatterPlotComponent,
    HistogramComponent,
    BubbleChartComponent,
    CompletenessMetricComponent,
    ConsistencyMetricComponent,
    ReadabilityMetricComponent,
    UniquenessMetricComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{useHash: true}),
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule,
    TabMenuModule,
    InputTextModule,
    ContextMenuModule,
    SidebarModule,
    TerminalModule,
    DockModule,
    FormsModule,
    MultiSelectModule,
    TabViewModule,
    MatTabsModule,
    StepsModule,
    SliderModule,
    SpeedDialModule,
    SplitterModule,
    AgGridModule,
    ColorPickerModule,
    ProgressSpinnerModule,
    CheckboxModule,
    DropdownModule,
    SelectButtonModule,
    ScrollPanelModule,
    ChipsModule
    
  ],
  providers: [
    MessageService,
    CookieService,
    TerminalService,
    NavigatationService,
    D3DashboardService,
    constants,
    constants2
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }