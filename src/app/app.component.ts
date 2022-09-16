import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'server-page';
  htmlData = ``
  cssData = ``

  constructor(public res: Renderer2,
      @Inject(DOCUMENT) private document: Document,
      private elementRef: ElementRef,
      private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getPage().subscribe((res: any)=>{
      const child = this.document.createElement('style');
      this.htmlData = res.htmlData;
      child.innerHTML= res.cssData;
      this.res.appendChild(this.elementRef.nativeElement, child);
    })
  }
}
