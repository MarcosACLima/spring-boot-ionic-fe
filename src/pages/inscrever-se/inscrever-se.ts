import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-inscrever-se',
  templateUrl: 'inscrever-se.html',
})
export class InscreverSePage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public cidadeService: CidadeService, public estadoService: EstadoService) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['', [Validators.required]],
      logradouro : ['', [Validators.required]],
      numero : ['', [Validators.required]],
      complemento : ['', []],
      bairro : ['', []],
      cep : ['', [Validators.required]],
      telefone1 : ['', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]      
    });
  }

  ionViewDidLoad() {
    this,this.estadoService.listarTudo().subscribe(resposta => { 
      this.estados = resposta; 
      this.formGroup.controls.estadoId.setValue   (this.estados[0].id);
      this.atualizarCidades();
    },
    error => {});
  }

  atualizarCidades() {
    // pegar estado selecionado na lista do formulario do html
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.listarTudo(estado_id).subscribe(resposta => {
      this.cidades = resposta;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }

  inscreverUsuario() {
    console.log("enviou o formulario");
  }

}