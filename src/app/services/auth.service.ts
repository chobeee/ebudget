import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server_ip = "http://localhost/ebudget";

  constructor(private http: HttpClient) { }

  login(email, pwd) {
    console.log(email, pwd)
    const url = this.server_ip + "/auth/login.php";
    const data = {
      email,
      pwd
    }
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   })`
    // };

    return this.http.post<login>(url, JSON.stringify(data));
  }

  register(email, password, name, gender) {
    const url = this.server_ip + "/auth/register.php";
    const data = {
      email,
      pwd: password,
      full_name: name,
      gender,
      avatar_src: ""
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
  avatar_src: string,
  code?: number
}
interface register {
  status: string,
  message: string
}
