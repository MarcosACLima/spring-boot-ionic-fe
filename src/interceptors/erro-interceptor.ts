import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertaCtrl: AlertController) {
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
                case 401:
                    this.tratar401();
                    break;

                case 403:
                    this.tratar403();
                    break;

                default:
                    this.tratarErroPadrao(erroObj);
            }

            return Observable.throw(error);
        }) as any;
    }
    
    tratar403() {
        this.storage.setUsuarioLogado(null);
    }
    
    tratar401() {
        let alerta = this.alertaCtrl.create({title: 'Erro 401: falha de autenticação', message: 'Email ou senha incorretos', enableBackdropDismiss: false,
        buttons: [{text: 'OK'}]});
        alerta.present();
    }

    tratarErroPadrao(erroObj) {
        let alerta = this.alertaCtrl.create({title: 'Erro ' + erroObj.status + ': ' + erroObj.error, message: erroObj.message, enableBackdropDismiss: false, buttons: [{text: 'OK'}]});
        alerta.present();
    }

}

// declarar provider do interceptor 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErroInterceptor,
    multi: true,
};