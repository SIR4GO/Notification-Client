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


  constructor( private  developmentChatService:DevelopmentChatService) { }


  ngOnInit() {

      $('.chat-body').html(''); // reset screen
      this.developmentChatService.connect();
  }

  sendMessage()
  {
    this.developmentChatService.sendMessageToServer($('#message').val() );
  }

  ngOnDestroy(){

    this.developmentChatService.disconnect();
  }

}
