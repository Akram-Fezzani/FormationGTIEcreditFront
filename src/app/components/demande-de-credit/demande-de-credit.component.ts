import { Component, OnInit } from '@angular/core';
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
import { CreditDto, Dto } from 'src/app/models/Dto';
import { ClientDto } from 'src/app/models/ClientDto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-demande-de-credit',
  templateUrl: './demande-de-credit.component.html',
  styleUrls: ['./demande-de-credit.component.css'],
})
export class DemandeDeCreditComponent implements OnInit {
  postdto!:Client;
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
  dto: CreditDto = new CreditDto();
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
  this.dto = this.dto || {};
  this.dto.montant=garantieData.montant;
  this.dto.nbrEcheance=garantieData.echeance;
  this.dto.type=garantieData.type.id;
  this.dto.unite=garantieData.unite.id;
  this.dto.observation=garantieData.Observation;
  this.dto.entreeRelation=garantieData.entreeRelation;
  this.dto.par=garantieData.Par;
  this.dto.status=false;
  this.dto.compteId=garantieData.compte.id
  this.dto.dateDemande=garantieData.entreeRelation;
  console.log(this.dto);
  this.dc.addDemande(this.dto).subscribe( (data:any) =>{
    console.log(data);
    //this.showToast()

    },
    (error:any) => console.log(error));  
}
getClient() {
              this.dc.getClient(this.form.controls.cin.value).subscribe(
                (data: Client) => {
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
              //  console.log(data.situationf);
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
              //  console.log(data);
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
            //  console.log(data);
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
             // console.log(this.piece)
          },
          (error:any) => console.log(error)); 
}
getUnite() {
        this.dc.getUnite().subscribe(
          (data: Unite[]) => {
          //  console.log(data);
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
 // console.log(event);
}
changepage(){
  this._router.navigate(['/consultation']);

}
ngOnInit() {
    this.form = this.fb.group({
      cin: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      situationFamiliale: ['', Validators.required],
      compte: ['', Validators.required],
      type: ['', Validators.required],
      unite: ['', Validators.required],
      echeance: ['', Validators.required],
      Par: ['', Validators.required],
      Observation: ['', Validators.required],
      entreeRelation: ['', Validators.required],
      montant: ['', Validators.required],
      dateOuverture: ['', Validators.required],
      dateNs:  ['', Validators.required], 
    });
    this.getTypeCredit();
    this.getUnite();
    this.getPiece();
    
}
}  
