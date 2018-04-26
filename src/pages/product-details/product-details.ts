import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HeaderComponent } from '../../components/header/header';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';



@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
  providers: [HeaderComponent]
})
export class ProductDetailsPage {
  product: any;
  public imageurl = HttpServiceProvider.BASE_URL;
  public productInCarts: any = [];
  // @ViewChild(HeaderComponent) headerComponent: HeaderComponent;
  constructor(public navCtrl: NavController,
    public headerComponent: HeaderComponent,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpServiceProvider,
    public globalservice: GlobalServiceProvider) {
    this.product = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  dismiss() {

    this.viewCtrl.dismiss();
  }
  addToCart(): void {
    HeaderComponent.items++;
    this.globalservice.productInCarts.push(this.product);
    console.log(this.globalservice.productInCarts);
    let cartProducts = this.globalservice.productInCarts.map((data: any) => {
      return data._id;
    })
    let username = localStorage.getItem('user');
    if(username){
      this.httpService.put('api/user/' + username, { cart: cartProducts });     
    }
    this.viewCtrl.dismiss();    
  }
}
