import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../services/historial.service';
import { ScanData } from '../models/data-info.model';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {

  historial: ScanData[] = [];

  constructor(
    private _historialService: HistorialService
  ) {
    this.historial = this._historialService.cargarHistorial();
    console.log(this.historial);
  }

  ngOnInit() {
  }

  abrir_Scan( idx: number ) {
    this._historialService.abrirScan(idx);
  }

}
