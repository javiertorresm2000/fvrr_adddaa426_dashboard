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
    lineaspedidos: Array<any> = [];
  
    public pedido: any;
    public pedidos: Pedido[];
    public clientes: Cliente[];
    public productos: any;
    public productoPedido: any;
  
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
        lineasPedidos: []
      }

      this.productoPedido = {
        idPedido: '',
        idProducto: '',
        cantidad: ''
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

    agregarProducto(){
      if(this.productoPedido.idProducto !== '' && this.productoPedido.cantidad !== ''){
        let nombreProd = '';
        for(let i = 0; i < this.productos.length; i++){
          
          if(String(this.productos[i].idProducto) === String(this.productoPedido.idProducto)){
            nombreProd = this.productos[i].nombre;
            break;
          }
        }
        let arrayTemp = {
          idPedido: this.idPedido,
          idProducto: this.productoPedido.idProducto,
          nombre: nombreProd,
          cantidad: this.productoPedido.cantidad
        }
        this.lineaspedidos.push(arrayTemp);
        this.productoPedido.idProducto = '';
        this.productoPedido.cantidad = '';
        this.productoPedido.idPedido = '';
      }else{
        alert('Necesitas especificar el producto y la cantidad');
      }
    }

    eliminarProd(i){
      this.lineaspedidos.splice(i, 1);
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
      if(this.lineaspedidos.length > 0){
        this.pedido.lineasPedidos = this.lineaspedidos;
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
      }else{
        alert('Necesitas agrgar al menos un producto al pedido');
      }
    }
  
    editarPedido(idPedido){
      this.idPedido = idPedido;
      this.abrilModalPedido();
      this._pedidoService.getPedido(idPedido).subscribe(
        response => {
          if(response.status === '200'){
            let pedido = response.data.pedido;
            this.pedido.fecha = pedido.fecha;
            this.pedido.fechaCaducidad = pedido.fechaCaducidad;
            this.pedido.dirEntrega = pedido.dirEntrega;
            this.pedido.nTarjeta = pedido.nTarjeta;
            this.pedido.fechaCaducidad = pedido.fechaCaducidad;
            this.pedido.matriculaRepartidor = pedido.matriculaRepartidor;
            this.pedido.dniCliente = pedido.dniCliente;

            this.lineaspedidos = response.data.lineaspedidos;
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
      if(this.lineaspedidos.length > 0){
        this.pedido.lineasPedidos = this.lineaspedidos;
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
      }else{
        alert('Necesitas agrgar al menos un producto al pedido');
      }
    }
  
    eliminarPedido(idPedido){
      this._pedidoService.deletePedido(idPedido).subscribe(
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
      
      this.productoPedido.idProducto = '';
      this.productoPedido.cantidad = '';

      this.lineaspedidos = [];
    }
  }
