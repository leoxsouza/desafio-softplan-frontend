import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';

const routes: Routes = [
  { path: 'pessoas', component: PessoaListComponent },
  { path: 'pessoas/:acao', component: PessoaFormComponent },
  { path: 'pessoas/:acao/:id', component: PessoaFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
