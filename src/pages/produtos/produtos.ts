import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.buscarPorCategoria(categoria_id).subscribe( resposta => {
      this.itens = resposta['content'];
      this.carregarImagemUrls();
    },
    error => {})
  }

  carregarImagemUrls() {
    for(var i = 0; i < this.itens.length; i++) {
      let item = this.itens[i];
      this.produtoService.retornarImagemPequenDoBucket(item.id).subscribe(resposta => 
        { item.imagemUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
      error => {});
    }
  }

  mostrarDetalhe() {
    this.navCtrl.push('ProdutoDetalhePage');
  }

}
