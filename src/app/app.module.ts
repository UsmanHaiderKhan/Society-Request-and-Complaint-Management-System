import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
// import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RequestComponent } from './components/home/request/request.component';
import { ComplainComponent } from './components/home/complain/complain.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReciveRequestComponent } from './components/admin/recive-request/recive-request.component';
import { ReciveComplainComponent } from './components/admin/recive-complain/recive-complain.component';
import { OperationService } from './components/shared/services/operation.service';
import { ComplainService } from './components/shared/services/complain.service';
import { from } from 'rxjs';
import { ModalComponent } from './components/admin/modal/modal.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';

// Database Connectino Method
var firebaseConfig = {
  apiKey: 'AIzaSyDs8XCIrJ1Emqg9V5Kk9ViYpdBqbrc7AcQ',
  authDomain: 'complaintmanagementsyste-e927a.firebaseapp.com',
  databaseURL: 'https://complaintmanagementsyste-e927a.firebaseio.com',
  projectId: 'complaintmanagementsyste-e927a',
  storageBucket: 'complaintmanagementsyste-e927a.appspot.com',
  messagingSenderId: '1017477332778',
  appId: '1:1017477332778:web:5cd7e9084dcda89d4fa853',
  measurementId: 'G-86FFLGM5RC',
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RequestComponent,
    ComplainComponent,
    AdminComponent,
    ReciveRequestComponent,
    ReciveComplainComponent,
    ModalComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [OperationService, ComplainService],
  bootstrap: [AppComponent],
})
export class AppModule {}
