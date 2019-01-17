import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server_ip = "http://localhost:8012/ebudget/"

  constructor(private http: HttpClient) { }

  login(email, password) {
    const url = this.server_ip + "login.php";
    const data = {
      email,
      password
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post<login>(url, data, httpOptions);
  }

  register(email, password, name) {
    const url = this.server_ip + "register.php";
    const data = {
      email,
      password,
      name
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post<register>(url, data, httpOptions);
  }

}
interface login {
  message: string,
  id: number,
  email: string,
  fullname: string,
}
interface register {
  status: string,
  message: string
}
