import { UserResponse } from "./response/user-response";


export interface Pago {
  id:                number;
  monto:             number;
  fecha_vencimiento: string;
  estado:            string;
  fecha_pago:        string | null;
  multa:             number;
  total:             number;
  usuario:           UserResponse;
}










