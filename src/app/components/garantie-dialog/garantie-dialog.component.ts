import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeGarantie } from '../models/TypeGarantie';
import { DemandeCreditService } from '../service/DemandeService/demande-credit.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Nature } from '../models/Nature';
import { Devise } from '../models/Devise';

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
  constructor(private dc:DemandeCreditService,private fb: FormBuilder,private _router:Router) { }


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

onSubmit(): void {
  this.submitted = true;
  if (this.form.invalid) {
      return;
  }
  console.log(JSON.stringify(this.form.value, null, 2));
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
      montant: [
        '', 
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
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
