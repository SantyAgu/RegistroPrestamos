import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/Clientes/cliente';
import { DatosEmpresa } from '../model/DatosEmpresa/datos-empresa';
import { DataBaseService } from '../services/data-base/data-base.service'
import { RouterModule, Routes, Router } from '@angular/router';
import "rxjs/Rx";
  import { Observable } from 'rxjs/Observable';
  import { CookieService,CookieOptions } from 'ngx-cookie';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  //inicializaciones - servicios.
  constructor(
    private _dataBaseService: DataBaseService, 
    private _router: Router,
    private _cookieService: CookieService) { }
//inicializaciones - Objetos de uso en la página.
  cliente: Cliente = new Cliente();
  clienteverify: Cliente = new Cliente();
  fecha = (new Date().getFullYear() - 18) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
  validar: boolean = false;
  validacionID: boolean = false;
  Returned: Cliente = new Cliente();
  regis: boolean=false ;
  id;hability:boolean=false;
  mostrarinput;clase_input;


  //On init, se inicializa una función que periodicamente va verificando el valor de una variable,
  //Es para ver si el usuario que se está registrando existe o no en la base de datos  
  //se debe consultar periodicamente debido a que la consulta a la base de datos es asincrona 
  //el valor consultado no se actualiza de immediato sino que tarda un tiempo
  ngOnInit() {
    let timer = Observable.timer(2000, 1000);
    timer.subscribe(t => {
      this.Intervalo();
    });
  }
  
  Intervalo() {
    if (this.clienteverify.id == 0)
      this.validacionID = true;

    else
      this.validacionID = false;

    return this.validacionID;
  }

//función que varifica los campos para habilitar o deshablitar dinámicamente el botón enviar 
  Enviar(form): boolean {
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

  //Cambia dinámicamente la clase css del formulario, en este caso el ID del formulario
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
  //Cambia dinámicamente la clase css del formulario, en este caso el input de fecha del formulario
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

  //Cambia dinámicamente la clase css del formulario, en este caso los input de nombre del formulario

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

  //Esta función consulta en la base de datos si existe el id que van ingresando,
  //lo retorna a un objeto CLiente el cual sólo sirve para verificar
  ExisteId(id) {
    this.clienteverify = this._dataBaseService.getClienteID(this.cliente.id);
  }

  //Guardar es el método que se ejecuta al dar click al botón guardar,
  //simplemente se crea la cookie de sesón y se guarda el usuario creado.
  //este usuario creado se retorna del servicio y se lleva a una variable
  //es para verificar que se halla guardado satisfactoriamente el registro. 
  guardar() {
    if (confirm("¿Desea guardar su registro?")) {
      if (this.validar) {
      this._cookieService.put("ID",this.cliente.id.toString(), this.options);
       this.Returned = (this._dataBaseService.insertCliente(this.cliente));
        let timer = Observable.timer(1500);
        timer.subscribe(() => {
          this.Redirect();
        });
      }
      else
        alert('Verifique los campos del formulario');
    }
  }

  //La redirección al guardar, se verifica que el guardado sea exitoso y se redirige
  //al siguiente formulario, se ejecuta después de un tiempo debido al retraso que causa almacenar en el servior 
  Redirect() {
    if (this.Returned.id ==0)
      alert('Error al guardar el registro');
    else{
      this._router.navigate(["Aprobacion"]);
    }
  }

  // este método es para verificar si se muestra el formulario o no
  show(val:number) {
    
    if (val==1) {
      this.regis = false;
    } else {
      this.regis = true;
    }
  }


  //esto es para verificar que el input de busqueda de usuario esté ingresado correctamente
  Validar(input){   
      if (input.valid) {
        this.hability=true;
        this.mostrarinput = "";
        this.clase_input = "has-success";
        this.clienteverify = this._dataBaseService.getClienteID(this.id);
        
      } else {
        this.hability=false;
        this.mostrarinput = "Dato no es valido";
        this.clase_input = "has-danger";        
      }
  }


  //las opciones de la cookie que se crea al crear un nuevo usuario o al buscar uno ya existente
  options: CookieOptions = {
    path: '/',
    expires: new Date(new Date().valueOf() +300000),
    
  };

  //aquí se verifica que el usuario ya exista en la base de datos al darle al botón enviar
  enviar(){
    if (this.clienteverify.id==0) {
      this.mostrarinput = "Usuario no esta registrado.";
      this.clase_input = "has-danger"; 
      this.hability=false;    
    } else {
      this.regis=true;
      this._cookieService.put("ID",this.clienteverify.id.toString(), this.options);
      this._router.navigate(["Aprobacion"]);
    }

  }


}
