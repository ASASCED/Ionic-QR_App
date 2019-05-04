import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { HistorialService } from '../../services/historial.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private _barcodeScanner: BarcodeScanner,
    private _toast: ToastController,
    private _platform: Platform,
    private _historialService: HistorialService
  ) {

  }

  ngOnInit() {
  }

  scan() {

    if (!this._platform.is('cordova')) {
      this._historialService.agregarHistorial("https://www.google.com/maps/place/51%C2%B002'57.3%22N+13%C2%B044'18.1%22E/@51.049259,13.73836,17z");
      return;
    }

    this._barcodeScanner.scan().then(barcodeData => {
      console.log('Result: ', barcodeData.text);
      console.log('Format: ', barcodeData.format);
      console.log('Cancelled: ', barcodeData.cancelled);
      this.mostrarResult(barcodeData.text);

      if (!barcodeData.cancelled && barcodeData.text != null) {
        this._historialService.agregarHistorial(barcodeData.text);
      }
     }).catch(err => {
         console.error('Error: ', err);
         this.mostrarError( 'Error: ' + err );
     });

  }

  async mostrarError( msg: string ) {
    const toast = await this._toast.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }

  async mostrarResult( msg: string ) {
    const toast = await this._toast.create({
      message: msg,
      duration: 50000
    });
    toast.present();
  }

}
