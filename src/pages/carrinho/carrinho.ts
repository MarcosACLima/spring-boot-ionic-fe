import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemCarrinho } from '../../models/item-carrinho';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  itens: ItemCarrinho[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public carrinhoService: CarrinhoService, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let carrinho = this.carrinhoService.retornarCarrinho();
    this.itens = carrinho.itens;
    this.carregarImageUrls();
  }

  carregarImageUrls() {
    for (var i = 0; i < this.itens.length; i++) {
      let item = this.itens[i];
      this.produtoService.retornarImagemPequenaDoBucket(item.produto.id).subscribe( resposta => {
        item.produto.imagemUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
      },
      error => {});
    }
  }

  removerItem(produto: ProdutoDTO) {
    this.itens = this.carrinhoService.removerProduto(produto).itens;
  }

  incrementarQuantidade(produto: ProdutoDTO) {
    this.itens = this.carrinhoService.incrementarQuantidade(produto).itens;
  }

  decrementarQuantidade(produto: ProdutoDTO) {
    this.itens = this.carrinhoService.decrementarQuantidade(produto).itens;
  }

  valorTotal() : number {
    return this.carrinhoService.valorTotal();
  }

  continuarComprando() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  finalizarPedido() {
    this.navCtrl.push('EscolherEnderecoPage');
  }

}