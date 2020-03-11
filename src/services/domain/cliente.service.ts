import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService, public imageUtilService: ImageUtilService) {
    }

    buscarPorEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?valor=${email}`);
    }

    buscarPorId(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    getImagemDoBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    inserir(cliente : ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`, cliente, { observe: 'response', responseType: 'text'});
    }

    uploadFoto(foto) {
        let imagemBlob = this.imageUtilService.dataUriToBlob(foto);
        let formData : FormData = new FormData();
        formData.set('file', imagemBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/foto`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}