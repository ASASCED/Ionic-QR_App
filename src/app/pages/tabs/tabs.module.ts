import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { MapaPage } from '../mapa/mapa.page';
import { MapaPageModule } from '../mapa/mapa.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {path: 'home', loadChildren: '../home/home.module#HomePageModule', pathMatch: 'full'},
      {path: 'guardados', loadChildren: '../guardados/guardados.module#GuardadosPageModule', pathMatch: 'full'},
      {path: '', redirectTo: '/tabs/home', pathMatch: 'full'},
    ]
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
  declarations: [TabsPage]
})
export class TabsPageModule {}
