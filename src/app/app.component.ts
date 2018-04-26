import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WomenPage } from '../pages/women/women';
import { KidsPage } from '../pages/kids/kids';
import { LivingPage } from '../pages/living/living';
import { MenPage } from '../pages/men/men';
import { TravelPage } from '../pages/travel/travel';
import { GiftCardPage } from '../pages/gift-card/gift-card';
import { ThemeStorePage } from '../pages/theme-store/theme-store';
import { WelcomePage } from '../pages/welcome/welcome';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { HeaderComponent } from '../components/header/header';
import { GlobalServiceProvider } from '../providers/global-service/global-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,    
      public globalService: GlobalServiceProvider,
      public menuCtrl : MenuController, 
      public splashScreen: SplashScreen) {
    this.initializeApp();
    // if(localStorage.getItem('user')){      
    //   this.rootPage = HomePage;
    // }    
    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Women', component: WomenPage },
      { title: 'Men', component: MenPage },
      { title: 'Kids', component: KidsPage },
      { title: 'Living', component: LivingPage },
      { title: 'Travel', component: TravelPage },
      { title: 'Theme Stores', component: ThemeStorePage },
      { title: 'Gift Cards', component: GiftCardPage },      
      { title: 'Product Details', component: ProductDetailsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  logout(){
    HeaderComponent.items = 0;
    this.globalService.productInCarts = [];
    localStorage.clear(); 
    this.menuCtrl.close();   
  }  
}
