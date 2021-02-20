export class Pedido{
    constructor(
        public idPedido: string,
        public fecha: string,
        public dirEntrega: string,
        public nTarjeta: string,
        public fechaCaducidad: string,
        public matriculaRepartidor: string,
        public dniCliente: string,
        public nombreCliente: string
    ){
        
    }
} 