import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationCreditComponent } from './consultation-credit/consultation-credit.component';

const routes: Routes = [

  //{ path: 'ConsultationCredit', component: ConsultationCreditComponent },
  { path: "credit", component: ConsultationCreditComponent},

];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
