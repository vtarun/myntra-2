import { NgModule, ChangeDetectorRef } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailsPage } from './product-details';
import { HeaderComponent } from '../../components/header/header';

@NgModule({
  declarations: [],
  imports: [
    IonicPageModule.forChild(ProductDetailsPage),
  ]
})
export class ProductDetailsPageModule {}
