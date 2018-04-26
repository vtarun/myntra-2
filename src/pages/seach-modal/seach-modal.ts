import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { LoadingController } from 'ionic-angular';

import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

@Component({
  selector: 'page-seach-modal',
  templateUrl: 'seach-modal.html',
})
export class SeachModalPage {

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  imageSourceTest : any;
  loader: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public base64ToGallery: Base64ToGallery,
    public loadingCtrl: LoadingController,
    public fileChooser: FileChooser,
    public filePath: FilePath,
    public fileOpener: FileOpener,
    public transfer: FileTransfer,
    public file: File,
    public mediaCapture: MediaCapture,
    public camera: Camera) {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
      // duration: 3000
    });    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SeachModalPage');
  }
  dismiss() {
    console.log('method modal called');
    this.viewCtrl.dismiss();
  }

  testCamera(): void {
    //alert('before camera clicked');
    //this.loader.present();
    
    this.camera.getPicture(this.options).then((imgData) => {
      let base64Image = 'data:image/jpeg;base64,' + imgData;
      this.base64ToGallery.base64ToGallery(imgData, { prefix: '_img', mediaScanner: true }).then(
        res => {
          if (this.loader) {
            //this.loader.dismiss();
          }
          
          console.log('camera success');
          this.imageSourceTest = base64Image;
        },
        err => {
          console.log('image not saved ', err);
          //alert('Error => ' + err);
        }
      );
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
  captureImageTest(): void {
    let options: CaptureImageOptions = { limit: 3 };
    this.mediaCapture.captureImage(options)
      .then(
        (data: MediaFile[]) => {
          alert(data);
          console.log(data);
        },
        (err: CaptureError) => console.error(err)
      );
  }

}
