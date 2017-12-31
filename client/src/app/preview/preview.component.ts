import { Component, OnInit } from '@angular/core';
import { PitpassService } from 'app/pitpass/pitpass.service';
import { Pitpass } from 'app/pitpass/pitpass';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  public get pitpass(): Pitpass { return this.pitpassService.current; }
  public inputs: any;

  constructor(private pitpassService: PitpassService) {
    this.inputs = {
      pitpass: this.pitpass
    };
  }

  ngOnInit() {
  }

}
