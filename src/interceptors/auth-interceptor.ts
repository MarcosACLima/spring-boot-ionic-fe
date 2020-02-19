import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(requisicao : HttpRequest<any>, proximo: HttpHandler): Observable<HttpEvent<any>> {

        let usuarioLogado = this.storage.getUsuarioLogado();

        let NCHAR = API_CONFIG.baseUrl.length;
        let requisicaoParaAPI  = requisicao.url.substring(0, NCHAR) == API_CONFIG.baseUrl;

        // se tiver token e requisicao for para API
        if(usuarioLogado && requisicaoParaAPI) {
            // clonar a requisicao
            const authRequisicao = requisicao.clone({headers: requisicao.headers.set('Authorization', 'Bearer ' + usuarioLogado.token)});
            return proximo.handle(authRequisicao);
        } else {
            return proximo.handle(requisicao);
        }
    }
    
}

// declarar provider do interceptor 
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};