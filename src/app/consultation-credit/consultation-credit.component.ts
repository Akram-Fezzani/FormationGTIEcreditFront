import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
;
import { Nature } from 'src/app/models/Nature';
import { Devise } from 'src/app/models/Devise';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeGarantie } from 'src/app/models/TypeGarantie';
import { MessageService, SelectItem } from 'primeng/api';
import { Garantie } from 'src/app/models/Garantie';
import { DemandeCreditService } from '../components/service/DemandeService/demande-credit.service';
import { GarantieDto } from '../models/Dto';
import { GarantieDialogComponent } from '../components/garantie-dialog/garantie-dialog.component';
import { SituationFamiliale } from '../models/SituationFamiliale';
@Component({
  selector: 'app-consultation-credit',
  templateUrl: './consultation-credit.component.html',
  styleUrls: ['./consultation-credit.component.css']
})
export class ConsultationCreditComponent implements OnInit {

  constructor(private dc:DemandeCreditService,private fb: FormBuilder,private dialogService: DialogService,private messageService: MessageService) { }
  dto!:GarantieDto[];
  visible: boolean = false;
  garantieForm!: FormGroup;
  form!: FormGroup;

  getDemandeCredit(){
        this.dc.getDemandeCredit().subscribe( (data:GarantieDto[]) =>{
        this.dto=data;
        console.log(this.dto)
    },
    (error:any) => console.log(error)); 
}

hideDialog() {
  this.visible = false;
}
showDialog(dto:any) {
        this.visible = true;
        console.log(dto)
        this.getSituationFamilialeByCin(dto);
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
(error:any) => console.log(error));  }

acceptCredit(id:string) {
  this.dc.acceptCredit(id).subscribe( (data:any) =>{
     // this.ngOnInit();
      this.getDemandeCredit()

  },
(error:any) => console.log(error));  }

getSituationFamilialeByCin(dto:any) {
  this.dc.getSituationFamilialeByCin(dto.clientDto.cin).subscribe(
    (data: SituationFamiliale) => {
    //  console.log(data.situationf);
      this.form.patchValue({
        situationFamiliale: data.situationf,
      });
    },
    (error: any) => console.log(error)
  );
}

  ngOnInit(): void {
      this.form = this.fb.group({
        cin: [
          { value: '', disabled: true }, [Validators.required],
        ],
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
