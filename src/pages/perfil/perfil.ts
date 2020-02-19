import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService, public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let usuarioLogado = this.storage.getUsuarioLogado();
    if (usuarioLogado && usuarioLogado.email) {
      this.clienteService.buscarPorEmail(usuarioLogado.email)
      .subscribe(resposta => { this.cliente = resposta;
        this.getImageExiste();
      },
      error => {
        if(error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageExiste() {
    this.clienteService.getImagemDoBucket(this.cliente.id)
    .subscribe(resposta => {
      this.cliente.imagemUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error =>{})
  }

}
