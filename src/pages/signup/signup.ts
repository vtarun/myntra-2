import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public user : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.user={
    //   userName: '',
    //   password: ''
    // };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() { 
    console.log(this.user);
    localStorage.setItem('user', this.user.userName);
    this.navCtrl.setRoot(HomePage);
  }

}
