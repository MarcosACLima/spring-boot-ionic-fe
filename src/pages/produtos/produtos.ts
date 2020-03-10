import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService, public controladorCarregamento: LoadingController) {
  }

  ionViewDidLoad() {
   this.carregarDados();
  }

  carregarDados() {
    let categoria_id = this.navParams.get('categoria_id');
    let carregador = this.carregamentoAtual(); // iniciar loading
    this.produtoService.buscarPorCategoria(categoria_id).subscribe( resposta => {
      this.itens = resposta['content'];
      carregador.dismiss(); // dispensar loading
      this.carregarImagemUrls();
    },
    error => {
      carregador.dismiss();
    });
  }

  carregarImagemUrls() {
    for(var i = 0; i < this.itens.length; i++) {
      let item = this.itens[i];
      this.produtoService.retornarImagemPequenaDoBucket(item.id).subscribe(resposta => 
        { item.imagemUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
      error => {});
    }
  }

  mostrarDetalhe(produto_id : string) {
    this.navCtrl.push('ProdutoDetalhePage', {produto_id: produto_id});
  }

  carregamentoAtual() {
    let carregador = this.controladorCarregamento.create({
      content: "Por Favor Aguarde...",
    });
    carregador.present();
    return carregador;
  }

  fazerAtualizacao(atualizar) {
    this.carregarDados();
    setTimeout(() => {
      atualizar.complete();
    }, 1000);
  }

}
