import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PurchasePage } from '../purchase/purchase';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user: any = {};
  public logined: boolean = false;
  public message: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public httService: HttpServiceProvider
  ) {
    // this.user = {
    //   username: '',
    //   password: '',
    //   address: ''
    // };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log(this.user);
    
    this.httService.post('api/user/find', this.user).subscribe((data: any) => {
      localStorage.setItem('user', this.user.username);
      console.log(data);
      this.user = data.doc;
      this.message = data.message;
      this.presentAlert();
      if (Object.keys(this.navParams.data).length) {

        this.user.cart = this.navParams.data.cartData;
        this.httService.put("api/user/" + this.user._id, this.user);

        this.navCtrl.push(PurchasePage, this.navParams.data).then(() => {
          const startIndex = this.navCtrl.getActive().index - 2;
          this.navCtrl.remove(startIndex, 2);
        });
      } else {
        /*
          if(userData.cart && userData.cart.lenth > 0){
            this.globalservice.productInCarts.push(userData.cart);  
          }
        */

        this.navCtrl.setRoot(HomePage);
      }
    }, err => {
      this.message = err.error.message;
      this.presentAlert();
    });

  }
  register() {
    this.logined = !this.logined;

    /* 
    .subscribe(resp=>{
      localStorage.setItem("loginFlag", resp.docs._id);      
      if(this.globalservice.productInCarts.length > 0){
        this.http.put("/user", this.globalservice.productInCarts);        
      }      
    },err=>{

    })*/
  }
  signup() {
    console.log("wahat is happening", this.user);
    this.httService.post('api/usercreate', this.user).subscribe((data: any) => {

      localStorage.setItem('user', this.user.username);
      this.user = data.docs;
      console.log("New user data after signup ============>", this.user);
      this.message = data.message;
      this.presentAlert();
      if (Object.keys(this.navParams.data).length) {
        //this.user.cart = [0].concat(this.navParams.data.cartData);
        //this.httService.put("api/user/" + this.user._id, this.user);

        this.navCtrl.push(PurchasePage, this.navParams.data).then(() => {
          const startIndex = this.navCtrl.getActive().index - 2;
          this.navCtrl.remove(startIndex, 2);
        });
      } else {
        /*
          if(userData.cart && userData.cart.lenth > 0){
            this.globalservice.productInCarts.push(userData.cart);  
          }
        */

        this.navCtrl.setRoot(HomePage);
      }
    }, err => {
      this.message = err.error.message;
      this.presentAlert();
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login/signup',
      subTitle: this.message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
