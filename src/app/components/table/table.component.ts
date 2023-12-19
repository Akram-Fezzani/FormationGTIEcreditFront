import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GarantieDialogComponent } from '../garantie-dialog/garantie-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private dialogService: DialogService) { }
  openDialog() {
    const ref: DynamicDialogRef = this.dialogService.open(GarantieDialogComponent, {
     width: '70%',
     height:'47%',
     contentStyle: { 'max-height': '500px', overflow: 'auto' },
     baseZIndex: 10000,
     data: { display: true }, 
   });
   ref.onClose.subscribe((result: any) => {
     console.log('Dialog is about to close with result:', result);
   });
    }
  ngOnInit(): void {
  }

}
