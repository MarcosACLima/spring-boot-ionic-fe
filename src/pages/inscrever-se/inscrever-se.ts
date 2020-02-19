import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-inscrever-se',
  templateUrl: 'inscrever-se.html',
})
export class InscreverSePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  inscreverUsuario() {
    console.log("enviou o formulario");
  }

}