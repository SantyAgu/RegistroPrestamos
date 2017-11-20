import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/Clientes/cliente';
import { DataBaseService } from '../services/data-base/data-base.service'

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
  constructor(private _dataBaseService: DataBaseService) { }


  cliente: Cliente = new Cliente();
  clienteverify: Cliente = new Cliente();
  fecha = (new Date().getFullYear() - 18) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
  validar: boolean = false;
  igual = (new Date().getFullYear() - 18) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
  mostrarId = "La identificación es requerida ";
  validacionID: boolean;
  //minDate =;
  ngOnInit() {
    console.log(this.fecha)
  }

  Enviar(form): boolean {

    if (this.clienteverify.id == 0) {
      this.validacionID= true;
      this.mostrarId = "La identificación es requerida ";
  }
    else {
      this.validacionID= false;
      this.mostrarId = "La identificación ya existe en la base de datos";
  
    }
    console.log(this.validacionID);
    this.validar = false;
    try {
      if (form._directives[0].value.valueOf() > 0 && this.validacionID)  {
        if (form._directives[1].value != "") {
          if (form._directives[2].value != "") {
            try {
              if (form._directives[3].value.getFullYear() == new Date().getFullYear()) { }
            }
            catch (err) {
              this.validar = true;
            }
          }
        }
      }
    } catch (error) {

    }
    return this.validar;
  }


  ExisteId(id) {
    console.log(id.model);
    this.clienteverify = this._dataBaseService.getClienteID(id.model);
    (console.log(this.clienteverify));
  }


}
