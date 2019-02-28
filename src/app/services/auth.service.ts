import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server_ip = "http://192.168.100.2:5000/auth";

  constructor(private http: HttpClient) { }

  login(email, pwd) {
    const url = this.server_ip + "/login";
    const data = {
      email,
      pwd
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post<login>(url, data, httpOptions);
  }

  register(email, password, name, gender) {
    const url = this.server_ip + "/register";
    const data = {
      email,
      pwd: password,
      full_name: name,
      gender
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
  full_name: string,
  avatar_src: string
}
interface register {
  status: string,
  message: string
}
