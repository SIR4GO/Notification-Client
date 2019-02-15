import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable , of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  secret:string = '@#!^%sa#saf%#*JHHDAD&^*asf^%&';


  constructor(private http:HttpClient , private router:Router) { }

  httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  };

  senderAuth (username , password):Observable<any>
  {

    const cardinality = {
      cipherUsername: this.generateEncryptedCardinality(username , this.secret),
      cipherPassword: this.generateEncryptedCardinality(password , this.secret)
    };

    return this.http.post('http://localhost:8080/authUser' , cardinality , this.httpOptions);

  }

  existSender (cardinality):Observable<any>
  {
    if (cardinality){
     const token = JSON.parse(cardinality).token;

      const parameters = {
        token: token
      };

      return this.http.post('http://localhost:8080/existUser' , parameters , this.httpOptions);
    }


     this.router.navigate(['/login']);
     return of(false); // return boolean observable
  }

  generateEncryptedCardinality(value , key){

    let encrypted = Crypto.AES.encrypt(value, key);
    // @ts-ignore
    encrypted = encrypted.toString();

    return encrypted;
  }


}
