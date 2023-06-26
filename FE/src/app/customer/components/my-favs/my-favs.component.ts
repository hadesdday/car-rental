import { log } from 'console';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { CarResponse } from 'src/app/models/response/model';
import { FavCarService } from 'src/app/services/fav-car.service';
import { UserService } from '../../services/user.service';
import { UserDTO } from 'src/app/models/model';

@Component({
  selector: 'app-my-favs',
  templateUrl: './my-favs.component.html',
  styleUrls: ['./my-favs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyFavsComponent {
  modeType: 'wd' | 'sd' = 'sd'
  favCars$!: Observable<CarResponse[]>
  wdFavCars!: CarResponse[]
  sdFavCars!: CarResponse[]
  constructor(private router: Router, private _favCarService: FavCarService, private _userService: UserService){
    let curUser: UserDTO = this._userService.userValue!
    this._favCarService.findAll(curUser.id).subscribe(favCars => {
      console.log(favCars)
      this.sdFavCars = []
      this.wdFavCars = []
      favCars.forEach(favCar => {
        const {serviceType}=favCar
        if(serviceType === 'SD'){
          this.sdFavCars.push(favCar)
        }else{
          this.wdFavCars.push(favCar)
        }
      })
      console.log( this.sdFavCars)
      console.log( this.wdFavCars)

    })
  }
  navigateCarDetail(){
    const navigationExtras: NavigationExtras = {
      state: {
        routeBy: 'bar'
      }
    }
    this.router.navigate(['car/huy/123'], navigationExtras);
  }
}
