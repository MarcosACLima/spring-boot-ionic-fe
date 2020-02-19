import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(requisicao : HttpRequest<any>, proximo: HttpHandler): Observable<HttpEvent<any>> {
        return proximo.handle(requisicao).catch((error, capturado) => {

            let erroObj = error;
            if(erroObj.error) {
                erroObj = erroObj.error;
            }
            // Transformar objeto em um Json 
            if(!erroObj.status) {
                erroObj = JSON.parse(erroObj);
            }

            console.log("Erro  detectado pelo interceptor:");
            console.log(erroObj);

            switch(erroObj.status) {
                case 403:
                    this.tratar403();
                    break;
            }

            return Observable.throw(error);
        }) as any;
    }

    tratar403() {
        this.storage.setUsuarioLogado(null);
    }

}

// declarar provider do interceptor 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErroInterceptor,
    multi: true,
};