import { Routes } from "@angular/router";
import {TopicHomeComponent} from '../Components/topic-home/topic-home.component';
import {TopicsComponent} from '../Components/topic-home/topics/topics.component';
import {DevelopmentComponent} from '../Components/topic-home/topics/development/development.component';
import {BiComponent} from '../Components/topic-home/topics/bi/bi.component';
import {LoginComponent} from '../Components/login/login.component';

export const routes: Routes = [
  {
    path: "",
    component: TopicHomeComponent,
   // canActivate: [RootActivationService],
    children: [
      { path: "topic/:type", component: TopicsComponent },
      { path: "develop", component:  DevelopmentComponent},
      { path: "bi", component:  BiComponent}
    ]
  },
  {path:"login" , component: LoginComponent}
];


