import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../pessoa-form/pessoa.model';
import { PessoaList } from '../pessoa-list/pessoa-list.model';
import { Page } from '../util/page';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  resourceUrl = 'http://localhost:8080/api/pessoas';

  constructor(private http: HttpClient) { }

  getPessoas(): Observable<Page<PessoaList>> {
    return this.http.get<Page<PessoaList>>(this.resourceUrl);
  }

  findById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.resourceUrl + `/${id}`)
  }

  salvar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>( this.resourceUrl, pessoa);
  }

  excluir(id: number): Observable<any> {
    return this.http.get(this.resourceUrl + `/remover/${id}`);
  }


}
