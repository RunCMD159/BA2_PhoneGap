import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabComponent} from './tab.component';
import {MatListModule, MatTabsModule} from '@angular/material';
import {HomeComponent} from './home/home.component';
import {PerformanceComponent} from './performance/performance.component';
import {NativeHardwareTestComponent} from './native-hardware-test/native-hardware-test.component';
import {HttpClientModule} from '@angular/common/http';
import {PerformanceService} from './performance/performance.service';
import {LocationComponent} from './native-hardware-test/location/location.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CameraComponent} from './native-hardware-test/camera/camera.component';
import {FileComponent} from './native-hardware-test/file/file.component';
import {WindowRefService} from './window-ref.service';
import {FormsModule} from '@angular/forms';
import {CameraService} from 'angular-cordova/plugin/camera';


@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule
  ],
  declarations: [TabComponent, HomeComponent, PerformanceComponent,
    NativeHardwareTestComponent,
    LocationComponent, CameraComponent, FileComponent],
  exports: [TabComponent],
  providers: [PerformanceService, WindowRefService, CameraService]
})
export class TabModule {
}
