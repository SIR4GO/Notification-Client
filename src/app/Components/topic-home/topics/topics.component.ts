import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import {ChatService} from '../../../Services/chat.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

   topicType:string;
   topicPhotoPath:string;
   topicTitle:string;


  constructor(private route: ActivatedRoute , private router: Router ,private chatService:ChatService) { }


  ngOnInit() {
    const thisO = this;
    this.route.params.subscribe(params => {
       this.topicType = params['type'];
       this.changeComponentParametersDependOnTopicType(this.topicType);
       this.chatService.connect(this.topicType);
    });
  }

  changeComponentParametersDependOnTopicType(type:string)
  {
    if(type === 'development'){

        this.topicPhotoPath = 'assets/software.png';
        this.topicTitle = 'Development Team';
        $('.chat-body').html(''); // reset screen
    }
    else if (type === 'pi') {

        this.topicPhotoPath = 'assets/bi.png';
        this.topicTitle = 'Pi Team';
        $('.chat-body').html(''); // reset screen
    }

    //this.router.navigate(['/topic']);
  }


  sendMessage()
  {
    this.chatService.sendMessageToServer($('#message').val() , this.topicType);
  }


}
