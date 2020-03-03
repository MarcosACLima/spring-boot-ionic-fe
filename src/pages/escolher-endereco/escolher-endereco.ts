import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-escolher-endereco',
  templateUrl: 'escolher-endereco.html',
})
export class EscolherEnderecoPage {

  itens: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService, public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let usuarioLogado = this.storage.getUsuarioLogado();
    if (usuarioLogado && usuarioLogado.email) {
      this.clienteService.buscarPorEmail(usuarioLogado.email)
      .subscribe(resposta => { this.itens = resposta['enderecos'];
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

}
