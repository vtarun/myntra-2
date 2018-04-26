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
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  loggedin: string = '';

  pages: Array<{ title: string, component: any }>;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  imageSourceTest: any;
  constructor(public platform: Platform, public statusBar: StatusBar,
    public globalService: GlobalServiceProvider,
    public menuCtrl: MenuController,
    public mediaCapture: MediaCapture,
    public base64ToGallery: Base64ToGallery,
    public fileChooser : FileChooser,
    public fileOpener: FileOpener,
    public filePath : FilePath,
    public camera: Camera,
    public splashScreen: SplashScreen) {
    this.initializeApp();

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
      // user services to authenticate
      // update below
      this.loggedin = localStorage.getItem('user');


      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  toggleLog() {
    HeaderComponent.items = 0;
    this.globalService.productInCarts = [];
    localStorage.clear();
    this.menuCtrl.close();
    this.uploadProfileImage();
  }
  uploadProfileImage() {
    //alert('before camera clicked');
    //this.loader.present();

    this.camera.getPicture(this.options).then((imgData) => {
      let base64Image = 'data:image/jpeg;base64,' + imgData;
      this.base64ToGallery.base64ToGallery(imgData, { prefix: '_img', mediaScanner: true }).then(
        res => {
          console.log('camera success');
          this.imageSourceTest = base64Image;
        },
        err => {
          console.log('image not saved ', err);
        });
    }, (err) => {
      console.log("damn getting error", err);
    });
  }
  chooseFile(): void {
    this.fileChooser.open().then(file => {
      this.filePath.resolveNativePath(file).then(resolvedFilePath => {
        this.fileOpener.open(resolvedFilePath, 'application/png').then(value => {
          alert('it worked');
        })
      })
    })
  }


}
