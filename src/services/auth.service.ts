import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { UsuarioLogado } from "../models/usuario_logado";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';
import { CarrinhoService } from "./domain/carrinho.service";

@Injectable()
export class AuthService {

    jwtAjuda: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService, public carrinhoService: CarrinhoService) {
    }

    autenticar(credenciais : CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, { observe: `response`, responseType: `text`});
    }

    atualizarToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/atualizar_token`, {}, {observe: 'response', responseType: 'text'});
    }

    sucessoLogin(valorAutorizacao : string) {
        let tok = valorAutorizacao.substring(7);
        let usuario : UsuarioLogado = {
            token: tok,
            email: this.jwtAjuda.decodeToken(tok).sub
        };
        this.storage.setUsuarioLogado(usuario);
        this.carrinhoService.criarOuLimparCarrinho();
    }

    // metodo de logout
    sair() {
        this.storage.setUsuarioLogado(null);
    }

}