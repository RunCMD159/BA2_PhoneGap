import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PerformanceService {

  constructor(private http: HttpClient) {
  }


  public runWarmUpPhase(): Observable<any> {
    const data = ['WARM UP'];
    return Observable.create((observer) => {
      observer.next(data);
    });
    // return this.http.get("")
  }

  public runPerformanceTest(): Observable<any> {
    const data = [];
    for (let i = 0; i < 10000; i++) {
      data.push('TestString' + i);
    }
    return Observable.create((observer) => {
      observer.next(data);
    });
    // return this.http.get("")
  }
}
