import {Component, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {BiChatService} from '../../../../Services/bi-chat.service';

@Component({
  selector: 'app-bi',
  templateUrl: './bi.component.html',
  styleUrls: ['./bi.component.css']
})
export class BiComponent implements OnInit ,OnDestroy {

  topicPhotoPath:string = 'assets/bi.png';
  topicTitle:string = 'Pi Team' ;
  userName: string;

  constructor(private biChatService:BiChatService) { }


  ngOnInit() {

      this.biChatService.connect();
      $('.chat-body').html(''); // reset screen

     const  cardinality  = JSON.parse(localStorage.getItem('userAuth'));

     this.userName = cardinality.name;
  }


  sendMessage()
  {
      const cardinality = JSON.parse(localStorage.getItem('userAuth'));
      const sender = cardinality.name; // sender name
      const msgContent = $('#message').val();
      const msgType = "chat";

      this.biChatService.sendMessageToServer(sender , msgContent , msgType);
  }

  ngOnDestroy(): void {
     this.biChatService.disconnect();
  }

}
