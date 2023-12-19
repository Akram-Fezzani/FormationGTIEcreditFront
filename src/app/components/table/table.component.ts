import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GarantieDialogComponent } from '../garantie-dialog/garantie-dialog.component';
import { DemandeCreditService } from '../service/DemandeService/demande-credit.service';
import { GarantieDto } from '../../models/GarantieDto';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private dc:DemandeCreditService,private dialogService: DialogService) { }
  dto!:GarantieDto[];



getTypeGarantie(){
    this.dc.getGarantieParCredit("5").subscribe( (data:GarantieDto[]) =>{
        this.dto=data;
        console.log(this.dto)

    },
    (error:any) => console.log(error)); 
}
  
  
Delete(id:string) {
    this.dc.deleteGarantie(id).subscribe( (data:any) =>{
        this.ngOnInit();
    },
  (error:any) => console.log(error));  }

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
    this. getTypeGarantie()
  }
}
