import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/Clientes/cliente';
import { DataBaseService } from '../services/data-base/data-base.service'
import { RouterModule, Routes, Router } from '@angular/router';
import "rxjs/Rx";
  import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
  constructor(private _dataBaseService: DataBaseService, private _router: Router) { }
  cliente: Cliente = new Cliente();
  clienteverify: Cliente = new Cliente();
  fecha = (new Date().getFullYear() - 18) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
  validar: boolean = false;
  validacionID: boolean = false;
  Returned: boolean = true;


  //minDate =;  
  ngOnInit() {
    let timer = Observable.timer(2000, 1000);
    timer.subscribe(t => {
      this.Intervalo();
    });
  }



  Enviar(form): boolean {
    console.log(this.Returned);
    
    this.validar = false;
    try {
      if (this.cliente.id > 0 && this.validacionID) {
        if ((this.cliente.nombre != "" && form._directives[1].valid)) {
          if (this.cliente.nombre != "" && form._directives[2].valid) {
            if (new Date(this.cliente.fechaNacimiento) < new Date(this.fecha))
              this.validar = true;
          }
        }
      }
    } catch (error) {

    }
    return this.validar;
  }



  Intervalo() {
    if (this.clienteverify.id == 0)
      this.validacionID = true;

    else
      this.validacionID = false;

    return this.validacionID;
  }





  ChangeClassID(val) {
    if (!val.pristine) {
      if ((this.Intervalo()) && this.cliente.id != 0 && val.valid) {
        return 'form-group row has-success';
      }
      else {
        return 'form-group row has-danger';
      }
    }
    else
      return 'form-group row ';
  }

  ChangeClassFecha(val) {
    if (!val.pristine) {
      if (new Date(this.cliente.fechaNacimiento) < new Date(this.fecha) && val.valid) {
        return 'form-group row has-success';
      }
      else {
        return 'form-group row has-danger';
      }
    }
    else
      return 'form-group row ';
  }

  ChangeClassNames(val) {
    if (!val.pristine) {
      if (val.valid) {
        return 'form-group row has-success';
      }
      else {
        return 'form-group row has-danger';
      }
    }
    else
      return 'form-group row ';
  }

  ExisteId(id) {
    this.clienteverify = this._dataBaseService.getClienteID(id.model);
    (console.log(this.clienteverify));
  }

  guardar() {
    if (confirm("¿Desea guardar su registro?")) {
      if (this.validar) {
        this.Returned = this._dataBaseService.insertCliente(this.cliente)
        let timer = Observable.timer(2000);
        timer.subscribe(() => {
          this.Redirect();
        });
      }
      else
        alert('Verifique los campos del formulario');
    }
    
  }

  Redirect() {
    if (this.Returned || this.Returned == undefined)
      alert('Error al guardar el registro');
    else
      this._router.navigate(["Aprobacion/" + this.cliente.id]);
  }


}
