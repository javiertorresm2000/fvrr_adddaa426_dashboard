import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service'
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [ClienteService]
})
export class UsuariosComponent implements OnInit {

  display = 'none';
  btnGuardar = 'none';
  btnActualizar = 'none';
  public modalTitulo: string;

  dniActual: string;

  public cliente: any;
  public clientes: Cliente[];

  constructor(
    private _clienteService: ClienteService
  ) {
    this.cliente = {
      dni: '',
      nombre: '',
      direccion: '',
      email: '',
      pswd: ''
    }
  }

  ngOnInit(): void {
    this.cargarClientes();
    this.limpiarFormCliente();
    this.modalTitulo = 'Agregar Cliente';
  }

  abrilModalCliente(){
    this.display='block';
    this.limpiarFormCliente();
    this.btnActualizar = 'none';
    this.btnGuardar = 'block';
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

  guardarCliente(){
    this._clienteService.saveCliente(this.cliente).subscribe(
      response => {
        if(response.status === '200'){
          this.cargarClientes();
          this.cerrarModal();
        }else if(response.status === '500'){
          alert(response.data);
        }
      },
      error => {

      }
    )
  }

  editarCliente(dni){
    this.dniActual = dni;
    this.abrilModalCliente();
    this.modalTitulo = 'Actualizar Cliente';
    this._clienteService.getCliente(dni).subscribe(
      response => {
        if(response.status === '200'){
          this.cliente.dni = response.data.dniCliente;
          this.cliente.nombre = response.data.nombre;
          this.cliente.email = response.data.email;
          this.cliente.direccion = response.data.direccion;
          this.cliente.pswd = response.data.pwd;
        }
      },
      error => {
        console.log(error)
      }
    );
    this.btnActualizar = 'block';
    this.btnGuardar = 'none';
  }

  actualizarCliente(){
    this._clienteService.updateCliente(this.dniActual, this.cliente).subscribe(
      response => {
        if(response.status === '200'){
          this.cargarClientes();
          this.cerrarModal();
          this.limpiarFormCliente();
        }else if(response.status === '500'){
          alert(response.data);
        }
      },
      error => {

      }
    )
  }

  eliminarCliente(dni){
    console.log(dni)
    this._clienteService.deleteCliente(dni).subscribe(
      response => {
        if(response.status === '200'){
          this.cargarClientes();
          alert(response.data);
        }
      },
      error => {

      }
    )
  }

  limpiarFormCliente(){
    this.cliente.dni = "";
    this.cliente.nombre = "";
    this.cliente.email = "";
    this.cliente.direccion = "";
    this.cliente.pswd = "";
  }
}
