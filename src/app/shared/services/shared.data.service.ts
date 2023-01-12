import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
  of,
  Subject,
  delay,
  take,
  switchMap,
  shareReplay,
  switchMapTo,
  BehaviorSubject,
  timer,
  takeUntil,
  tap,
} from 'rxjs';
import { RandomItem, RsSearchResult } from 'src/app/shared/models/sample.model';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService implements OnDestroy {
  TIMER_REFRESH = 1 * 60 * 60 * 1000;

  private onDestroy$: Subject<boolean> = new Subject();

  private _itemData$ = new BehaviorSubject<void>(undefined);
  private timer$ = timer(this.TIMER_REFRESH, this.TIMER_REFRESH).pipe(takeUntil(this.onDestroy$));

  public defaultRandomItemSearchRs: RsSearchResult<RandomItem> = {
    resultList: [
      {
        id: -1,
        name: '',
        desc: '',
        text: '',
        price: -1,
        imageUrl: '',
        quantity: -1,
      },
    ],
  };

  constructor(private httpClient: HttpClient) {
    this.timer$.subscribe((x) => this.updateData());
  }

  public dataSource$ = this.getRandomItems(50).pipe(take(1));

  public itemReplay$ = this._itemData$.pipe(
    switchMap((resp) => this.dataSource$),
    // switchMapTo(this.dataSource$),
    shareReplay(1)
  );

  public updateData() {
    this._itemData$.next(undefined);
  }

  getRandomItems(numOfItems?: number, delayInMs?: number): Observable<RandomItem[]> {
    const items: RandomItem[] = this.makeMockRandomItems(numOfItems);
    if (!delayInMs) {
      return of(items);
    }
    return of(items).pipe(delay(delayInMs));
  }

  searchRandomItems(searchText: string): Observable<RsSearchResult<RandomItem>> {
    if (!searchText || searchText === '' || searchText.length < 1) {
      return of(this.defaultRandomItemSearchRs);
    }

    // if 30000, then browser freezing when rendering search result items because too many
    const items: RandomItem[] = this.makeMockRandomItems(300).filter((item) =>
      item.name.includes(searchText)
    );
    const result: RsSearchResult<RandomItem> = { resultList: items };
    return of(result).pipe(
      tap((resp) => console.log('searchText: ', searchText, 'returning: ', resp.resultList.length)),
      delay(2000)
    );
  }

  makeMockRandomItems(numOfItems?: number): RandomItem[] {
    if (!numOfItems) {
      numOfItems = 20;
    }
    const items: RandomItem[] = [];
    for (let i = 0; i < numOfItems; i++) {
      items.push({
        id: i,
        name: 'randomItem name ' + i,
        desc: 'randomItem desc ' + i,
        text: 'randomItem text ' + i,
        price: i,
        imageUrl: 'randomItem imageUrl ' + i,
        quantity: i,
      });
    }
    return items;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
