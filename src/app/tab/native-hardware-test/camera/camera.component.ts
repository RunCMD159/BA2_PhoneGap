import {Component} from '@angular/core';
import {CameraService} from 'angular-cordova/plugin/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {

  snap: any;

  public constructor(private cameraService: CameraService) {
  }


  public capture() {
    this.cameraService.getPicture().subscribe((image) => {
      this.snap = image;
    });
  }

}
