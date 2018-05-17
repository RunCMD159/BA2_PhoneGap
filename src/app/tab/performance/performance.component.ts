import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {PerformanceService} from './performance.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceComponent implements AfterViewChecked {


  performanceData: any = [];
  runningTime: number;

  isPerformanceTestRunning = false;
  // time in milliseconds
  private startTime: number;
  // time in milliseconds
  private endTime: number;

  constructor(private performanceService: PerformanceService,
              private changeDetector: ChangeDetectorRef) {
    this.initPerformanceData();
  }

  private initPerformanceData() {
    for (let i = 0; i < 10000; i++) {
      this.performanceData.push('TestString' + Math.floor((Math.random() * 10000) + 1));
      console.log(this.performanceData[i]);
    }
  }

  ngAfterViewChecked(): void {
    if (this.isPerformanceTestRunning) {
      this.endTime = new Date().getTime();
      console.log('Performance Test has ended');
      this.runningTime = this.endTime - this.startTime;
      console.log(this.runningTime);
      this.changeDetector.markForCheck();
      this.changeDetector.detectChanges();
    }
  }

  resetFields() {
    this.performanceData = [];
    this.isPerformanceTestRunning = false;
    this.runningTime = 0;
    this.changeDetector.markForCheck();
    this.changeDetector.detectChanges();
    this.initPerformanceData();
  }

  runPerformanceTest(data) {
    this.isPerformanceTestRunning = true;
    this.performanceService.runPerformanceTest(this.performanceData).subscribe((perfData) => {
      console.log('Performance Test Started');
      this.startTime = new Date().getTime();
      this.performanceData = perfData;
    });
  }

}
