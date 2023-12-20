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
import { Dto } from 'src/app/models/Dto';
import { ClientDto } from 'src/app/models/ClientDto';


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
  dateOuverture!:any;
  dto!:ClientDto;
  selectedAccount: Compte | undefined;
  formClient!: FormGroup;
  selectedCompte: any = {};
  constructor(
    private _router: Router,
    private dc: DemandeCreditService,
    private fb: FormBuilder
  ) {}

postDto(){
  const garantieData = this.form.value;
 // console.log(garantieData)
  /*this.dto.cin=garantieData.cin;
  this.dto.nom=garantieData.nom;
  this.dto.prenom=garantieData.prenom;
  this.dto.dateNs=garantieData.dateNs;*/
  //this.dto.ClientDto.situationFamilialeId=garantieData.situationFamilialeId;
/*
  this.dto.CompteDto.numcompte=garantieData.numcompte;
  //this.dto.CompteDto.deviseId=garantieData.deviseId;
  this.dto.CompteDto.dateOuverture=garantieData.dateOuverture;

  this.dto.CreditDto.montant=garantieData.valeur;
  this.dto.CreditDto.nbrEcheance=garantieData.nbrEcheance;
  //this.dto.CreditDto.typeCreditId=garantieData.typeCreditId;
  //this.dto.CreditDto.uniteId=garantieData.uniteId;
  this.dto.CreditDto.observation=garantieData.observation;
  this.dto.CreditDto.entreeRelation=garantieData.entreeRelation;
  this.dto.CreditDto.par=garantieData.par;
  this.dto.CreditDto.status=garantieData.status;
console.log(this.dto)*/

}
getClient() {
              this.dc.getClient(this.form.controls.cin.value).subscribe(
                (data: Client) => {
                  console.log(data);
                  this.client = data;
                  this.form.patchValue({
                    cin: data.cin,
                    nom: data.nom,
                    prenom: data.prenom,
                    dateNs:new Date(data.dateNs),
                  });
                  this.getCompteByClientCin();
                  this.getSituationFamilialeByCin();
                },
                (error: any) => console.log(error)
              );
}
getSituationFamilialeByCin() {
            this.dc.getSituationFamilialeByCin(this.form.controls.cin.value).subscribe(
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

            this.dc.getCompteByClientCin(this.form.controls.cin.value).subscribe(
              (data: Compte[]) => {
                console.log(data);
                this.comptes = data;
                this.listData = data.map((comptes) => ({
                  label: comptes.id,
                  value: comptes.numcompte,
                  //dateOuverture: new Date(comptes.dateOuverture),
                }));
              },
              (error: any) => console.log(error)
            );
}
onSelectAccount(compte: Compte) {
  this.selectedAccount = { ...compte };
  this.form.patchValue({
  //  devise: compte.devise,
  dateOuverture: new Date(compte.dateOuverture),
  });
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
  this.postDto()
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
      Observation: ['', Validators.required],
      entreeRelation: ['', Validators.required],
      montant: ['', Validators.required],
      dateOuverture: [{ value: '', disabled: true }, Validators.required],
      dateNs:  [{ value: '', disabled: true }, Validators.required], 
    });
    this.getTypeCredit();
    this.getUnite();
    this.getPiece();
    
}
}  
