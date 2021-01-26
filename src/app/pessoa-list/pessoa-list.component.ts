import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PessoaService } from '../service/pessoa.service';
import { Page } from '../util/page';
import { PessoaList } from './pessoa-list.model';
import { finalize } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MensagemUtil } from '../util/mensagem.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {

  pessoas: Page<PessoaList> = new Page;

  @BlockUI()
  blockUI: NgBlockUI;

  constructor(private pessoaService: PessoaService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllPessoas();
  }

  getAllPessoas() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.pessoaService.getPessoas().pipe(finalize(() => this.blockUI.stop()))
      .subscribe( response => this.pessoas = response);
  }

  editarPessoa(id: number) {
    this.router.navigate(['pessoas/editar', id]);
  }

  visualizarPessoa(id: number) {
    this.router.navigate(['pessoas/visualizar', id]);
  }

  excluirPessoa(id: number, nome: string) {
    this.confirmationService.confirm({
      message: `Deseja excluir a pessoa ${nome}?`,
      header: 'Confirmação',
      icon: 'fa ui-icon-warning',
      accept: () => {
        this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
        this.pessoaService.excluir(id).pipe(finalize(() => this.blockUI.stop()))
          .subscribe(() => {
            this.messageService.add({severity:'success', summary: MensagemUtil.SUCESSO, detail: `Pessoa excluida com sucesso!`});
            this.getAllPessoas();
          });
      }
    });
  }

}
