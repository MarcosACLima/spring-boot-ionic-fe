import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { UsuarioLogado } from "../models/usuario_logado";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    autenticar(credenciais : CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, { observe: `response`, responseType: `text`});
    }

    sucessoLogin(valorAutorizacao : string) {
        let tok = valorAutorizacao.substring(7);
        let usuario : UsuarioLogado = {
            token: tok
        };
        this.storage.setUsuarioLogado(usuario);
    }

    // metodo de logout
    sair() {
        this.storage.setUsuarioLogado(null);
    }

}