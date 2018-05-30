import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WindowRefService} from '../../window-ref.service';

declare var cordova: any;


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  fileText: string;
  logOb: any;

  @ViewChild('filecontent')
  public content: ElementRef;

  constructor(private window: WindowRefService) {
  }

  ngOnInit() {
    alert(cordova.file.dataDirectory);
    const that = this;
    this.window.nativeWindow.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
      alert('got main dir' + dir);
      dir.getFile('testFile.txt', {create: true}, (file) => {
        alert('got the file' + file);
        that.logOb = file;
        that.saveFile('Test Text');
      });
    });
  }

  private saveFile(fileText: string) {
    if (!this.logOb) {
      return;
    }
    const that = this;
    this.fileText = fileText;
    this.logOb.createWriter(function (fileWriter) {

      // fileWriter.seek(fileWriter.length);
      const blob = new Blob([that.fileText], {type: 'text/plain'});
      fileWriter.write(blob);
      alert('gepeichert');
    }, () => {
      alert('Speicherfehler');
    });
  }

  loadFile(inputValue: any): void {
    const that = this;
    this.logOb.file(function (file) {
      const reader = new FileReader();

      reader.onloadend = function (e) {
        that.fileText = this.result;
        alert('READ ' + this.result);
        that.content.nativeElement.value = that.fileText;
      };

      reader.readAsText(file);
    }, () => {
      alert('LESEFEHLER');
    });
  }

  errorCallback(error) {
    alert('ERROR: ' + error.code);
  }
}

