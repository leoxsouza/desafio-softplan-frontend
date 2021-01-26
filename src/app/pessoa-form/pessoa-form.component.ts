import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PessoaService } from '../service/pessoa.service';
import { MensagemUtil } from '../util/mensagem.util';
import { Pessoa } from './pessoa.model';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  acao: string;

  pessoa: Pessoa = new Pessoa();

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.verificarParametros();
  }
  
  verificarParametros() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.load(params['id']);
      }

      this.acao = params['acao'];
    });
  }

  load(id: number){
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.pessoaService.findById(id).pipe(finalize(() => this.blockUI.stop()))
    .subscribe(response => {
      this.pessoa = response;
      this.pessoa.dtNascimento = new Date( response.dtNascimento);
    });
  }

  salvarPessoa() {
    this.blockUI.start( MensagemUtil.BLOCKUI_SALVANDO );
    this.pessoaService.salvar(this.pessoa).pipe(finalize(() => this.blockUI.stop()))
    .subscribe( () => {
      this.router.navigate( [ '/pessoas' ] );
      this.messageService.add({severity:'success', summary: MensagemUtil.SUCESSO, detail: `Pessoa salva com sucesso!`});
    }, error => this.messageService.add({severity:'error', summary: MensagemUtil.ERRO, detail: 'Ocorreu um erro!'}));

  }

}
