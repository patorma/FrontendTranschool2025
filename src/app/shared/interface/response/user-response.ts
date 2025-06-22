import { roles } from "../user";

export interface UserResponse{

    id:        number;
    name:      string;
    last_name: string;
    comuna:    string;
    role?:      roles;
    telefono:  string;
    email:     string;
  /**
   *  'id'=> $this->id,
            'name' => $this->name,
            'last_name' => $this->last_name,
            'comuna' => $this->comuna,
            'role' => $this->role,
            'email' => $this->email,
            'telefono' => $this->telefono
   *
   *
   */
}

