import { Component, OnInit } from '@angular/core';
import {DatosEmpresa} from '../model/DatosEmpresa/datos-empresa';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../model/Clientes/cliente';
import { DataBaseService } from '../services/data-base/data-base.service'

@Component({
  selector: 'app-aprobacion-cliente',
  templateUrl: './aprobacion-cliente.component.html',
  styleUrls: ['./aprobacion-cliente.component.css']
})
export class AprobacionClienteComponent implements OnInit {
  datos_empresa: DatosEmpresa= new DatosEmpresa();
  cliente: Cliente;
  clienteId:number;
  validar=[false,false,false,false];
  mostrarnsalario;mostrarnit;mostrarFecha;mostrarmonbre;
  clase_salario;clase_nit;clase_nom;clase_fec;
  fechaHoy = new Date().getFullYear() + "-" + (new Date().getMonth() +1) + "-" +(new Date().getDate()-1);
  fecha = (new Date().getFullYear() - 1) + "-" + (new Date().getMonth() -5) + "-" + new Date().getDate();
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataBaseService: DataBaseService)
     { }

  

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']!=null){
          this.clienteId = +params['id']; 
          this.cliente = this._dataBaseService.getClienteID(this.clienteId);
          console.log(this.cliente);
          console.log(this.clienteId);
         
      }
      
   });
  }

  valdarNombre(input){
    console.log(input.value);
    if (input.value==undefined||input.value=="") {
      this.clase_nom="has-danger";
      this.mostrarmonbre="No se permiten el campo vacio.";
      this.validar[0]=false;
    }else{
      this.clase_nom="has-success";
      this.mostrarmonbre="";
      this.validar[0]=true;
    }
    console.log("--------");
    this.validar.forEach(valor => {console.log("esto es 'valor': "+valor);});
  }

  ValidarNit(input){    
    if (input.value=="undefined"||input.value==null) {
      if (input.value==null) {
        this.clase_nit="has-danger";
        this.mostrarnit="No se permiten caracteres especiales ni el campo vacio.";
        this.validar[1]=false;
      } else {
        this.clase_nit="";
        this.mostrarnit="";
        this.validar[1]=false;
      }      
    } else {
      if (!input.pristine) {
        if (input.valid) {
          this.mostrarnit="";
          this.clase_nit="has-success";
          this.validar[1]=true;
        } else {
          this.clase_nit="has-danger";
          this.mostrarnit="Dato ingresado no es correcto.";
          this.validar[1]=false;
        }      
      } else {
        this.clase_nit="has-danger";
        this.mostrarnit="campo esta vacio.";
        this.validar[1]=false;
      }      
    } 
    console.log("--------");
    this.validar.forEach(valor => {console.log("esto es 'valor': "+valor);});
  }

  salario(input){   

    if (this.datos_empresa.salario!=null) {
      if (this.datos_empresa.salario<=800000) {
        this.clase_salario="has-danger";
        this.mostrarnsalario="Salario debe ser mayor a $800.000.";
        this.validar[2]=false;        
      } else {
        if (this.datos_empresa.salario>100000000) {
          this.mostrarnsalario="El Salario es Superior a $100.000.000";
          this.clase_salario="has-danger";
          this.validar[2]=false;
        } else {
          this.mostrarnsalario="";
          this.clase_salario="has-success";
          this.validar[2]=true;
        }        
      }
    } else {
      this.clase_salario="";
      this.mostrarnsalario="";
      this.validar[2]=false;
    }
    console.log("--------");
    this.validar.forEach(valor => {console.log("esto es 'valor': "+valor);});
  }

  validarFecha(input){
    console.log(new Date(input.value));
    if (input.value=="undefined"||input.value==null) {
      this.clase_fec="";
      this.mostrarFecha="";
      this.validar[3]=false;
    } else {
      if (new Date(input.value)<new Date(this.fechaHoy)) {
        this.clase_fec="has-success";
        this.mostrarFecha="";
        this.validar[3]=true;
      } else {
        this.clase_fec="has-danger";
        this.mostrarFecha="fecha no valida.";
        this.validar[3]=false;
      }      
    }
    console.log("--------");
    this.validar.forEach(valor => {console.log("esto es 'valor': "+valor);});
  }

  enviar():boolean{ 
    let btn= true; 
    this.validar.forEach(valor => {
      if (valor==false) {
        btn= false;
      } 
    });
    return btn;
  }



}
