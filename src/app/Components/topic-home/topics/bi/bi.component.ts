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


  constructor(private biChatService:BiChatService) { }


  ngOnInit() {

      this.biChatService.connect();
      $('.chat-body').html(''); // reset screen
  }


  sendMessage()
  {
      this.biChatService.sendMessageToServer($('#message').val());
  }

  ngOnDestroy(): void {
     this.biChatService.disconnect();
  }


}
