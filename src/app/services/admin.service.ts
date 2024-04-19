import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', data, httpOptions);
  }

  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/register', data, httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + '/all-users', httpOptions);
  }

  getUser(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/get-user/' + id, httpOptions);
  }

  getGenderData(): Observable<any> {
    return this.http.get(this.apiUrl + '/gender-data', httpOptions);
  }

  getAgeGroupData(): Observable<any> {
    return this.http.get(this.apiUrl + '/age-distribution', httpOptions);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.post(this.apiUrl + '/delete/' + id, httpOptions);
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/update-user/' + id, data, httpOptions);
  }

}
