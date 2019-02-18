import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { HttpClientModule} from '@angular/common/http';
import { MainFormComponent } from './components/main-form/main-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
    MainFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
