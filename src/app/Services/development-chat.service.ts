import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class DevelopmentChatService {

  private stompClient = null;

  constructor() { }

  connect() {

      const socket = new SockJS('http://localhost:8080/pair');
      this.stompClient = Stomp.over(socket);

      const _this = this;

      this.stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);


        _this.stompClient.subscribe('/topic1/public1', function (message) {
          //console.log(message);
          _this.sendMessageToChatBody(message);
        });

        // send join message
        const  name  = JSON.parse(localStorage.getItem('userAuth')).name + '  ';
        _this.sendMessageToServer (name , 'Join to development chat room' , 'join');
      });


  }


  sendMessageToChatBody( msg:any)
  {
    const messageCard = document.createElement('DIV');

    if (JSON.parse(msg.body).type === 'chat'){
      messageCard.className = 'message-card';
      const senderName = '<span style="color: #ffffff; font-style: italic" >'+ JSON.parse(msg.body).sender+ ' : '+ '</span> ';
      messageCard.innerHTML =  senderName + '<span>'+ JSON.parse(msg.body).content +'</span>';
    }
    else if (JSON.parse(msg.body).type === 'join'){
      messageCard.className = 'join-message-card';
      messageCard.innerText = (JSON.parse(msg.body).sender + ' ' + JSON.parse(msg.body).content);

    }

    console.log(msg);

    messageCard.id = '' + Math.floor(Math.random() * 10000000000);
    const height = document.getElementsByClassName('chat-body')[0].scrollHeight;
    console.log(height);
    if(messageCard.innerText )
      $('.chat-body').append(messageCard).animate({ scrollTop: height }, 'fast');
    $('#message').val('');  // reset

  }

  sendMessageToServer(sender:string , msgContent:string , msgType:string) {

      this.stompClient.send(
        '/app/chat1',
        {},
        // sender: username,
        // content: messageInput.value,
        // type: 'CHAT'
        JSON.stringify({ sender:sender  , content: msgContent , to:'any' , type: msgType })
      );
    }

    disconnect()
    {
      this.stompClient.disconnect();
      //this.stompClient.destroy();
      //this.disable();
    }



}
