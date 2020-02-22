import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produto-detalhe',
  templateUrl: 'produto-detalhe.html',
})
export class ProdutoDetalhePage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.buscarPorId(produto_id).subscribe( resposta => { 
      this.item = resposta;
      this.getImagemUrlSeExiste();
    },
    error => {});
  }

  getImagemUrlSeExiste() {
    this.produtoService.retornarImagemDoBucket(this.item.id).subscribe( resposta => {
      this.item.imagemUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
    },
    error => {});
  }

}
