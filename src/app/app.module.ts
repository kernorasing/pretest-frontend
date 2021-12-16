import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuestionOneComponent } from './pages/question-one/question-one.component';
import { QuestionTwoComponent } from './pages/question-two/question-two.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionOneComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'question-one', component: QuestionOneComponent },
      { path: 'question-two', component: QuestionTwoComponent },
      { path: '', pathMatch: 'full', redirectTo: 'question-one' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
