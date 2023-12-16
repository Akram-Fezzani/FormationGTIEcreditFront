import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeCreditService } from '../service/DemandeService/demande-credit.service';
import { Client } from '../models/Client';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Compte } from '../models/Compte';

@Component({
  selector: 'app-demande-de-credit',
  templateUrl: './demande-de-credit.component.html',
  styleUrls: ['./demande-de-credit.component.css']
})
export class DemandeDeCreditComponent implements OnInit {
  typeCredit:any
  compte:any
  client!:Client;
  comptes: Compte[] = [];
  form!: FormGroup;
  submitted = false;
  listData!: SelectItem[];

  constructor(private _router:Router , private dc:DemandeCreditService,private fb: FormBuilder) { }

getClient(){
        this.dc.getClient("50").subscribe( (data:Client) =>{
            console.log(data)
            this.client=data;
        },
        (error:any) => console.log(error));
}

getCompteByClientCin(){
        this.dc.getCompteByClientCin("50").subscribe( (data:Compte[]) =>{
            console.log(data)
            this.comptes=data;
           this.listData = data.map(comptes => ({label: comptes.id, value: comptes.numcompte}));
           //this.compte = data;

        },
        (error:any) => console.log(error)); 
}

getTypeCredit(){
        this.dc.getTypeCrdit().subscribe( (data:any[]) =>{
            console.log(data)
            this.typeCredit=data;
           this.listData = data.map(typeCredit => ({label: typeCredit.id, value: typeCredit.typeCredt}));
           //this.compte = data;

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

get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
}
     
onReset(): void {
        this.submitted = false;
        this.form.reset();
}

ngOnInit() {
    this.getTypeCredit()
        this.getClient();
        this.getCompteByClientCin();
        this.form = this.fb.group({
            cin: [
                '', 
                [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
                ],
            nom: [
                '', 
                [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
                ],
            prenom: [
                '', 
                [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
                ],
            compte: [
                '',
                Validators.required
                ],
        });
}
 
}