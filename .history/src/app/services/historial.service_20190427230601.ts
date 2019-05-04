import { Injectable } from '@angular/core';
import { ScanData } from '../pages/models/data-info.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { MapaPage } from '../pages/mapa/mapa.page';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private _historial: ScanData[] = [];

  constructor(private _iab: InAppBrowser, private _modalCtrl: ModalController) { }

  cargarHistorial() {
    return this._historial;
  }

  agregarHistorial(texto: string) {
    const data = new ScanData(texto);

    this._historial.unshift(data);

    console.log(this._historial);
    this.abrirScan(0);
  }

  async abrirScan(index: number) {
    const scanData = this._historial[index];

    switch (scanData.tipo) {
      case 'http':
        this._iab.create(scanData.info, '_system');
        break;

      case 'mapa':
        const modal = await this._modalCtrl.create({
          component: MapaPage,
          componentProps: {
            info: scanData.info
          }
        });

        await modal.present();
        break;

      case 'contacto':
        this.crearContacto( scanData.info );
        break;

      default:
        console.error('Tipo no soportado');
        break;
    }
  }

  private crearContacto( texto: string ) {
    
  }
}
