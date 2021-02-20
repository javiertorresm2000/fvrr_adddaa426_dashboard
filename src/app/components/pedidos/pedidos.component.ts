import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service'
import { Pedido } from '../../models/pedido';
import { ClienteService } from '../../services/cliente.service'
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  providers: [PedidoService,ClienteService]
})
export class PedidosComponent implements OnInit {
    display = 'none';
    btnGuardar = 'none';
    btnActualizar = 'none';
  
    idPedido: string;
  
    public pedido: any;
    public pedidos: Pedido[];
    public clientes: Cliente[];
    public productos: any;
  
    constructor(
      private _pedidoService: PedidoService,
      private _clienteService: ClienteService
    ) {
      this.pedido = {
        fecha: '',
        dirEntrega: '',
        nTarjeta: '',
        fechaCaducidad: '',
        matriculaRepartidor: '',
        dniCliente: '',
        idProducto: '',
        cantidadProducto: ''
      }
    }
  
    ngOnInit(): void {
      this.cargarPedidos();
      this.limpiarFormPedido();
    }
  
    abrilModalPedido(){
      this.display='block';
      this.limpiarFormPedido();
      this.btnActualizar = 'none';
      this.btnGuardar = 'block';
      this.cargarClientes();
      this.cargarProductos();
    }
  
    cerrarModal(){
      this.display='none';
    }

    cargarClientes(){
      this._clienteService.getClientes().subscribe(
        response => {
          if(response.status === '200'){
            this.clientes = response.data;
          }
        },
        error => {
          console.log(error)
        }
      );
    }

    cargarProductos(){
      this._pedidoService.getProductos().subscribe(
        response => {
          if(response.status === '200'){
            this.productos = response.data;
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  
    cargarPedidos(){
      this._pedidoService.getPedidos().subscribe(
        response => {
          if(response.status === '200'){
            this.pedidos = response.data;
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  
    guardarPedido(){
      this._pedidoService.savePedido(this.pedido).subscribe(
        response => {
          if(response.status === '200'){
            this.cargarPedidos();
            this.cerrarModal();
          }else if(response.status === '500'){
            alert(response.data);
          }
        },
        error => {
  
        }
      )
    }
  
    editarPedido(idPedido){
      this.idPedido = idPedido;
      this.abrilModalPedido();
      this._pedidoService.getPedido(idPedido).subscribe(
        response => {
          if(response.status === '200'){
            this.pedido.fecha = response.data.fecha;
            this.pedido.fechaCaducidad = response.data.fechaCaducidad;
            this.pedido.dirEntrega = response.data.dirEntrega;
            this.pedido.nTarjeta = response.data.nTarjeta;
            this.pedido.fechaCaducidad = response.data.fechaCaducidad;
            this.pedido.matriculaRepartidor = response.data.matriculaRepartidor;
            this.pedido.dniCliente = response.data.dniCliente;
            this.pedido.idProducto = response.data.idProducto;
            this.pedido.cantidadProducto = response.data.cantidadProducto;
          }
        },
        error => {
          console.log(error)
        }
      );
      this.btnActualizar = 'block';
      this.btnGuardar = 'none';
    }
  
    actualizarPedido(){
      this._pedidoService.updatePedido(this.idPedido, this.pedido).subscribe(
        response => {
          if(response.status === '200'){
            this.cargarPedidos();
            this.cerrarModal();
            this.limpiarFormPedido();
          }else if(response.status === '500'){
            alert(response.data);
          }
        },
        error => {
  
        }
      )
    }
  
    eliminarPedido(dni){
      console.log(dni)
      this._pedidoService.deletePedido(dni).subscribe(
        response => {
          if(response.status === '200'){
            this.cargarPedidos();
            alert(response.data);
          }
        },
        error => {
  
        }
      )
    }
  
    limpiarFormPedido(){
      this.pedido.fecha = '';
      this.pedido.fechaCaducidad = '';
      this.pedido.dirEntrega = '';
      this.pedido.nTarjeta = '';
      this.pedido.fechaCaducidad = '';
      this.pedido.matriculaRepartidor = '';
      this.pedido.dniCliente = '';
      this.pedido.idProducto = '';
      this.pedido.cantidadProducto = '';    }
  }
