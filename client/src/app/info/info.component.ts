import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Racer, ranks } from '../racer/racer.model';
import { RacerService } from '../racer/racer.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  racer: Racer;
  racerForm: FormGroup;
  isProcessing: boolean;
  ranks = ranks;

  constructor(
    private racerService: RacerService, 
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.racer = this.racerService.fetch();
    this.createForm();
  }

  createForm() {
    this.racerForm = this.formBuilder.group({
      firstname: [this.racer.firstname, Validators.required],
      lastname: [this.racer.lastname, Validators.required],
      rank: [this.racer.rank, Validators.required],
      carname: [this.racer.carname, Validators.required]
    });
  }

  onPhotoProcessing() {
    this.isProcessing = true;
  }

  onPhotoProcessed(dataUrl) {
    this.isProcessing = false;
    this.racer.profilePhotoDataURL = dataUrl;
  }
  
  resetForm() {
    this.racer = this.racerService.reset();
    this.racerForm.reset();
  }

}
