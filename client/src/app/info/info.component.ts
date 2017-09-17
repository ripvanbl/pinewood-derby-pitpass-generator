import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { MdButtonModule, MdCardModule, MdInputModule, MdSelectModule } from '@angular/material';

import { Scout, ranks } from '../scout/scout.model';
import { ScoutService } from '../scout/scout.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [ScoutService]
})
export class InfoComponent implements OnInit {
  scout: Scout;
  scoutForm: FormGroup;
  isProcessing: boolean;
  ranks = ranks;

  constructor(
    private scoutService: ScoutService, 
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.scout = this.scoutService.fetch();
    this.createForm();
  }

  createForm() {
    this.scoutForm = this.formBuilder.group({
      firstname: [this.scout.firstname, Validators.required],
      lastname: [this.scout.lastname, Validators.required],
      rank: [this.scout.rank, Validators.required],
      carname: ''
    });
  }

  onPhotoProcessing() {
    this.isProcessing = true;
  }

  onPhotoProcessed() {
    this.isProcessing = false;
  }

}
