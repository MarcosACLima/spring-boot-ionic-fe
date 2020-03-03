import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CarrinhoService } from '../../services/domain/carrinho.service';

@IonicPage()
@Component({
  selector: 'page-escolher-endereco',
  templateUrl: 'escolher-endereco.html',
})
export class EscolherEnderecoPage {

  itens: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService, public clienteService: ClienteService, public carrinhoService: CarrinhoService) {
  }

  ionViewDidLoad() {
    let usuarioLogado = this.storage.getUsuarioLogado();
    if (usuarioLogado && usuarioLogado.email) {
      this.clienteService.buscarPorEmail(usuarioLogado.email)
      .subscribe(resposta => { this.itens = resposta['enderecos'];

        let carrinho = this.carrinhoService.retornarCarrinho();

        this.pedido = {
          cliente: {id: resposta['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          itens: carrinho.itens.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
        }
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

  proximaPagina(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.navCtrl.push('FormaPagamentoPage', {pedido: this.pedido});
  }

}
