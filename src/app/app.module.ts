import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemandeDeCreditComponent } from './components/demande-de-credit/demande-de-credit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { GarantieDialogComponent } from './components/garantie-dialog/garantie-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; // Import MessageService here
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ConsultationCreditComponent } from './components/consultation-credit/consultation-credit.component';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    AppComponent,
    DemandeDeCreditComponent,
    TableComponent,
    GarantieDialogComponent,
    ConsultationCreditComponent,
    
  ],
  imports: [
    BrowserModule,
    CheckboxModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    ChartModule,
    DividerModule,
    //FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    TableModule, 
    ProgressSpinnerModule,
    CalendarModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule,
    FieldsetModule,
    FormsModule,
    DialogModule,
    HttpClientModule
  ],
  providers: [DialogService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
