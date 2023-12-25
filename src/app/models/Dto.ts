import { TypeCredit } from "./TypeCredit";

export class Dto {

    ClientDto!: ClientDto;
	CompteDto!:CompteDto;
	CreditDto!:CreditDto;
    //GarantieDto!:GarantieDto;
	//PieceJointeDto!:PieceJointeDto;

}

export class ClientDto {
    id!:string;
    cin!: string;
	nom!:string;
	prenom!:string;
    dateNs!:Date;
	situationFamilialeId!:string;
}
export class CompteDto {
    numcompte!: string;
	deviseId!:string;
    dateOuverture!:Date;
    clientId!:string
}

export class CreditDto {
    montant!: number;
	nbrEcheance!:number;
    type!:TypeCredit;
    unite!: number;
	observation!:string;
    entreeRelation!:Date;
    dateDemande!:Date;
    par!:string;
    status!:boolean;
    compteId!:string;
}


export class GarantieDto {
    natureId!: string;
	typeGarantieId!:string;
    deviseGarantieId!:string;
    valeur!: number;
}

export class PieceJointeDto {
    document!: string;
	fileName!:string;
    obligatoire!:boolean;
    status!: boolean;
	fileSize!:number;
    filePath!:string;
    
}
