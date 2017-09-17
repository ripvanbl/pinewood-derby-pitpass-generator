import { Component, OnInit, AfterViewInit, Output, ViewChild, ElementRef, Renderer2, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {MdCardModule, MdProgressSpinnerModule} from '@angular/material';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent implements OnInit {
  private trans1x1: string;
  private cardWidth: number;
  preview: any;
  isProcessing: boolean;

  @Output() onPhotoProcessing = new EventEmitter<void>();
  @Output() onPhotoProcessed = new EventEmitter<void>();
  @ViewChild('card') card: ElementRef;
  
  constructor(private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.trans1x1 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; 
    this.preview = this.trans1x1;
    this.isProcessing = false;
  }
  
  ngAfterViewInit() {
    this.cardWidth = this.card.nativeElement.clientWidth;
  }
  
  fileChange(input) {
    this.isProcessing = true;
    this.onPhotoProcessing.emit();

    this
      .readFiles(input.files)
      .then((dataUrl) => { this.resizePhoto(dataUrl); })
      .then(() => { 
        setTimeout(
          () => { this.changeDetectorRef.detectChanges(); },
          1000
        );
      })
      .catch((err) => { 
        this.preview = this.trans1x1; 
        console.warn('Photo: Something went wrong', err);
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
        reject('Photo: No file to read.');
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

  private resizePhoto(dataUrl) {
    let img = new Image();
    
    // Wait for the data to load before calculating
    img.onload = () => {
      let originalHeight = img.naturalHeight;
      let originalWidth = img.naturalWidth;
      let aspectRatio = originalWidth / originalHeight;
      let width = this.cardWidth;
      let height = this.cardWidth * originalHeight / originalWidth; //width * aspectRatio;
      let canvas = this.renderer.createElement('canvas');
      
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      this.preview = canvas.toDataURL("image/png");
    };
    
    // Set the source to the file
    img.src = dataUrl;
  }
}