import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { PromoDetailComponent } from './dialog/promo-detail/promo-detail.component';
import { Observable, map } from 'rxjs';
import { PromoDTO } from 'src/app/models/model';
import { PromoService } from 'src/app/services/promo.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit{
  promos$!: Observable<PromoDTO[]>
  constructor(private _matDialog: MatDialog, private _promoService: PromoService){
  } 
  ngOnInit(): void {
    this.promos$ = this._promoService.findAllAvailable().pipe(
      map(response => response.data)
    )
  }

  openPromoDetailDialog(promoDetail: PromoDTO){
    this._matDialog.open(PromoDetailComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        promo: promoDetail
      }
    })
  }
  
}
