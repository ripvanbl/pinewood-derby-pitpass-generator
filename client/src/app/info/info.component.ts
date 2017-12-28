import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { find as _find } from 'lodash';

import { Racer } from 'app/racer/racer.model';
import { IRacerRank } from 'app/racer/iracer-rank';
import { PitpassService } from 'app/pitpass/pitpass.service';
import { Pitpass } from 'app/pitpass/pitpass';
import { NoRank } from 'app/racer/ranks/no-rank';
import { TigerRank } from 'app/racer/ranks/tiger';
import { WolfRank } from 'app/racer/ranks/wolf';
import { BearRank } from 'app/racer/ranks/bear';
import { WebelosRank } from 'app/racer/ranks/webelos';
import { ArrowOfLightRank } from 'app/racer/ranks/arrow-of-light';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Output() onRacerSaved = new EventEmitter<void>();

  public racerForm: FormGroup;
  public isProcessing: boolean;
  public pitpass: Pitpass;
  public ranks: Array<IRacerRank>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pitpassService: PitpassService
  ) {
    this.pitpass = this.pitpassService.current;
    this.ranks = [
      new NoRank(),
      new TigerRank(),
      new WolfRank(),
      new BearRank(),
      new WebelosRank(),
      new ArrowOfLightRank()
    ];
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.racerForm = this.formBuilder.group({
      firstname: [this.pitpass.racer.firstname, Validators.compose([Validators.required, Validators.maxLength(20)])],
      lastname: [this.pitpass.racer.lastname, Validators.compose([Validators.required, Validators.maxLength(20)])],
      rank: [this.pitpass.racer.rank],
      carname: [this.pitpass.racer.carname, Validators.compose([Validators.maxLength(40)])]
    });
  }

  onPhotoProcessing(): void {
    this.isProcessing = true;
  }

  onPhotoProcessed(dataUrl): void {
    this.isProcessing = false;
    this.pitpass.racer.profilePhotoDataURL = dataUrl;
  }

  onRankChanged(model): void {
    const rank = _find(this.ranks, {'name': model.value});
    this.pitpass.racer.profilePhotoDataURL = rank.logoDataURL;
  }

  resetForm(): void {
    this.isProcessing = true;
    this.pitpass.racer.reset();
    this.racerForm.reset();
    this.isProcessing = false;
  }

  saveForm(model: Racer): void {
    this.isProcessing = true;

    // Patch the racer
    Object.assign(this.pitpass.racer, model);
    this.onRacerSaved.emit();
    this.router.navigate(['/theme']);
    this.isProcessing = false;
  }
}
