import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { ItemCarrinho } from '../../models/item-carrinho';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-confirmacao-pedido',
  templateUrl: 'confirmacao-pedido.html',
})
export class ConfirmacaoPedidoPage {

  pedido: PedidoDTO;
  itensCarrinho: ItemCarrinho[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public carrinhoService: CarrinhoService, public clienteService: ClienteService, public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.itensCarrinho = this.carrinhoService.retornarCarrinho().itens;

    this.clienteService.buscarPorId(this.pedido.cliente.id).subscribe(resposta => {
      this.cliente = resposta as ClienteDTO;
      this.endereco = this.buscarEndereco(this.pedido.enderecoDeEntrega.id, resposta['enderecos']);
    },
    error => {
      this.navCtrl.setRoot("HomePage");
    });
  }

  private buscarEndereco(id: string, lista : EnderecoDTO[]) : EnderecoDTO {
    let posicao = lista.findIndex(x => x.id == id);
    return lista[posicao];
  }

  valorTotal() {
    return this.carrinhoService.valorTotal();
  }

  // checkout
  verificacaoDeSaida() {
    this.pedidoService.inserir(this.pedido).subscribe(resposta => {
      this.carrinhoService.criarOuLimparCarrinho();
      this.codPedido = this.extrairId(resposta.headers.get('location'));
    },
    error => {
      if(error.status == 403) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  voltar() {
    this.navCtrl.setRoot('CarrinhoPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  private extrairId(location : string) : string {
    let position = location.lastIndexOf('/'); // posicao da ultima barra
    return location.substring(position + 1, location.length);
  }

}
