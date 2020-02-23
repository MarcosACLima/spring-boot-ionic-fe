import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Carrinho } from "../../models/carrinho";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CarrinhoService {

    constructor(public storage: StorageService) {
    }

    criarOuLimparCarrinho() : Carrinho {
        let carrinho: Carrinho = {itens: []};
        this.storage.setCarrinho(carrinho);
        return carrinho;
    }

    retornarCarrinho() : Carrinho {
        let carrinho: Carrinho = this.storage.getCarrinho();
        if(carrinho == null) {
            carrinho = this.criarOuLimparCarrinho();
        }
        return carrinho;
    }

    addProduto(produto: ProdutoDTO) : Carrinho {
        let carrinho = this.retornarCarrinho();
        let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
        if(posicao == -1) {
            carrinho.itens.push({quantidade: 1, produto: produto});
        }
        this.storage.setCarrinho(carrinho);
        return carrinho;
    }

    removerProduto(produto: ProdutoDTO) : Carrinho {
        let carrinho = this.retornarCarrinho();
        let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
        if (posicao != -1) {
            carrinho.itens.splice(posicao, 1);
        }
        this.storage.setCarrinho(carrinho);
        return carrinho;
       
    }

    incrementarQuantidade(produto: ProdutoDTO) : Carrinho {
        let carrinho = this.retornarCarrinho();
        let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
        if (posicao != -1) {
            carrinho.itens[posicao].quantidade++;
        }
        this.storage.setCarrinho(carrinho);
        return carrinho;
    }

    decrementarQuantidade(produto: ProdutoDTO) : Carrinho {
        let carrinho = this.retornarCarrinho();
        let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
        if (posicao != -1) {
            carrinho.itens[posicao].quantidade--;
            if(carrinho.itens[posicao].quantidade < 1) {
                carrinho = this.removerProduto(produto);
            }
        }
        this.storage.setCarrinho(carrinho);
        return carrinho;
    }

    valorTotal() : number {
        let carrinho = this.retornarCarrinho();
        let soma = 0;
        for(var i = 0; i < carrinho.itens.length; i++) {
            soma += carrinho.itens[i].produto.preco * carrinho.itens[i].quantidade;
        }
        return soma;
    }

}