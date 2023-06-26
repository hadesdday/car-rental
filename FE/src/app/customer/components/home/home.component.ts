import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    "responseType": 'text',
  };
  constructor(private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    console.log("home init");
  }
  ngDestroy() {
    console.log("home des");
  }

  getString(value: any) {
    return String(value);
  }
}
