import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MapaPage } from '../pages/mapa/mapa.page';
import { MapaPageModule } from '../pages/mapa/mapa.module';
import { HistorialService } from './historial.service';

@NgModule({
  entryComponents: [
    MapaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageModule
  ],
  declarations: [HistorialService]
})
export class HistorialServiceModule {}
