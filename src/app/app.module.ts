import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { HeroUnitComponent } from './components/hero-unit/hero-unit.component';
import { Test1Component } from './routes/test1/test1.component';
import { Test2Component } from './routes/test2/test2.component';

import { AppRouterModule } from './app-router.module';
import { MediaObjectComponent } from './components/media-object/media-object.component';
import { ContentEditableFormDirective } from './directives/contenteditable.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroUnitComponent,
    MediaObjectComponent,
    Test1Component,
    Test2Component,
    ContentEditableFormDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HeroUnitComponent, MediaObjectComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const elements: any[] = [
      [HeroUnitComponent, HeroUnitComponent.is ],
      [MediaObjectComponent, MediaObjectComponent.is]
    ];

    for (const [component, name] of elements) {
      const el = createCustomElement(component, { injector: this.injector });
      customElements.define(name, el);
    }
  }

  ngDoBootstrap() {
  }
}
