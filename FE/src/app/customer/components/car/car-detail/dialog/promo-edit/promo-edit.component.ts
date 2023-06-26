import { log } from 'console';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PromoDTO } from 'src/app/models/model';
import { PromoService } from 'src/app/services/promo.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-promo-edit',
  templateUrl: './promo-edit.component.html',
  styleUrls: ['./promo-edit.component.scss']
})
export class PromoEditComponent implements OnInit{
  title: string = 'Sử dụng mã khuyến mãi'
  promos$!: Observable<PromoDTO[]>
  constructor(private _promoService: PromoService, public dialogRef: MatDialogRef<PromoEditComponent>){

  }
  ngOnInit(): void {
    this.promos$ = this._promoService.findAllAvailable().pipe(
      map(response => {
        console.log(response);
        
        return response.data
      })
    )
  }
  selectPromo(promoId: number){
    this.dialogRef.close({data: {
      promoId
    }});
  }
}
