import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Global } from './global';

@Injectable()
export class ClienteService {

    public url: string;

    constructor (
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    pruebas(){
        return "funciono" 
    }

    getClientes():Observable<any>{
        return this._http.get(this.url+'?route=cliente&action=getclientes');
    }

    getCliente(dni):Observable<any>{
        return this._http.get(this.url+'?route=cliente&action=getcliente&dni='+dni);
    }

    saveCliente(cliente):Observable<any>{
        let params = JSON.stringify(cliente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(this.url+'?route=cliente&action=savecliente', params, {headers: headers});
    }

    updateCliente(dni, cliente):Observable<any>{
        let params = JSON.stringify(cliente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(this.url+'?route=cliente&action=updatecliente&dni='+dni, params, {headers: headers});
    }

    deleteCliente(dni):Observable<any>{
        return this._http.get(this.url+'?route=cliente&action=deletecliente&dni='+dni);
    }
}