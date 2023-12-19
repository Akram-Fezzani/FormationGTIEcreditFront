import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeCreditService } from '../service/DemandeService/demande-credit.service';
import { Client } from '../../models/Client';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Compte } from '../../models/Compte';
import { SituationFamiliale } from '../../models/SituationFamiliale';
import { TypeCredit } from '../../models/TypeCredit';
import { Unite } from '../../models/Unite';
import { Piece } from 'src/app/models/Piece';


@Component({
  selector: 'app-demande-de-credit',
  templateUrl: './demande-de-credit.component.html',
  styleUrls: ['./demande-de-credit.component.css'],
})
export class DemandeDeCreditComponent implements OnInit {
  types: TypeCredit[] = [];
  type: any;
  comptes: Compte[] = [];
  compte: any;
  unites: Unite[] = [];
  unite: any;
  echeance!: any;
  client!: Client;
  form!: FormGroup;
  submitted = false;
  listData!: SelectItem[];
  piece!:Piece[]

  constructor(
    private _router: Router,
    private dc: DemandeCreditService,
    private fb: FormBuilder
  ) {}

getClient() {
              this.dc.getClient('50').subscribe(
                (data: Client) => {
                  console.log(data);
                  this.client = data;
                  this.form.patchValue({
                    cin: data.cin,
                    nom: data.nom,
                    prenom: data.prenom,
                  });
                },
                (error: any) => console.log(error)
              );
  }

getSituationFamilialeByCin() {
            this.dc.getSituationFamilialeByCin('50').subscribe(
              (data: SituationFamiliale) => {
                console.log(data.situationf);
                this.form.patchValue({
                  situationFamiliale: data.situationf,
                });
              },
              (error: any) => console.log(error)
            );
  }
getCompteByClientCin() {
            this.dc.getCompteByClientCin('50').subscribe(
              (data: Compte[]) => {
                console.log(data);
                this.comptes = data;
                this.listData = data.map((comptes) => ({
                  label: comptes.id,
                  value: comptes.numcompte,
                }));
              },
              (error: any) => console.log(error)
            );
}

getTypeCredit() {
          this.dc.getTypeCrdit().subscribe(
            (data: TypeCredit[]) => {
              console.log(data);
              this.types = data;
              this.listData = data.map((types) => ({
                label: types.id,
                value: types.typeCredit,
              }));
            },
            (error: any) => console.log(error)
          );
  }


  
getPiece(){
          this.dc.getPiece().subscribe( (data:Piece[]) =>{
              this.piece=data;
              console.log(this.piece)
          },
          (error:any) => console.log(error)); 
        }

getUnite() {
        this.dc.getUnite().subscribe(
          (data: Unite[]) => {
            console.log(data);
            this.unites = data;
            this.listData = data.map((unites) => ({
              label: unites.id,
              value: unites.unite,
            }));
          },
          (error: any) => console.log(error)
        );
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
onFileUpload(event: any) {
  // Handle the response if needed
  console.log(event);
}


  ngOnInit() {
    this.getClient();
    this.getCompteByClientCin();
    this.getSituationFamilialeByCin();
    this.getTypeCredit();
    this.getUnite();
    this.getPiece();
    this.form = this.fb.group({
      cin: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      nom: [{ value: '', disabled: true }, Validators.required],
      prenom: [{ value: '', disabled: true }, Validators.required],
      situationFamiliale: [{ value: '', disabled: true }, Validators.required],
      compte: ['', Validators.required],
      type: ['', Validators.required],
      unite: ['', Validators.required],
      echeance: ['', Validators.required],
      Par: ['', Validators.required],
      entreeRelation: ['', Validators.required],
      //selectedfile: ['', Validators.required],
    });
  }
}  
