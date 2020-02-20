import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscreverSePage } from './inscrever-se';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    InscreverSePage,
  ],
  imports: [
    IonicPageModule.forChild(InscreverSePage),
  ],
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class InscreverSePageModule {}
