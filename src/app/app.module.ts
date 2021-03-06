import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
// Components imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RequestComponent } from './components/home/request/request.component';
import { ComplainComponent } from './components/home/complain/complain.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReciveRequestComponent } from './components/admin/recive-request/recive-request.component';
import { ReciveComplainComponent } from './components/admin/recive-complain/recive-complain.component';
import { OperationService } from './components/shared/services/operation.service';
import { ComplainService } from './components/shared/services/complain.service';
import { NotificationService } from './components/shared/services/notification.service';
import { from } from 'rxjs';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AdminheaderComponent } from './components/admin/adminheader/adminheader.component';
import { HeaderComponent } from './components/home/header/header.component';
import { ModalComponent } from './components/admin/modal/modal.component';
import { HeroComponent } from './components/home/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    RequestComponent,
    ComplainComponent,
    AdminComponent,
    ReciveRequestComponent,
    ReciveComplainComponent,
    SidebarComponent,
    DashboardComponent,
    AdminheaderComponent,
    HeaderComponent,
    ModalComponent,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatBadgeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // forRoot(),
    BrowserAnimationsModule,
  ],
  exports: [HeaderComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [OperationService, ComplainService, NotificationService],
  bootstrap: [AppComponent],
  entryComponents: [ReciveComplainComponent],
})
export class AppModule {}
