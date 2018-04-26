import { Component, Input, ChangeDetectorRef, ViewChild, ContentChildren } from '@angular/core';
import { NavController, ModalController, MenuController } from 'ionic-angular';
import { MenPage } from '../../pages/men/men';
import { SeachModalPage } from '../../pages/seach-modal/seach-modal';
import { CartPage } from '../../pages/cart/cart';


/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input('title') title: string;
  public static items: number = 0;
  constructor(private cdr: ChangeDetectorRef,private menuCtrl:MenuController, public modalCtrl: ModalController, public navCtrl: NavController) {
    console.log('Hello HeaderComponent Component');
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  
  check(path: string): void {
    if(path == 'cart'){
      this.openModel(CartPage);
    }
    else{
      this.openModel(SeachModalPage);
    }    
  }

  get staticItems() {
    return HeaderComponent.items;
  }

  openModel(page){
    let modal = this.modalCtrl.create(page, { userId: 8675309 });
    modal.present();
  }
}
