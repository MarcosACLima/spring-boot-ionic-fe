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

  itens: ProdutoDTO[] = [];
  pagina : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService, public controladorCarregamento: LoadingController) {
  }

  ionViewDidLoad() {
   this.carregarDados();
  }

  carregarDados() {
    let categoria_id = this.navParams.get('categoria_id');
    let carregador = this.carregamentoAtual(); // iniciar loading
    this.produtoService.buscarPorCategoria(categoria_id, this.pagina, 10).subscribe( resposta => {
      let inicio = this.itens.length;
      this.itens = this.itens.concat(resposta['content']); // concatenar a resposta
      let fim = this.itens.length - 1;
      carregador.dismiss(); // dispensar loading
      console.log(this.pagina);
      console.log(this.itens);
      this.carregarImagemUrls(inicio, fim);
    },
    error => {
      carregador.dismiss();
    });
  }

  carregarImagemUrls(inicio: number, fim: number) {
    for(var i = inicio; i < fim; i++) {
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
    this.pagina = 0;
    this.itens = [];
    this.carregarDados();
    setTimeout(() => {
      atualizar.complete();
    }, 1000);
  }

  carregarMaisDados(scrollInfinito) {
    this.pagina++;
    this.carregarDados();
    setTimeout(() => {
      scrollInfinito.complete();
    }, 1000);
  }

}
