import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-topic-home',
  templateUrl: './topic-home.component.html',
  styleUrls: ['./topic-home.component.css']
})
export class TopicHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // header style
    const height = $(window).height();
    $('.row').height(height);

  }

}
