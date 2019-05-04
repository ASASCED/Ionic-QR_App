import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MapaPage } from '../pages/mapa/mapa.page';
import { MapaPageModule } from '../pages/mapa/mapa.module';

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
  declarations: []
})
export class TabsPageModule {}