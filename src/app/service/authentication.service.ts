import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username+":"+password)});
    this.http.get(`http://localhost:8080/`, {headers, responseType: 'text' as 'json'})
  }


  authenticate(username: string, password: string) {
    if (username === "javainuse" && password === "password") {
      sessionStorage.setItem('username', username)
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
