import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.atualizarToken().subscribe(resposta => { this.auth.sucessoLogin(resposta.headers.get('Authorization'));
    this.navCtrl.setRoot('CategoriasPage');
  },
  error => {});
}

  login() {
    this.auth.autenticar(this.credenciais).subscribe(resposta => {
      this.auth.sucessoLogin(resposta.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    }, 
    error => {});
  }

}