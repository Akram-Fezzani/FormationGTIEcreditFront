import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeGarantie } from '../models/TypeGarantie';
import { DemandeCreditService } from '../service/DemandeService/demande-credit.service';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Nature } from '../models/Nature';
import { Devise } from '../models/Devise';
import { Garantie } from '../models/Garantie';

@Component({
  selector: 'app-garantie-dialog',
  templateUrl: './garantie-dialog.component.html',
  styleUrls: ['./garantie-dialog.component.css']
})
export class GarantieDialogComponent implements OnInit {
  gar!:any;
  form!: FormGroup;
  garantieForm!: FormGroup;
  display: boolean = false;
  listData!: SelectItem[];
  typeGars: TypeGarantie[] = [];
  typeGar:any
  submitted = false;
  natures: Nature[] = [];
  nature:any
  devises: Devise[] = [];
  devise:any
  garantie: Garantie=new Garantie();

  constructor(private dc:DemandeCreditService,private fb: FormBuilder,private _router:Router,private messageService: MessageService) { }


  getTypeGarantie(){
    this.dc.getTypeGarantie().subscribe( (data:TypeGarantie[]) =>{
        console.log(data)
        this.typeGars=data;
       this.listData = data.map(typeGars => ({label: typeGars.id, value: typeGars.typeGarantie}));

    },
    (error:any) => console.log(error)); 
}

getNature(){
  this.dc.getNature().subscribe( (data:Nature[]) =>{
      console.log(data)
      this.natures=data;
     this.listData = data.map(natures => ({label: natures.id, value: natures.nature}));

  },
  (error:any) => console.log(error)); 
}

getDevise(){
  this.dc.getDevise().subscribe( (data:Devise[]) =>{
      console.log(data)
      this.devises=data;
     this.listData = data.map(devises => ({label: devises.id, value: devises.devise}));

  },
  (error:any) => console.log(error)); 
}

addGarantie(){
  const garantieData = this.garantieForm.value;
  this.garantie.devise=garantieData.devise.id;
  this.garantie.nature=garantieData.nature.id;
  this.garantie.valeur=garantieData.valeur;
  this.garantie.type=garantieData.typeGar.id;
  this.dc.addGarantie(this.garantie).subscribe( (data:any) =>{
    console.log(data);
    this.showToast()
    
    },
    (error:any) => console.log(error));  }
showToast() {
      this.messageService.add({
        severity: 'success',
        summary: 'Garantie',
        detail: 'La garantie a été bien ajouté'
      });
}




onReset(): void {
  this.submitted = false;
  this.form.reset();
}
  ngOnInit() {
    this.getTypeGarantie()
    this.getNature()
    this.getDevise()
    this.garantieForm = this.fb.group({
      valeur: [
        '', 
        Validators.required,
        ],   
      typeGar: [
        '',
        Validators.required
        ],
      nature: [
        '',
        Validators.required
        ],
      devise: [
          '',
          Validators.required
          ],
      });
  }
}
