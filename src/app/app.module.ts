import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './service/authentication.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { BlockUIModule } from 'ng-block-ui';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import { HeaderInterceptorService } from './service/header-interceptor.service';
import { CpfValidatorDirective } from './directives/cpf-validator.directive';
import { CpfPipe } from './pipes/cpf.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PessoaListComponent,
    PessoaFormComponent,
    CpfValidatorDirective,
    CpfPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    BlockUIModule.forRoot(),
    ConfirmDialogModule,
    BrowserAnimationsModule,
    InputMaskModule,
    InputTextModule,
    CalendarModule,
    RadioButtonModule,
    ToastModule
  ],
  providers: [AuthenticationService, ConfirmationService, MessageService, 
  {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
