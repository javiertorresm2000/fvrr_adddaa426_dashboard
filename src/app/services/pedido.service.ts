import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { Global } from './global';

@Injectable()
export class PedidoService {

    public url: string;

    constructor (
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    pruebas(){
        return "funciono" 
    }

    getProductos():Observable<any>{
        return this._http.get(this.url+'?route=pedido&action=getproductos');
    }

    getPedidos():Observable<any>{
        return this._http.get(this.url+'?route=pedido&action=getpedidos');
    }

    getPedido(idPedido):Observable<any>{
        return this._http.get(this.url+'?route=pedido&action=getpedido&idPedido='+idPedido);
    }

    savePedido(pedido):Observable<any>{
        let params = JSON.stringify(pedido);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(this.url+'?route=pedido&action=savepedido', params, {headers: headers});
    }

    updatePedido(idPedido, pedido):Observable<any>{
        let params = JSON.stringify(pedido);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(this.url+'?route=pedido&action=updatepedido&idPedido='+idPedido, params, {headers: headers});
    }

    deletePedido(idPedido):Observable<any>{
        return this._http.get(this.url+'?route=pedido&action=deletepedido&idPedido='+idPedido);
    }
}