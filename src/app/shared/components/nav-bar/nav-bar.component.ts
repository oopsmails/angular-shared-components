import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject, takeUntil, tap } from 'rxjs';
import { NavBarModel } from '../../models/shared.model';
import { SharedDataService } from '../../services/shared.data.service';

@Component({
  selector: 'nav-bar-example',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navbar') navbarElementRef: ElementRef;
  @ViewChild('menubar') menubarElementRef: ElementRef;

  private onDestroy$: Subject<boolean> = new Subject();

  navBarConfig$: Observable<NavBarModel[]>;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.navBarConfig$ = this.sharedDataService.getNavBarConfig();
    // this.sharedDataService
    //   .getNavBarConfig()
    //   .pipe(tap((res) => console.log(res)))
    //   .subscribe((res) => (this.navBarConfig = res));
  }

  ngAfterViewInit(): void {
    // this.navbarClick = fromEvent(this.navbarElementRef.nativeElement, 'click').subscribe(
    fromEvent(this.navbarElementRef.nativeElement, 'click')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((x) => {
        // console.log("NavbarFixedComponent, ngAfterViewInit ... ", x);
        this.menubarElementRef.nativeElement?.click();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
