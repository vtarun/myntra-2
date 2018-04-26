import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, ChangeDetectorRef } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome'; 
import { ListPage } from '../pages/list/list';
import { WomenPage } from '../pages/women/women';
import { LivingPage } from '../pages/living/living';
import { MenPage } from '../pages/men/men';
import { TravelPage } from '../pages/travel/travel';
import { GiftCardPage } from '../pages/gift-card/gift-card';
import { ThemeStorePage } from '../pages/theme-store/theme-store';
import { KidsPage } from '../pages/kids/kids';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from '../components/components.module';
import { HeaderComponent } from '../components/header/header';
import { SeachModalPage } from '../pages/seach-modal/seach-modal';

import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { FileOpener } from '@ionic-native/file-opener';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { CartPage } from '../pages/cart/cart';
import { PurchasePage } from '../pages/purchase/purchase';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { HttpClientModule } from '@angular/common/http';
import { GlobalServiceProvider } from '../providers/global-service/global-service';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    WelcomePage,
    HomePage,
    ListPage,
    WomenPage,
    MenPage,
    TravelPage,
    LivingPage,
    GiftCardPage,
    ThemeStorePage,
    KidsPage,
    HeaderComponent,
    SeachModalPage,
    ProductDetailsPage,
    CartPage,
    PurchasePage
    
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    WelcomePage,
    HomePage,
    ListPage,
    WomenPage,
    MenPage,
    TravelPage,
    LivingPage,
    GiftCardPage,
    KidsPage,
    SeachModalPage,
    ThemeStorePage,
    ProductDetailsPage,
    CartPage,
    PurchasePage
  ],
  providers: [
    StatusBar,    
    SplashScreen,
    Camera,
    Base64ToGallery,
    FileChooser,
    FileOpener,
    FilePath,
    File,
    FileTransfer,    
    MediaCapture,
    FileTransfer,
    
    FileTransferObject,
        
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    GlobalServiceProvider
  ]
})
export class AppModule {}
