import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { HighlightModule } from 'ngx-highlightjs';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { ViewComponent } from './components/view/view.component';
import { MethodComponent } from './components/method/method.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ViewComponent,
    MethodComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HighlightModule.forRoot({ theme: 'vs2015' }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent },
      { path: ':name', component: ViewComponent }
    ], {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
