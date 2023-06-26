import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeatureRequest } from 'src/app/models/request/model';
import { FeatureService } from 'src/app/services/feature.service';

@Component({
  selector: 'app-add-car-feature',
  templateUrl: './add-car-feature.component.html',
  styleUrls: ['./add-car-feature.component.scss'],
})
export class AddCarFeatureComponent {
  featureFG!: FormGroup;
  iconFile!: File;
  constructor(
    private _fb: FormBuilder,
    private _featureService: FeatureService
  ) {
    this.featureFG = this._fb.group({
      name: ['', Validators.required],
    });
    this.featureFG.valueChanges.subscribe((v) => console.log(v));
  }
  sltIconFileInput(event: any) {
    this.iconFile = event.target.files[0];
    console.log(this.iconFile)
  }
  onSubmitFeature() {
    let formData = new FormData();
    formData.append('file', this.iconFile);
    formData.append('name', this.featureFG.get('name')?.value);
    // this._featureService.addFeature(formData).subscribe((response) => {
    //   const {data, statusCode}= response
    //   alert(statusCode)
    //   if(statusCode === 200){

    //   }else{

    //   }
    // });
  }
}
