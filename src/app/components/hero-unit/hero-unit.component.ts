import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'epicuro-hero-unit',
  templateUrl: './hero-unit.component.html',
  styleUrls: ['./hero-unit.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class HeroUnitComponent implements OnInit {
  @Input()
  id: any = Date.now();

  @Input()
  public title: string = "Hello, world!";


  @Input()
  public body: string = "This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.";

  @Input()
  public buttonText: string = "Learn more"

  @Input()
  public edit: boolean = false;

  @Output()
  public change: EventEmitter<any> = new EventEmitter();

  public static get preview(): string {
    return '../../../assets/hero-unit.png';
  }

  public static get is() {
    return 'epicuro-hero-unit';
  }

  public static get dropData(): any {
    return {
      attributes: [{
        key: 'id',
        value: Date.now(),
      }],
      tagName: 'epicuro-hero-unit',
      type: 'component'
    };
  }

  public get attributes(): any {
    return [{
      key: 'id',
      value: this.id,
    }, {
      key: 'title',
      value: this.title,
    }, {
      key: 'body',
      value: this.body,
    }, {
      key: 'buttonText',
      value: this.buttonText,
    }];
  }

  public onChange(key: string, value: string) {
    const attributes = this.attributes;

    attributes.forEach(element => {
      if (element.key === key) {
        element.value = value;
      }
    });

    this.change.emit({
      tagName: 'epicuro-hero-unit',
      type: 'component',
      attributes,
    });
  }

  public ngOnInit() {
    console.log(this.title);
    console.log(this.body);
  }
}