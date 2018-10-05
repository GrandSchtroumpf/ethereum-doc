import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HighlightModule } from 'ngx-highlightjs';
import { MaterialModule } from './material.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from './../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { ContractNamePipe } from './pipes/contract-name.pipe';
import { ListComponent } from './components/list/list.component';
import { ViewComponent } from './components/view/view.component';
import { MethodComponent } from './components/method/method.component';
import { AuthComponent } from './components/auth/auth.component';
import { AddressesComponent } from './components/addresses/addresses.component';


@NgModule({
  declarations: [
    AppComponent,
    ContractNamePipe,
    ListComponent,
    ViewComponent,
    MethodComponent,
    AuthComponent,
    AddressesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HighlightModule.forRoot({ theme: 'vs2015' }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent },
      { path: ':name', component: ViewComponent }
    ]),
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddressesComponent]
})
export class AppModule { }
