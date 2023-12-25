import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationCreditComponent } from './components/consultation-credit/consultation-credit.component';
import { DemandeDeCreditComponent } from './components/demande-de-credit/demande-de-credit.component';

const routes: Routes = [

  { path: '', component: DemandeDeCreditComponent },  
  { path: 'demande', component: DemandeDeCreditComponent },
  { path: 'consultation', component: ConsultationCreditComponent},

];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
