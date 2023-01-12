import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Card } from '../models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService implements OnDestroy {
  public cards = [
    new Card('What did the cheese say when it looked in the mirror?', 'Hello-me (Halloumi)'),
    new Card(
      'What kind of cheese do you use to disguise a small horse?',
      'Mask-a-pony (Mascarpone)'
    ),
    new Card('A kid threw a lump of cheddar at me', "I thought 'That's not very mature"),
  ];

  private onDestroy$: Subject<boolean> = new Subject();

  constructor() {}

  getCards(): Observable<Card[]> {
    return of(this.cards);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
