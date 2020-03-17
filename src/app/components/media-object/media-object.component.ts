import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'epicuro-media-object',
  templateUrl: './media-object.component.html',
  styleUrls: ['./media-object.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MediaObjectComponent {
  @Input()
  public title: string = "Media heading";
  @Input()
  public body: string = "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.";
  @Input()
  public image: string = "https://via.placeholder.com/64"

  @Input()
  public edit: boolean = false;

  public static get preview(): string {
    return '../../../assets/media-object.png';
  }

  public static get is() {
    return 'epicuro-media-object';
  }

  public static get dropData(): any {
    return {
      tagName: 'epicuro-media-object',
      type: 'component',
    }
  }
}