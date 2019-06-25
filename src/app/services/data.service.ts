import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  server_ip = "http://192.168.0.14/ebudget/api";
  constructor(private http: HttpClient) { }
  getLeaderboard(start, end) {
    const url = this.server_ip + "/leaderboard.php";
    const params = new HttpParams().set("start", start).set('end', end);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      params
    };
    return this.http.get<[]>(url, httpOptions);
  }

  addTransaction(transact_data) {
    const url = this.server_ip + "/addTransact.php";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.post(url, transact_data, httpOptions);
  }
  
  getTransactions(week_id) {
    const url = this.server_ip + "/getTransact.php";
    const params = new HttpParams().set("week_id", week_id)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      params
    };
    return this.http.get<Transactions[]>(url, httpOptions);
  }

  addBudget(budget_data) {
    const url = this.server_ip + "/addBudget.php";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.post(url, budget_data, httpOptions);
  }
  getBudget(id, start, end) {
    const url = this.server_ip + "/getBudget.php";
    const params = new HttpParams().set("id", id).set("start", start).set("end", end);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      params
    };
    return this.http.get(url, httpOptions);
  }


  getTip() {
    const url = this.server_ip + "/getTip.php";
    const params = new HttpParams();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      params
    };
    return this.http.get(url, httpOptions);
  }


  isCurrentWeekParticipant(id, start, end) {
    const url = this.server_ip + "isParticipant.php";
    const params = new HttpParams().set('id', id).set("start", start).set("end", end)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      params
    };

    return this.http.get<isParticipant>(url, httpOptions);
  }

  getWeekBoard(id, start, end) {
    const url = this.server_ip + "getWeekBoard.php";
    const params = new HttpParams().set('id', id).set("start", start).set("end", end)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      params
    };
    return this.http.get(url, httpOptions);
  }

  getLeaderBoard(start, end) {
    const url = this.server_ip + "getLeaderboard.php";
    const params = new HttpParams().set("start", start).set("end", end)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      params
    };
    return this.http.get<leaderboard[]>(url, httpOptions);
  }

  updateDay(day_id, expenses, save) {
    const url = this.server_ip + "updateDay.php";
    const data = {
      day_id,
      expenses,
      save
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post(url, data, httpOptions);
  }

  participantCurrentWeek(id, budget, start, end, perday_dates) {
    const url = this.server_ip + "joinCurrentWeek.php";
    const data = {
      id,
      budget,
      start,
      end,
      perday_dates
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post(url, data, httpOptions);

  }
}
interface Transactions {
  amount: number,
  date: string,
  day_id: number,
  icon_src: string,
  name: string,
  note: string,
  timestamp: string,
  week_id: number
}
interface isParticipant {
  status: string,
  message: string
}
interface leaderboard {
  info: {
    user_id: number,
    week_id: number,
    budget: number,
    start: string,
    end: string,
    full_name: string,
    email: string,

  },
  data: [{
    date: string,
    day_id: number,
    expenses: number,
    isTouched: boolean,
    save: number,
    today_budget: number,
    week_id: number
  }]
}

