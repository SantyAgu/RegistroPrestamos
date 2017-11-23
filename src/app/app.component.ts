import { Component } from '@angular/core';
import { directiveDef } from '@angular/core/src/view/provider';
import { DataBaseService } from './services/data-base/data-base.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Cliente } from './model/Clientes/cliente';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent implements OnInit {
 
  constructor() { }

  ngOnInit() {
    //this.router.navigate(["Aprobacion/" + this.cliente.id]);
   
  }


}
