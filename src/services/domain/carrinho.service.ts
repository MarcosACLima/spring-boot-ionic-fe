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

}