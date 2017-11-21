import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/Clientes/cliente';
import { DataBaseService } from '../services/data-base/data-base.service'
import { RouterModule, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

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
  igual = (new Date().getFullYear() - 18) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
  validacionID: boolean = false;
  //minDate =;  
  ngOnInit() {
    console.log(this.fecha);
    let timer = Observable.timer(2000, 1000);
    timer.subscribe(t => {
      this.Intervalo();
    });
  }

  

  Enviar(form): boolean {
    this.validar = false;
    try {
      if (form._directives[0].value.valueOf() > 0 && this.validacionID) {
        if (form._directives[1].value != "" && form._directives[1].valid) {
          if (form._directives[2].value != "" && form._directives[2].valid) {
            try {
              if (form._directives[3].value.getFullYear() == new Date().getFullYear()) { }
            }
            catch (err) {
              if (new Date(this.cliente.fechaNacimiento) < new Date(this.fecha))
                this.validar = true;
            }
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
      else{
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
      else{
         return 'form-group row has-danger';
      }
    }
    else
      return 'form-group row ';
  }

  ChangeClassNames(val){
    if (!val.pristine) {
      if (val.valid) {
        return 'form-group row has-success';
      }
      else{
        return 'form-group row has-danger';
      }
    }
    else
      return 'form-group row ';
  }

  ExisteId(id) {
    console.log(id.model);
    this.clienteverify = this._dataBaseService.getClienteID(id.model);
    (console.log(this.clienteverify));
  }
  guardar() {
    alert("guardar");
    console.log(this._dataBaseService.insertCliente(this.cliente));
    this._router.navigate(['/Aprobacion/' + this.cliente.id]);
  }


}
