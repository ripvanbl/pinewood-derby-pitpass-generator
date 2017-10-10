import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Racer, ranks } from '../racer/racer.model';
import { RacerService } from '../racer/racer.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Output() onRacerSaved = new EventEmitter<void>();

  public racerForm: FormGroup;
  public isProcessing: boolean;
  public ranks = ranks;

  constructor(
    private formBuilder: FormBuilder,
    private racerService: RacerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.racerForm = this.formBuilder.group({
      firstname: [this.racerService.racer.firstname, Validators.compose([Validators.required, Validators.maxLength(20)])],
      lastname: [this.racerService.racer.lastname, Validators.compose([Validators.required, Validators.maxLength(20)])],
      rank: [this.racerService.racer.rank, Validators.required],
      carname: [this.racerService.racer.carname, Validators.compose([Validators.required, Validators.maxLength(40)])]
    });
  }

  onPhotoProcessing(): void {
    this.isProcessing = true;
  }

  onPhotoProcessed(dataUrl): void {
    this.isProcessing = false;
    this.racerService.racer.profilePhotoDataURL = dataUrl;
  }

  onRankChanged(model): void {
    this.racerService.racer.setPhotoDataURLByRank(model ? model.value : null);
  }
  
  resetForm(): void {
    this.isProcessing = true;

    this.racerService
      .reset()
      .then((rcr: Racer) => {
        this.racerForm.reset();
      })
      .catch((err: Error) => {
        console.log('RESET RACER:', err);
      })
      .then(() => {
        this.isProcessing = false;
      });
  }

  saveForm(model: Racer): void {
    this.isProcessing = true;

    // Patch the racer
    Object.assign(this.racerService.racer, model);
    
    this.racerService
      .save()
      .then(() => {
        this.onRacerSaved.emit();
        this.router.navigate(['/theme']);
      })
      .catch((err: Error) => {
        console.log('SAVE RACER:', err);
      })
      .then(() => {
        this.isProcessing = false;
      });
  }
}
