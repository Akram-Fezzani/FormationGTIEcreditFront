import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Garantie } from '../../../models/Garantie';

@Injectable({
  providedIn: 'root'
})
export class DemandeCreditService {

  constructor(private http: HttpClient, private _http:HttpClient) { }

  getClient(cin:String): Observable<any> { 
    return this.http.get('http://localhost:8081/client/retrieveClientByCin/'+cin );
  }
  getCompteByClientCin(cin:String): Observable<any> { 
    return this.http.get('http://localhost:8081/Compte/CompteByUserCin/'+cin );
  }

  getTypeCrdit(): Observable<any> { 
    return this.http.get('http://localhost:8081/TypeCredit/getTypeCredit' );
  }

  getSituationFamilialeByCin(cin:String): Observable<any> { 
    return this.http.get('http://localhost:8081/situationFamiliale/retrieveSituationFamilialeByCin/'+cin );
  }
  getUnite(): Observable<any> { 
    return this.http.get('http://localhost:8081/Unite/getUnite' );
  }

  getTypeGarantie(): Observable<any> { 
    return this.http.get('http://localhost:8081/TypeGarantie/getTypeGarantie');
  }
  
  getNature(): Observable<any> { 
    return this.http.get('http://localhost:8081/Nature/getNatures');
  }

  getDevise(): Observable<any> { 
    return this.http.get('  http://localhost:8081/Devise/getDevise');
  }

  addGarantie(garantie: Garantie){
    return this._http.post<Garantie>('http://localhost:8081/Garantie/postGarantie',garantie);

  }

  getGarantieParCredit(creditId:String): Observable<any> { 
    return this.http.get('http://localhost:8081/Garantie/getgarantiesByCreditId/'+creditId);
  }

  getPiece(): Observable<any> { 
    return this.http.get('http://localhost:8081/PieceJointe/getPieceJointes');
  }

  deleteGarantie(Id:string): Observable<any> {
    return this.http.delete( 'http://localhost:8081/Garantie/delete/'+Id);
  }

  
  updateGarantie(garantie: Garantie, garantieID: number): Observable<Garantie> {
    const url = `http://localhost:8081/Garantie/updateGarantie/${garantieID}`;
    return this.http.post<Garantie>(url, garantie);
  }
}
