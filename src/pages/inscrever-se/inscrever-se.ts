import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-inscrever-se',
  templateUrl: 'inscrever-se.html',
})
export class InscreverSePage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
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

  inscreverUsuario() {
    console.log("enviou o formulario");
  }

}