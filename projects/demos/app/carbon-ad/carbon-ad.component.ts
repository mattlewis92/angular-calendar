import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'mwl-carbon-ad',
  templateUrl: './carbon-ad.component.html',
  styleUrls: ['./carbon-ad.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarbonAdComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src =
      '//cdn.carbonads.com/carbon.js?serve=CESIVK3U&placement=mattlewis92githubio';
    script.id = '_carbonads_js';
    this.elementRef.nativeElement.append(script);
  }
}
