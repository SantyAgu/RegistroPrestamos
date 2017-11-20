import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Cliente } from '../../model/Clientes/cliente'
import { DatosEmpresa } from '../../model/DatosEmpresa/datos-empresa'

@Injectable()



export class DataBaseService {
  
  private _clientes: Array<Cliente>;
  
  constructor(private http: Http) {
    this._clientes = new Array<Cliente>();
  }



  getClientes() {
    let results;
    let url = "http://CPX-I8O9NOUETXP:5000/select";
    this.http.get(url).subscribe(data => {
      results = JSON.parse(data["_body"]).SQLreturn[0];
      for (let i = 0; i < results.length; i++) {
        let cl: Cliente;
        cl = new Cliente();
        cl.id = results[i].pk_cliente_id;
        cl.nombre = results[i].cliente_nombre;
        cl.apellido = results[i].cliente_apellido;
        cl.fechaNacimiento = results[i].cliente_FechaNacimiento;

        this._clientes.push(cl);
      }
    });
    return this._clientes;
  }


  getEmpresa(id:Number) {
    let results;
    let de: DatosEmpresa;
    de = new DatosEmpresa();
    let url = "http://CPX-I8O9NOUETXP:5000/select/"+ id;
    this.http.get(url).subscribe(data => {
      
      results = JSON.parse(data["_body"]).SQLreturn[0];
      for (let i = 0; i < results.length; i++) {
        de.NombreEmpresa = results[i].cliente_NombreDeEmpresa;
        de.NIT = results[i].cliente_NIT;
        de.salario = results[i].cliente_Salario;
        de.FechaIngreso = results[i].cliente_FechaDeIngreso;

      }
    });
    return de;
  }

  getClienteID(id: Number) {
    let results;
    let cl: Cliente;
    cl = new Cliente();
    let url = "http://CPX-I8O9NOUETXP:5000/select/" + id;
    this.http.get(url).subscribe(data => {
      results = JSON.parse(data["_body"]).SQLreturn[0];
      for (let i = 0; i < results.length; i++) {
        cl.id = results[i].pk_cliente_id;
        cl.nombre = results[i].cliente_nombre;
        cl.apellido = results[i].cliente_apellido;
        cl.fechaNacimiento = results[i].cliente_FechaNacimiento;

      }
    });
    return cl;
  }




  insertCliente(cl: Cliente) {
    let results;
<<<<<<< HEAD
    let url = "http://CPX-I8O9NOUETXP:5000/insert/" + cl.id + "/" + cl.nombre + "/" + cl.apellido + "/" + cl.fechaNacimiento;
=======
    let url = "http://192.168.3.187:5000/insert/" + cl.id + "/" + cl.nombre + "/" + cl.apellido + "/" + cl.fechaNacimiento;
>>>>>>> 062a149058e7b39f003636aa3b8cd15e1bbabf04
      this.http.get(url).subscribe(data => {
        if (JSON.parse(data["_body"]).ERROR != undefined)
          return 0;
        else
        return JSON.parse(data["_body"]).SQLreturn[0];
        
      });
<<<<<<< HEAD
=======
   
>>>>>>> 062a149058e7b39f003636aa3b8cd15e1bbabf04
  }
}
