import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor() {
    // Development mode check
    if (!environment.production) {
      console.log('🧹 Clearing old session...');
      localStorage.clear();
      sessionStorage.clear();
    }
  }
}





