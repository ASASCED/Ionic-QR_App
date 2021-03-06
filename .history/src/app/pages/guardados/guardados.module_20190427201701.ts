import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuardadosPage } from './guardados.page';
import { MapaPage } from '../mapa/mapa.page';
import { MapaPageModule } from '../../../../.history/src/app/pages/mapa/mapa.module_20190427200351';

const routes: Routes = [
  {
    path: '',
    component: GuardadosPage
  }
];

@NgModule({
  entryComponents: [
    MapaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MapaPageModule
  ],
  declarations: [GuardadosPage]
})
export class GuardadosPageModule {}
