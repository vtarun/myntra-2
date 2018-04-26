import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { HttpServiceProvider } from '../../providers/http-service/http-service';


@Component({
    selector: 'men-page',
    templateUrl: './men.html'
})

export class MenPage {
    public imageurl = HttpServiceProvider.BASE_URL;
    products: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public httpService: HttpServiceProvider
    ) {
        console.log(this.imageurl);
        httpService.get('api/product/find').subscribe((data: any) => {
            console.log(data.docs);
            this.products = data.docs;            
        });
        console.log(this.products);

    }
    openProductDetailsModal(data): void {
        let productModal = this.modalCtrl.create(ProductDetailsPage, data);
        productModal.present();
    }

}