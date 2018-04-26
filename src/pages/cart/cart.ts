import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PurchasePage } from '../purchase/purchase';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  public products: any;
  public product: any = {
    imgsrc: "assets/imgs/men-tshirt/6.jpg",
    brand: "Moda Rapido",
    price: '$69',
    details: "Pack of 2 T-shits"
  }
  totalQty: number = 1;
  items: any;
  public imageurl = this.globalService.BASE_URL;
  totalBill: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,    
    public globalService: GlobalServiceProvider
  ) {
    //this.items = GlobalServiceProvider.productInCarts;
    this.items = [].concat(this.globalService.productInCarts);
    this.items.filter((item) => {
      item.qty = 1;
    });
    this.calculateBill();
  }

  ionViewDidLoad() {
  
  }
  dismiss(): void {
    this.viewCtrl.dismiss();
  }
  purchaseItems(): void {
    let page: any = PurchasePage;
    if (!localStorage.getItem('user')) {
      page = LoginPage;
    }
    this.navCtrl.push(page, {
      cartData: this.items
    })
  }
  increaseQty(index): void {
    this.items[index].qty++;
    //this.totalBill += parseInt(this.items[index].price) * (this.items[index].qty - 1);
    this.calculateBill();
  }
  decreaseQty(index): void {
    if (this.items[index].qty > 1) {
      this.items[index].qty--;
      //this.totalBill -= parseInt(this.items[index].price) * (this.items[index].qty);
      this.calculateBill();
    }
  }
  removeItem(index): void {
    HeaderComponent.items--;
    this.globalService.productInCarts.splice(index, 1);
    this.items = this.globalService.productInCarts;
    //this.totalBill = 0;
    this.calculateBill();
  }
  calculateBill() {
    this.totalBill = 0;
    if (this.items) {
      this.items.forEach(element => {
        this.totalBill += parseInt(element.price) * parseInt(element.qty);
      });
    }    
  }


  // show confirm alert 


}
