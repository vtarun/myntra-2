import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { HomePage } from '../home/home';
import { HeaderComponent } from '../../components/header/header';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {
  totalQty: number = 0;
  totalBill: number = 0;
  public products: any;
  public imageurl = this.globalService.BASE_URL;
  constructor(public navCtrl: NavController,
    public globalService: GlobalServiceProvider,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public httpService: HttpServiceProvider,
    public navParams: NavParams) {
    this.products = [].concat(this.navParams.data.cartData);
    this.calculateBill();
  }

  ionViewDidLoad() {
  }
  calculateBill() {

    if (this.products) {
      this.products.forEach(element => {
        this.totalBill += parseInt(element.price) * parseInt(element.qty);
      });
    }
  }
  purchase() {
    this.globalService.productInCarts = [];
    HeaderComponent.items = 0;    
    // this.navCtrl.popTo(HomePage);
    // this.navCtrl.setRoot(HomePage);
    this.navCtrl.popAll();
    let username = localStorage.getItem('user');
    this.httpService.put('api/user/' + username, { cart: [] });
    // this.navCtrl.push(HomePage).then(() => {
    //   const startIndex = this.navCtrl.getActive().index -2 ;
    //   console.log(startIndex);      
    //   this.navCtrl.remove(startIndex, 2);
      
    // });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Done',
      subTitle: "hmm... wait for 1 one year to get delivery",
      buttons: ['Dismiss']
    });
    alert.present();
  }

}

//_JAVA_OPTIONS -Xmx256M
