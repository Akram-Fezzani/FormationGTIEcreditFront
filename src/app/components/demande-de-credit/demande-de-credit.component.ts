import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeCreditService } from '../service/DemandeService/demande-credit.service';
import { Client } from '../models/Client';

@Component({
  selector: 'app-demande-de-credit',
  templateUrl: './demande-de-credit.component.html',
  styleUrls: ['./demande-de-credit.component.css']
})
export class DemandeDeCreditComponent implements OnInit {

  data: any;
  client!:Client;
 
  cin!:String;
  nom!:String;
  prenom!:String;
  dateNs!:Date;
  situationFamiliale!:String;

  input1Valu!: string;
  input2Value!: string;
  input3Value!: string;
  options: any;
  constructor(private _router:Router , private dc:DemandeCreditService) { }

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
      this.data = {
          datasets: [
              {
                  data: [11, 16, 7, 3, 14],
                  backgroundColor: [
                      documentStyle.getPropertyValue('--red-500'),
                      documentStyle.getPropertyValue('--green-500'),
                      documentStyle.getPropertyValue('--yellow-500'),
                      documentStyle.getPropertyValue('--bluegray-500'),
                      documentStyle.getPropertyValue('--blue-500')
                  ],
                  label: 'My dataset'
              }
          ],
          labels: ['black ', 'Green', 'Yellow', 'Grey', 'Blue']
      };
      
      this.options = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              r: {
                  grid: {
                      color: surfaceBorder
                  }
              }
          }
      };
  }
  getClient(cin :string){
    this.dc.getClient(cin).subscribe( (data:any) =>{
        console.log(data)
        this.client=data;
        this.dateNs=this.client.dateNs;
        this.situationFamiliale=this.client.situationFamiliale;
        this.nom=this.client.nom;
        this.prenom=this.client.prenom
       },
      (error:any) => console.log(error)); }
    
  onInput1Change() {
  }
}