import { Component, OnInit } from '@angular/core';
import { Cliente }  from '../model/Clientes/cliente';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
cliente: Cliente= new Cliente();
  constructor() { }

  ngOnInit() {
  }

}
