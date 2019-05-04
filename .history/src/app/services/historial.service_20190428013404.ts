import { Injectable } from '@angular/core';
import { ScanData } from '../pages/models/data-info.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { MapaPage } from '../pages/mapa/mapa.page';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private _historial: ScanData[] = [];

  constructor(
    private _iab: InAppBrowser,
    private _modalCtrl: ModalController,
    private _contacts: Contacts,
    private _platform: Platform,
    private _toastCtrl: ToastController
  ) { }

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
        this.crearContacto(scanData.info);
        console.log('Paso por service');
        break;

      default:
        console.error('Tipo no soportado');
        break;
    }
  }

  private crearContacto(texto: string) {
    const campos: any = this.parse_vcard(texto);
    console.log(campos);

    const nombre = campos['fn'];
    const tel = campos.tel[0].value[0];

    if (!this._platform.is('cordova')) {
      console.warn('Estoy en la computadora, no puedo crear contacto.');
      return;
    }

    const contact: Contact = this._contacts.create();
    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('movile', tel)];
    contact.save().then(
      () => this.crearToast(`Contacto ${nombre} creado!`),
      (error) => this.crearToast(`Error ${error}`)
    );
  }

  private async crearToast(msg: string) {
    const toast = await this._toastCtrl.create({
      message: msg,
      duration: 2500
    });

    toast.present();
  }

  private parse_vcard(input: string) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
      var results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        var meta = {};
        results[2].split(';')
          .map(function (p, i) {
            var match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ["TYPE" + (i === 0 ? "" : i), p];
            }
          })
          .forEach(function (p) {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    });

    return fields;
  };
}
