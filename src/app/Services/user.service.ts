import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  secret:string = '@#!^%sa#saf%#*JHHDAD&^*asf^%&';


  constructor(private http:HttpClient ) { }

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


  generateEncryptedCardinality(value , key){

    let encrypted = Crypto.AES.encrypt(value, key);
    // @ts-ignore
    encrypted = encrypted.toString();

    return encrypted;
  }


}
