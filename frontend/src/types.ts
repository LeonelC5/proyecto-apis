export interface IAccount {
  id: number;
  apellido: string;
  celular: string;
  correo: string;
  description: string;
  imagen: string;
  nombre: string;
  password: string;
}

export interface IImage {
  id: number;
  description: string;
  name: string;
  url: string;
}
