import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

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

            return Observable.throw(error);
        }) as any;
    }

}

// declarar provider do interceptor 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErroInterceptor,
    multi: true,
};