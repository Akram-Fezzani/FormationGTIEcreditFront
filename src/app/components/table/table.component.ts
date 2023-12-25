import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GarantieDialogComponent } from '../garantie-dialog/garantie-dialog.component';
import { DemandeCreditService } from '../service/DemandeService/demande-credit.service';
import { GarantieDto } from '../../models/GarantieDto';
import { Nature } from 'src/app/models/Nature';
import { Devise } from 'src/app/models/Devise';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeGarantie } from 'src/app/models/TypeGarantie';
import { MessageService, SelectItem } from 'primeng/api';
import { Garantie } from 'src/app/models/Garantie';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private dc:DemandeCreditService,private fb: FormBuilder,private dialogService: DialogService,private messageService: MessageService) { }
  dto!:GarantieDto[];
  visible: boolean = false;
  natures: Nature[] = [];
  nature:any
  devises: Devise[] = [];
  devise:any
  garantieForm!: FormGroup;
  typeGars: TypeGarantie[] = [];
  typeGar:any
  listData!: SelectItem[];
  garantie: Garantie=new Garantie();
getTypeGaranties(){
        this.dc.getGarantieParCredit("5").subscribe( (data:GarantieDto[]) =>{
        this.dto=data;

    },
    (error:any) => console.log(error)); 
}
getTypeGarantie(){
      this.dc.getTypeGarantie().subscribe( (data:TypeGarantie[]) =>{
      this.typeGars=data;
      this.listData = data.map(typeGars => ({label: typeGars.id, value: typeGars.typeGarantie}));

  },
  (error:any) => console.log(error)); 
}
getNature(){
    this.dc.getNature().subscribe( (data:Nature[]) =>{
    this.natures=data;
   this.listData = data.map(natures => ({label: natures.id, value: natures.nature}));

},
    (error:any) => console.log(error)); 
}
getDevise(){
  this.dc.getDevise().subscribe( (data:Devise[]) =>{
      this.devises=data;
      this.listData = data.map(devises => ({label: devises.id, value: devises.devise}));
},
(error:any) => console.log(error)); 
}
UpdateGarantie(){
  const garantieData = this.garantieForm.value;
  this.garantie.devise=garantieData.devise.id;
  this.garantie.nature=garantieData.nature.id;
  this.garantie.valeur=garantieData.valeur;
  this.garantie.type=garantieData.typeGar.id;
  this.garantie.id=garantieData.id
  this.garantie.creditId=5
  this.dc.updateGarantie(this.garantie,this.garantie.id).subscribe( (data:any) =>{
    this.hideDialog();
    this.showToast();
    this.getTypeGaranties();
    },
  (error:any) => console.log(error)); 
}
showToast() {
      this.messageService.add({
        severity: 'success',
        summary: 'Garantie',
        detail: 'La garantie a été bien modifié'
      });
}
Delete(id:string) {
    this.dc.deleteGarantie(id).subscribe( (data:any) =>{
        this.ngOnInit();
    },
  (error:any) => console.log(error));  
}
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
hideDialog() {
  this.visible = false;
}
showDialog(dto:any) {
        this.visible = true;
        this.garantieForm.patchValue({
            valeur: dto.valeur,
            typeGar: dto.typeGar,
            nature: dto.nature,
            devise:dto.devise,
            id:dto.idGarantie
        });
}
ngOnInit(): void {
    this.garantieForm = this.fb.group({
      valeur: [
        '', 
        ],   
      typeGar: [
        '',
        ],
      nature: [
        '',
        ],
      devise: [
          '',
          ],
      id: [
        '',
        ],
      });
    this. getTypeGarantie();
    this. getTypeGaranties();
    this.getNature();
    this.getDevise();
}
}
