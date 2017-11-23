import { Component, OnInit } from '@angular/core';
import { DatosEmpresa } from '../model/DatosEmpresa/datos-empresa';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../model/Clientes/cliente';
import { DataBaseService } from '../services/data-base/data-base.service'
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-aprobacion-cliente',
  templateUrl: './aprobacion-cliente.component.html',
  styleUrls: ['./aprobacion-cliente.component.css']
})
export class AprobacionClienteComponent implements OnInit {
  datos_empresa: DatosEmpresa = new DatosEmpresa();
  cliente: Cliente;
  //variable que recibe de registro
  clienteId: number;
  //validaciones de los campos 
  validar = [false, false, false, false];
  //variables para mostrar error
  mostrarnsalario; mostrarnit; mostrarFecha; mostrarmonbre;
  //variables para mostrar error en las clases
  clase_salario; clase_nit; clase_nom; clase_fec;
  //captura la fecha de hoy 
  fechaHoy = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() - 1);
  //imprime el resultado de aprobecion
  resulta; ob;color;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataBaseService: DataBaseService,
    private _cookieService: CookieService) { }



  ngOnInit() {
    //captura los datos de registro
    //consulta de la bd con el dato mandado desde resgistro 
    this.clienteId = +this._cookieService.get("ID");
    this.cliente = this._dataBaseService.getClienteID(this.clienteId);
  }

  //validacion campo nombre
  valdarNombre(input) {
    console.log(input.value);
    if (input.value == undefined || input.value == "") {
      this.clase_nom = "has-danger";
      this.mostrarmonbre = "No se permiten el campo vacio.";
      this.validar[0] = false;
    } else {
      this.clase_nom = "has-success";
      this.mostrarmonbre = "";
      this.validar[0] = true;
    }   
  }

  //validacion campo nit
  ValidarNit(input) {
    if (input.value == "undefined" || input.value == null) {
      if (input.value == null) {
        this.clase_nit = "has-danger";
        this.mostrarnit = "No se permiten caracteres especiales ni el campo vacio.";
        this.validar[1] = false;
      } else {
        this.clase_nit = "";
        this.mostrarnit = "";
        this.validar[1] = false;
      }
    } else {
      if (!input.pristine) {
        if (input.valid) {
          this.mostrarnit = "";
          this.clase_nit = "has-success";
          this.validar[1] = true;
        } else {
          this.clase_nit = "has-danger";
          this.mostrarnit = "Dato ingresado no es correcto.";
          this.validar[1] = false;
        }
      } else {
        this.clase_nit = "has-danger";
        this.mostrarnit = "campo esta vacio.";
        this.validar[1] = false;
      }
    }
    
  }

  //validacion campo salario
  Validarsalario(input) {
    if (this.datos_empresa.salario != null) {

      if (this.datos_empresa.salario > 100000000) {
        this.mostrarnsalario = "El Salario no puede ser superior a $100.000.000";
        this.clase_salario = "has-danger";
        this.validar[2] = false;
      } else {
        this.mostrarnsalario = "";
        this.clase_salario = "has-success";
        this.validar[2] = true;
      }
    } else {
      this.clase_salario = "has-danger";
      this.mostrarnsalario = "El dato ingresado no es valido.";
      this.validar[2] = false;
    }
  }

  //validacion campo fecha
  validarFecha(input) {

    if (input.value == "undefined" || input.value == null) {
      this.clase_fec = "";
      this.mostrarFecha = "";
      this.validar[3] = false;
    } else {
      if (new Date(input.value) < new Date(this.fechaHoy)) {
        this.clase_fec = "has-success";
        this.mostrarFecha = "";
        this.validar[3] = true;
      } else {
        this.clase_fec = "has-danger";
        this.mostrarFecha = "fecha no valida.";
        this.validar[3] = false;
      }
    }
  }

  //validacion btn enviar aprobacion
  enviar(): boolean {
    let btn = true;
    this.validar.forEach(valor => {
      if (valor == false) {
        btn = false;
      }
    });
    return btn;
  }

  //calcular las varibles para aprobacion 
  aprobacion() {
    this.Guardar();
    if (new Date(this.datos_empresa.FechaIngreso) >= (new Date((new Date().getFullYear() - 1) + "-" + (new Date().getMonth() - 5) + "-" + new Date().getDate()))) {
      this.resulta = "Desfavorable.";
      this.ob = "Lo sentimos la antiguedad no es valida";    
      this.color = "rojo"; 
    } else {
      if (this.datos_empresa.salario <= 800000) {        
        this.resulta = "Desfavorable.";
        this.ob = "El salario ingresado es inferior a $800.000.";  
        this.color = "rojo";       
      } else {
        this.color = "verde";
        if (this.datos_empresa.salario<=1000000) {
          this.resulta = "Favorable.";
          this.ob = "le informamos que el cupo maximo aprobado es $5.000.000";          
        } else {
          if (this.datos_empresa.salario<=4000000) {
            this.resulta = "Favorable.";
            this.ob = "le informamos que el cupo maximo aprobado es $20.000.000";
          } else {
            this.resulta = "Favorable.";
            this.ob = "le informamos que el cupo maximo aprobado es $50.000.000";
          }          
        }        
      }
    }
  }

  Guardar(){
    if (this.enviar()){
      this._dataBaseService.insertarEmpresa(this.cliente,this.datos_empresa);
    }
  }
}
