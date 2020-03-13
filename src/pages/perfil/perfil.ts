import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  cliente: ClienteDTO;

  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService, public clienteService: ClienteService, public camera: Camera) {
  }

  ionViewDidLoad() {
    this.carregarDados();
  }

  carregarDados() {
    let usuarioLogado = this.storage.getUsuarioLogado();
    if (usuarioLogado && usuarioLogado.email) {
      this.clienteService.buscarPorEmail(usuarioLogado.email)
        .subscribe(resposta => {
        this.cliente = resposta as ClienteDTO;
          this.getImageExiste();
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.setRoot('HomePage');
            }
          });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageExiste() {
    this.clienteService.getImagemDoBucket(this.cliente.id)
      .subscribe(resposta => {
        this.cliente.imagemUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
        error => { })
  }

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (error) => {
    });
  }

  getGaleriaPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (error) => {
    });
  }

  enviarFoto() {
    this.clienteService.uploadFoto(this.picture).subscribe(
      resposta => {
        this.picture = null;
        this.carregarDados();
      },
      error => {});
  }

  cancelarFoto() {
    this.picture = null;
  }

}
