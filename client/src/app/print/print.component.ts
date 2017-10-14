import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as rasterizeHTML from 'rasterizehtml/dist/rasterizeHTML';

// Bring in html2pdf manually (see angular-cli.json scripts) since there isn't an npm package or typescript typings
declare function html2pdf(html2canvas, jsPDF): any;

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  print(): void {
    const pdf = new jsPDF('p', 'pt', 'letter');
    const theme = document.getElementsByClassName('theme')[0] as HTMLElement;
    const cardBack = document.getElementsByClassName('theme-card-back')[0] as HTMLElement;

    // Adjust for printing
    document.body.setAttribute('style', 'height:1500px;width:1500px;');
    cardBack.setAttribute('style', 'float:right;');

    // Send to printer
    html2pdf(theme, {
      margin: 1,
      filename: 'pitpass.pdf',
      image: { type: 'png', quality: 1 },
      html2canvas: { dpi: 300, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });

    // Reset after printing
    document.body.removeAttribute('style');
    cardBack.removeAttribute('style');
  }
}
