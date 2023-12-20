
export class Dto {

    ClientDto!: ClientDto;
	CompteDto!:CompteDto;
	CreditDto!:CreditDto;
    GarantieDto!:GarantieDto;
	PieceJointeDto!:PieceJointeDto;

}

export class ClientDto {
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
}

export class CreditDto {
    montant!: number;
	nbrEcheance!:number;
    typeCreditId!:number;
    uniteId!: number;
	observation!:string;
    entreeRelation!:Date;
    par!:string;
    status!:boolean;
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
