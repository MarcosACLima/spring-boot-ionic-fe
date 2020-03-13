import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  cliente: ClienteDTO;

  picture: string;
  cameraOn: boolean = false;
  imagemPerfil;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService, public clienteService: ClienteService, public camera: Camera, public sanitizer: DomSanitizer) {

    this.imagemPerfil = 'assets/imgs/avatar-blank.png';
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
        this.blobToDataURL(resposta).then(dataUrl => {
          let str : string = dataUrl as string;
          this.imagemPerfil = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
        error => {
          this.imagemPerfil = 'assets/imgs/avatar-blank.png';
        })
  }

  // Converter Blob para Base64: https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    });
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
      this.cameraOn = false;
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
      this.cameraOn = false;
    });
  }

  enviarFoto() {
    this.clienteService.uploadFoto(this.picture).subscribe(
      resposta => {
        this.picture = null;
        this.getImageExiste();
      },
      error => {});
  }

  cancelarFoto() {
    this.picture = null;
  }

}
