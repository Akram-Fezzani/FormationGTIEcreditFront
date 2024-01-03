import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DemandeCreditService } from '../service/DemandeService/demande-credit.service';
import { SituationFamiliale } from '../../models/SituationFamiliale';
import { Unite } from '../../models/Unite';
import { TypeCredit } from '../../models/TypeCredit';
import { GarantieDto } from '../../models/Dto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consultation-credit',
  templateUrl: './consultation-credit.component.html',
  styleUrls: ['./consultation-credit.component.css']
})
export class ConsultationCreditComponent implements OnInit {

  constructor(
    private dc:DemandeCreditService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private messageService: MessageService,
    private _router: Router
  ) { }
  dto!:GarantieDto[];
  visible: boolean = false;
  garantieForm!: FormGroup;
  form!: FormGroup;
  Unite!:Unite;
  typeCredit!:TypeCredit;
getDemandeCredit(){
        this.dc.getDemandeCredit().subscribe( (data:GarantieDto[]) =>{
        this.dto=data;
    },
    (error:any) => console.log(error)); 
}
generatePdf(Id:any){
  this.dc.generatePdf(Id).subscribe( (data:any) =>{
},
(error:any) => console.log(error)); 
}
getTypeCresitById(Id:any){
  this.dc.getTypeCresitById(Id).subscribe( (data:any) =>{
  this.typeCredit=data;
},
(error:any) => console.log(error)); 
}
getUniteById(Id:any){
  this.dc.getUniteById(Id).subscribe( (data:any) =>{
  this.dto=data;
},
(error:any) => console.log(error)); 
}
getTypeCreditById(Id:any){
  this.dc.getTypeCreditById(Id).subscribe( (data:any) =>{
  this.typeCredit=data;
  this.form.patchValue({
    type:this.typeCredit.typeCredit
});
},
(error:any) => console.log(error)); 
}
getUniteCreditById(Id:any){
  this.dc.getUniteCreditById(Id).subscribe( (data:any) =>{
  this.Unite=data;
  this.form.patchValue({
    unite:this.Unite.unite
});},
(error:any) => console.log(error)); 
}
hideDialog() {
  this.visible = false;
}
showDialog(dto:any) {
        this.visible = true;
        this.getTypeCreditById(dto.creditDto.type);
        this.getSituationFamilialeByCin(dto);
        //this.getUniteById(dto.creditDto.unite);
        this.getTypeCreditById(dto.creditDto.type);
        this.getUniteCreditById(dto.creditDto.unite)
        this.form.patchValue({
            nom:dto.clientDto.nom,
            prenom:dto.clientDto.prenom,
            cin:dto.clientDto.cin,
            situationFamiliale:dto.clientDto.situationFamiliale,
            dateNs:new Date(dto.clientDto.dateNs),
            compte:dto.compteDto.numcompte,
            dateOuverture:new Date(dto.compteDto.dateOuverture),
            montant:dto.creditDto.montant,
            echeance:dto.creditDto.nbrEcheance,
            entreeRelation:new Date(dto.creditDto.entreeRelation),
            Par:dto.creditDto.par,
            Observation:dto.creditDto.observation,
        });
}
deleteDemande(id:string) {
        this.dc.deleteDemande(id).subscribe( (data:any) =>{
            this.ngOnInit();
            this.getDemandeCredit()
        },
(error:any) => console.log(error));  
}
acceptCredit(id:string) {
  this.dc.acceptCredit(id).subscribe( (data:any) =>{
     // this.ngOnInit();
      this.getDemandeCredit()

  },
(error:any) => console.log(error));  
}
getSituationFamilialeByCin(dto:any) {
  this.dc.getSituationFamilialeByCin(dto.clientDto.cin).subscribe(
    (data: SituationFamiliale) => {
      this.form.patchValue({
        situationFamiliale: data.situationf,
      });
    },
    (error: any) => console.log(error)
  );
}
changepage(){
  this._router.navigate(['/demande']);
}
ngOnInit(): void {
      this.form = this.fb.group({
        cin: [{ value: '', disabled: true }, [Validators.required], ],
        nom: [{ value: '', disabled: true }, Validators.required],
        prenom: [{ value: '', disabled: true }, Validators.required],
        situationFamiliale: [{ value: '', disabled: true }, Validators.required],
        compte: [{ value: '', disabled: true }  , Validators.required],
        type: [{ value: '', disabled: true }, Validators.required],
        unite: [{ value: '', disabled: true }, Validators.required],
        echeance: [{ value: '', disabled: true }, Validators.required],
        Par: [{ value: '', disabled: true }, Validators.required],
        Observation: [{ value: '', disabled: true }, Validators.required],
        entreeRelation: [{ value: '', disabled: true }, Validators.required],
        montant: [{ value: '', disabled: true }, Validators.required],
        dateOuverture: [{ value: '', disabled: true }, Validators.required],
        dateNs:  [{ value: '', disabled: true }, Validators.required], 
      });
    this. getDemandeCredit();
}
}
