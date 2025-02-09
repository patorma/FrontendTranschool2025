export interface User {
  id:        number;
  name:      string;
  last_name: string;
  comuna:    string;
  role:      roles;
  telefono:  string;
  email:     string;
  password:  string;
}

export type roles = 'admin' |'apoderado' |'transportista';
