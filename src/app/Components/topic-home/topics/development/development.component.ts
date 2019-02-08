import {Component, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {DevelopmentChatService} from '../../../../Services/development-chat.service';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit , OnDestroy {

  topicPhotoPath:string = 'assets/software.png';
  topicTitle:string = 'Development Team';
  userName:string;

  constructor( private  developmentChatService:DevelopmentChatService) { }


  ngOnInit() {

      $('.chat-body').html(''); // reset screen
      this.developmentChatService.connect();
       const  cardinality  = JSON.parse(localStorage.getItem('userAuth'));
       this.userName = cardinality.name;
  }

  sendMessage()
  {
    const cardinality = JSON.parse(localStorage.getItem('userAuth'));
    const sender = cardinality.name; // sender name
    const msgContent = $('#message').val();
    const msgType = "chat";

    this.developmentChatService.sendMessageToServer(sender , msgContent , msgType);
  }

  ngOnDestroy(){

    this.developmentChatService.disconnect();
  }

}
