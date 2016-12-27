import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import 'highlight.js/styles/github.css';
import * as hljs from 'highlight.js';

@Directive({
  selector: '[mwlHighlightJs]',
  host: {
    '[innerHTML]': 'highlightedCode'
  }
})
export class HighlightJsDirective implements OnChanges {

  @Input() source: string;

  @Input() language: string;

  highlightedCode: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source'] && this.source) {
      this.highlightedCode = hljs.highlight(this.language, this.source).value;
    }
  }

}