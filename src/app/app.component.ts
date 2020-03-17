import { Component, Input, ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { HeroUnitComponent } from './components/hero-unit/hero-unit.component';
import { MediaObjectComponent } from './components/media-object/media-object.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public components: any[] = [
    HeroUnitComponent,
    MediaObjectComponent,
  ];

  @ViewChild('editor', { static: true })
  public editor: ElementRef<HTMLElement>;

  @Input()
  public editorComponents: any[] = [
  // {
  //   tagName: "epicuro-hero-unit",
  //   type: "component"
  // }, {
  //   tagName: "epicuro-media-object",
  //   type: "component"
  // }
    // {
    //   type: 'component',
    //   tagName: 'epicuro-hero-unit',
    //   attributes: [
    //     { key: 'class', value: 'cooool' },
    //     { key: 'title', value: 'Hell YEAH!!!'},
    //     { key: 'body', value: 'Who\'s good boy'},
    //     { key: 'buttonText', value: 'Get it boy'},
    //   ]
    // }, {
    //   type: "element",
    //   tagName: "p",
    //   attributes: [],
    //   children: [
    //     {
    //       type: "element",
    //       tagName: "strong",
    //       attributes: [
    //         {
    //           "key": "class",
    //           "value": "text-primary"
    //         }
    //       ],
    //       children: [
    //         {
    //           type: "text",
    //           content: "Title"
    //         }
    //       ]
    //     },
    //     {
    //       type: "text",
    //       content: "goes here"
    //     }
    //   ]
    // }, {
    //   "type": "element",
    //   "tagName": "button",
    //   "attributes": [
    //     {
    //       "key": "type",
    //       "value": "button"
    //     },
    //     {
    //       "key": "class",
    //       "value": "btn btn-primary"
    //     }
    //   ],
    //   "children": [
    //     {
    //       "type": "text",
    //       "content": "Primary"
    //     }
    //   ]
    // }
  ];

  constructor(
    private renderer: Renderer2,
  ) {
  }

  public ngOnInit() {
    this.buildTree();
  }

  public extract() {
    console.log(this.editorComponents);
  }

  public drop(event: CdkDragDrop<Component[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    this.buildTree();
  }

  public getListData() {
    return this.components.map((component: any) => component.dropData);
  }

  private buildTree() {
    console.log(this.editorComponents);
    this.clearEditor();

    this.editorComponents.forEach((component: any) => {
      const element = this.buildElement(component);

      this.editor.nativeElement.appendChild(element);
    });
  }

  private buildElement(config: any): HTMLElement {
    let element;

    if (config.type === 'text') {
      element = this.renderer.createText(config.content);
    } else {
      element = this.renderer.createElement(config.tagName);


      // element.addEventListener('change', (value) => this.onChange(value.detail));
    }

    if (config.attributes && config.attributes.length) {
      this.addAttributes(element, config.attributes);
    }

    if (config.children && config.children.length) {
      config.children.forEach((child: any) => {
        this.renderer.appendChild(element, this.buildElement(child));
      });
    }

    return element;
  }

  private addAttributes(element: HTMLElement, attributes: {key: string, value: string}[]) {
    attributes.forEach((attribute) => {
      this.renderer.setAttribute(element, this.toDashCase(attribute.key), attribute.value);
    });
  }

  private clearEditor() {
    while(this.editor.nativeElement.firstChild) {
      this.editor.nativeElement.firstChild.remove();
    }
  }

  private toDashCase(key: string) {
    return key.split(/(?=[A-Z])/).join('-').toLowerCase()
  }

  private onChange(component) {
    const componentId = component.attributes.find((attr) => attr.key === 'id');
    const update = this.editorComponents.findIndex((item) => {
      const id = item.attributes.find((attr) => attr.key === 'id');

      return id === componentId;
    });

    if (update === -1) {
      console.log('NOPE');
      return;
    }

    this.editorComponents[update] = component;

    console.log(this.editorComponents);
  }
}
