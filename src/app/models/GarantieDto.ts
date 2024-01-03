import { TypeGarantie } from "./TypeGarantie";

export class GarantieDto {
    idGarantie!:string;
    nature!:string;
    typeGarantie!:TypeGarantie;
    deviseGarantie!:string;
    valeur!:Number;
}
