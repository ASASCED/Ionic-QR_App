import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @Input() info: string;
  lat: number;
  lng: number;

  constructor(
    private _modalCtrl: ModalController,
  ) {
    console.log(this.info);
  }

  ngOnInit() {
  }

  cerrarModal() {
    this._modalCtrl.dismiss();
  }

}
