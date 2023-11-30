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

@NgModule({
  declarations: [
    AppComponent,
    DemandeDeCreditComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    //FormsModule,
    //ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TableModule, 
    ProgressSpinnerModule,
    CalendarModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule,
    FieldsetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
