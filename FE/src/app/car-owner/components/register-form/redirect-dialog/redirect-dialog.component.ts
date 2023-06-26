import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-redirect-dialog',
  templateUrl: './redirect-dialog.component.html',
  styleUrls: ['./redirect-dialog.component.scss']
})
export class RedirectDialogComponent {

  seconds = 3;

  constructor(private router: Router, private matDialogRef: MatDialogRef<RedirectDialogComponent>) { }

  ngOnInit(): void {
    const observable = interval(1000);

    const subscription = observable.subscribe(() => {
      this.seconds--;
    });

    setTimeout(() => {
      subscription.unsubscribe();
      this.router.navigate(['/car-owner/car-listing']);
      this.matDialogRef.close();
    }, 3000);

  }

}
