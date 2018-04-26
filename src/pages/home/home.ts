import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { WomenPage } from '../women/women';
import { KidsPage } from '../kids/kids';
import { LivingPage } from '../living/living';
import { MenPage } from '../men/men';
import { TravelPage } from '../travel/travel';
import { GiftCardPage } from '../gift-card/gift-card';
import { ThemeStorePage } from '../theme-store/theme-store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lists  = [
            { imgSrc:'assets/imgs/men.jpg','title':'Men', component: MenPage },
            { imgSrc:'assets/imgs/women.jpg','title':'Women', component: WomenPage },
            { imgSrc:'assets/imgs/gift.jpg','title':'Gift Cards', component: GiftCardPage },
            { imgSrc:'assets/imgs/living.jpg','title':'Living', component: LivingPage },
            { imgSrc:'assets/imgs/Home-BG-2.jpg','title':'Theme', component: ThemeStorePage },
            { imgSrc:'assets/imgs/kids-2.jpg','title':'Kids', component: KidsPage }
          ];
  constructor(public navCtrl: NavController,private menuCtrl: MenuController) {
    this.menuCtrl.enable(true, "menu");
  }
  ionViewDidEnter() {
    // this.menuCtrl.enable(true, "hamburger-menu");
    // this.menuCtrl.enable(true, "hamburger-menu");
  }
  navigate(path: any): void{
    // console.log(path.component);
    this.navCtrl.push(path.component);
  }
}
