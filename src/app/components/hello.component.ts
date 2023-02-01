import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularOopsSharedComponentsService } from 'angular-oops-shared-components';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { UsCity, UsState } from '../shared/models';
import { StateService } from '../shared/services/state.service';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
})
export class HelloComponent implements OnInit, OnDestroy {
  linkText = 'Back';
  routerLinkInput = '';
  @Input() name: string = 'Shared Component';

  toBeHighlighted = 'oops abc ops cde';
  highlightHtmlText = 'ops';

  private onDestroy$: Subject<boolean> = new Subject();

  items$: Observable<UsState[]>;
  usStates$: Observable<UsState[]>;
  usCities$: Observable<UsCity[]>;

  usStates: UsState[] = []; // Here, only for demo how to unscribe!

  constructor(
    private stateService: StateService,
    private angularOopsSharedComponentsService: AngularOopsSharedComponentsService
  ) {}

  ngOnInit(): void {
    this.angularOopsSharedComponentsService.doSomething();
    this.items$ = this.stateService.getUsStateCity();

    this.stateService
      .getUsStates()
      .pipe(
        takeUntil(this.onDestroy$),
        tap((items) =>
          console.log('HelloComponent, getUsStates result.size: ', (items && items.length) || '0')
        )
      )
      .subscribe((res) => {
        this.usStates = res;
      });

    this.usStates$ = this.stateService.getUsStateCity();
    this.usCities$ = this.stateService
      .getUsCities()
      .pipe(
        tap((items) =>
          console.log('HelloComponent, getUsCities result.size: ', (items && items.length) || '0')
        )
      );
  }
  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
