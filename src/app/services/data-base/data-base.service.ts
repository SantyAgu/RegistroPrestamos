import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Cliente } from '../../model/Clientes/cliente'
import { DatosEmpresa } from '../../model/DatosEmpresa/datos-empresa'
import { Observable } from 'rxjs/Observable';
@Injectable()



export class DataBaseService {

  private _clientes: Array<Cliente>;

  constructor(private http: Http) {
    this._clientes = new Array<Cliente>();
    this.cl = new Cliente();

  }
  cl: Cliente;



  getClientes() {
    let results;
    let url = "http://192.168.3.187:5000/select";
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


  getEmpresa(id: Number) {
    let results;
    let de: DatosEmpresa;
    de = new DatosEmpresa();
    let url = "http://192.168.3.187:5000/select/" + id;
    url=encodeURIComponent(url);
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

    let cl: Cliente;
    cl = new Cliente();
    let url = "http://192.168.3.187:5000/select/" + encodeURIComponent(id.toString());
    this.http.get(url).subscribe(res => {
      let results;
      results = JSON.parse(res["_body"]).SQLreturn[0];
      if (results.length > 0) {

        cl.id = results[0].pk_cliente_id;
        cl.nombre = results[0].cliente_nombre;
        cl.apellido = results[0].cliente_apellido;
        cl.fechaNacimiento = results[0].cliente_FechaNacimiento;
      }



    },
      err => console.log(err));
    return cl;
  }


  insertCliente(cl: Cliente) {
    let results;
    results = new Cliente();
    let url = "http://192.168.3.187:5000/insert/" + encodeURIComponent(cl.id.toString()) + "/" + encodeURIComponent(cl.nombre) + "/" +encodeURIComponent( cl.apellido) + "/" + encodeURIComponent(cl.fechaNacimiento.toString());
    let sub = this.http.get(url).subscribe(data => {
      if (JSON.parse(data["_body"]).ERROR != undefined) {

        results = new Cliente();
      }
      else {
        results.id = cl.id;
        results.nombre = cl.nombre;
        results.apellido = cl.apellido;
        results.fechaNacimiento = cl.fechaNacimiento;
      }
    },
      err => {
        results = new Cliente();


      });
    return results;
  }


  insertarEmpresa(cl: Cliente, em: DatosEmpresa) {
    let results = new Cliente();
    let url = "http://192.168.3.187:5000/update/" + encodeURIComponent(cl.id.toString()) + "/" + encodeURIComponent(em.NombreEmpresa) + "/" + encodeURIComponent(em.NIT.toString()) + "/" + encodeURIComponent(em.salario.toString()) + "/" + encodeURIComponent(em.FechaIngreso.toString());
    let sub = this.http.get(url).subscribe(data => {
      if (JSON.parse(data["_body"]).ERROR != undefined) {

        results = new Cliente();
      }
      else {
        results.id = cl.id;
        results.nombre = cl.nombre;
        results.apellido = cl.apellido;
        results.fechaNacimiento = cl.fechaNacimiento;
      }
    },
      err => {
        results = new Cliente();


      });
    return results;
  }
}

