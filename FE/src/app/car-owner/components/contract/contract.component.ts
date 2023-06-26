import { Component } from '@angular/core';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent {
  resource = 'http://localhost:4200/';
  download(path: string) {
    var redirectWindow = window.open(this.resource + path, '_blank');
    redirectWindow?.location;
  }
}
