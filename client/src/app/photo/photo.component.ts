import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent implements OnInit {
  private trans1x1: string; 
  preview: any;
  isProcessing: boolean;

  @Output() onPhotoProcessing = new EventEmitter<void>();
  @Output() onPhotoProcessed = new EventEmitter<void>();


  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.trans1x1 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; 
    this.preview = this.trans1x1;
    this.isProcessing = false;
  }

  fileChange(input) {
    this.isProcessing = true;
    this.onPhotoProcessing.emit();

    this
      .readFiles(input.files)
      .then((dataUrl) => { this.resizeFile(dataUrl); })
      .catch(() => { 
        this.preview = this.trans1x1; 
        console.log('Something went wrong'); 
      })
      .then(() => { 
        this.isProcessing = false; 
        this.onPhotoProcessed.emit(); 
      });
  }

  private readFiles(files) {
    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      // Make sure there is a file
      if(!files || !files[0]) {
        reject('No file to read.');
        return;
      }

      // Add the reader event handler
      reader.onload = () => {
        resolve(reader.result);
      }

      // Read the file
      reader.readAsDataURL(files[0]);  

    });
    
  }

  private resizeFile(dataUrl) {
    setTimeout(() => {
    this.preview = dataUrl;
    this.changeDetectorRef.detectChanges();
    }, 2000);
  }

}
