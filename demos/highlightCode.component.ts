import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as hljs from 'highlight.js';

@Component({
  selector: 'mwl-highlight-code',
  template: '<pre><code [innerHTML]="highlightedCode"></code></pre>'
})
export class HighLightCodeComponent implements OnChanges {

  @Input() source: string;

  @Input() language: string;

  highlightedCode: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source'] && this.source) {
      this.highlightedCode = hljs.highlight(this.language, this.source).value;
    }
  }

}