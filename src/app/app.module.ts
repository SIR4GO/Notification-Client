import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {routes} from './Routes/Routs';
import { AppComponent } from './app.component';
import { TopicHomeComponent } from './Components/topic-home/topic-home.component';
import {RouterModule} from '@angular/router';
import { TopicsComponent } from './Components/topic-home/topics/topics.component';
import { DevelopmentComponent } from './Components/topic-home/topics/development/development.component';
import { BiComponent } from './Components/topic-home/topics/bi/bi.component';
import { LoginComponent } from './Components/login/login.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TopicHomeComponent,
    TopicsComponent,
    DevelopmentComponent,
    BiComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
