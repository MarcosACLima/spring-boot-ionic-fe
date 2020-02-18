import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { UsuarioLogado } from "../models/usuario_logado";

@Injectable()
export class StorageService {

    getUsuarioLogado() : UsuarioLogado {
        let usuario = localStorage.getItem(STORAGE_KEYS.usuarioLogado);
        if (usuario == null) {
            return null;
        }
        else {
            return JSON.parse(usuario);
        }
    }

    setUsuarioLogado(usuario : UsuarioLogado) {
        if (usuario == null) {
            localStorage.removeItem(STORAGE_KEYS.usuarioLogado);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.usuarioLogado, JSON.stringify(usuario));
        }
    }
}