import { Component, OnInit } from '@angular/core';
import { Cliente }  from '../model/Clientes/cliente';
import {DataBaseService} from '../services/data-base/data-base.service'

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
  cliente: Cliente= new Cliente();
  fecha = (new Date().getFullYear()-18) +"-"+ (new Date().getMonth()+1) +"-"+ new Date().getDate() ;
  
  
  
  //minDate =;
  ngOnInit() {
    console.log(this.fecha)
  }
  

}
