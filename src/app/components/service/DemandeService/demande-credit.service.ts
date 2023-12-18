import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  
}
