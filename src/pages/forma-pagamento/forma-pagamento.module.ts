import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormaPagamentoPage } from './forma-pagamento';

@NgModule({
  declarations: [
    FormaPagamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormaPagamentoPage),
  ],
})
export class FormaPagamentoPageModule {}
