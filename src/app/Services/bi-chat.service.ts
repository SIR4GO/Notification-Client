import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class BiChatService {

  private stompClient = null;

  constructor() { }

  connect() {

      const socket = new SockJS('http://localhost:8080/pi');
      this.stompClient = Stomp.over(socket);

      const _this = this;

      this.stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        _this.stompClient.subscribe('/pi/all', function (message) {
          _this.sendMessageToChatBody(message);
        });

      });

  }


  sendMessageToChatBody( msg:any)
  {
    const messageCard = document.createElement('DIV');

    console.log(msg);
    const textNode = document.createTextNode(JSON.parse(msg.body).content);
    messageCard.appendChild(textNode);
    messageCard.className = 'message-card';
    messageCard.id = '' + Math.floor(Math.random() * 10000000000);
    const height = document.getElementsByClassName('chat-body')[0].scrollHeight;
    console.log(height);
    if(messageCard.innerText )
      $('.chat-body').append(messageCard).animate({ scrollTop: height }, 'fast');


    $('#message').val('');  // reset
  }

  sendMessageToServer(msg:string ) {

      this.stompClient.send(
        '/app/business',
        {},
        // sender: username,
        // content: messageInput.value,
        // type: 'CHAT'
        JSON.stringify({ sender:'any'  , content: msg , to:'any'})
      );
    }

  disconnect()
  {
    this.stompClient.disconnect();
    //this.stompClient.destroy();
    //this.disable();
  }

}
