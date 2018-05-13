import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {PerformanceService} from './performance.service';

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
    for (let i = 0; i < 10000; i++) {
      this.performanceData.push('TestString' + Math.floor((Math.random() * 10000) + 1));
    }
    alert(this.performanceData.length + ' Testdaten erstellt');
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

  runPerformanceTest() {
    this.runWarmUpPhase();
    console.log('WarmUp Phase 1 has ended');
    this.runWarmUpPhase();
    console.log('WarmUp Phase 2 has ended');

    this.performanceData = [];
    this.isPerformanceTestRunning = true;
    this.performanceService.runPerformanceTest().subscribe((perfData) => {
      console.log('Performance Test Started');
      this.startTime = new Date().getTime();
      this.performanceData = perfData;
    });
  }

  runWarmUpPhase() {
    this.performanceService.runWarmUpPhase().subscribe((warmUpData) => {
      console.log('WarmUp Phase Started');
      this.performanceData = warmUpData;
    });
  }


}
