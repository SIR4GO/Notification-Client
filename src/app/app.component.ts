import {Component, OnInit} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  disabled = true;
  name: string;
  messages:string [] = [];
  private stompClient = null;

  ngOnInit(): void {

    console.log();
  }

  constructor() { }

  setConnected(connected: boolean) {
    this.disabled = !connected;

  }

  connect() {

    const socket = new SockJS('http://localhost:8080/pair');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic1/public1', function (message) {

        const container = document.getElementById('messages');
        container.innerHTML += '<p> '+ JSON.parse(message.body).sender + ' : ' + JSON.parse(message.body).content + '</p>';

      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    this.stompClient.send(
      '/app/chat1',
      {},
      // sender: username,
      // content: messageInput.value,
      // type: 'CHAT'
      JSON.stringify({ sender:'any'  , content:this.name , to:'any'})
    );
  }




}
