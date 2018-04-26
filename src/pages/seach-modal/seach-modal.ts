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
import { HttpServiceProvider } from '../../providers/http-service/http-service';

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
  imageSrc: any;
  imageFileFromServer: any = null;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public base64ToGallery: Base64ToGallery,
    public loadingCtrl: LoadingController,
    public fileChooser: FileChooser,
    public httpService: HttpServiceProvider,
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
      alert('got file from local');
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

  private openGallery (): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    }
  
    this.camera.getPicture(cameraOptions)
      .then(file_uri => {
        this.imageSrc = file_uri

      }, 
      err => console.log(err));   
  }

  uploadFile() {
    
    
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageSrc, "http://192.168.0.118:3000/api/fileupload", options)
      .then((data) => {
        alert('loading file');
      console.log(data+" Uploaded Successfully");
      this.imageFileFromServer = "http://192.168.0.118:3000/profile/ionicfile.jpg"
      
      
    }, (err) => {
      console.log(err);      
    });
  }

}
