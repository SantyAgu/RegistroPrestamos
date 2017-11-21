import { Component, OnInit } from '@angular/core';
import {DatosEmpresa} from '../model/DatosEmpresa/datos-empresa';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aprobacion-cliente',
  templateUrl: './aprobacion-cliente.component.html',
  styleUrls: ['./aprobacion-cliente.component.css']
})
export class AprobacionClienteComponent implements OnInit {
  datos_empresa: DatosEmpresa= new DatosEmpresa();
  clienteId:number;
  validar=[false,false,false,false];
  mostrarnsalario;
  clase_salario;
  
  fecha = (new Date().getFullYear() - 1) + "-" + (new Date().getMonth() -5) + "-" + new Date().getDate();
  

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {    
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']!=null){
          this.clienteId = +params['id']; 
          console.log(this.clienteId);
      }
      
   });
  }
  salario(){
    if (this.datos_empresa.salario!=null) {
      if (this.datos_empresa.salario<=800000) {
        this.clase_salario="has-danger";
        this.mostrarnsalario="Salario debe ser mayor a $800.000.";
      } else {
        if (this.datos_empresa.salario>100000000) {
          this.mostrarnsalario="El Salario es Superior a $100.000.000";
          this.clase_salario="has-danger";
        } else {
          this.clase_salario="has-success";
          this.mostrarnsalario="Salario OK.";
        }        
      }
    } else {
      this.clase_salario="";
      this.mostrarnsalario="";

    }
  }

}
