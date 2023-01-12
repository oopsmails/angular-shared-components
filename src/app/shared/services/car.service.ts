import { Injectable } from '@angular/core';
import { take, Observable, of, delay, OperatorFunction } from 'rxjs';
import { Car, CarGroup, RandomItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CarDataService {
  private indexSeed = 4; // at least length of following
  private brand: string[] = ['Toyota', 'Chevy', 'GM', 'Buick', 'Honda'];
  private model: string[] = [
    'model1',
    'model2',
    'model3',
    'model4',
    'model5',
    'model6',
    'model7',
    'model8',
  ];
  private years: string[] = ['2018', '2019', '2020', '2021', '2022', '2023'];

  public dataSource$ = this.getCarItems(50).pipe(take(1));

  getCarItems(numOfItems?: number, delayInMs?: number): Observable<Car[]> {
    const items: Car[] = this.makeMockItems(numOfItems);
    if (!delayInMs) {
      return of(items);
    }
    return of(items).pipe(delay(delayInMs));
  }

  getSortedCarItems(items: Car[], compareFn?: (a: Car, b: Car) => number): Car[] {
    if (!compareFn) {
      compareFn = (a: Car, b: Car) => {
        return a.brand > b.brand ? 1 : b.brand > a.brand ? -1 : 0;
      };
    }
    return compareFn ? items.sort(compareFn) : items;
  }

  makeMockItems(numOfItems?: number): Car[] {
    if (!numOfItems) {
      numOfItems = 20;
    }
    const items: Car[] = [];
    for (let i = 0; i < numOfItems; i++) {
      const brand = this.brand[i % this.brand.length];
      const model = this.model[i % this.model.length];
      const year = this.years[i % this.years.length];
      items.push({
        id: i,
        brand: brand,
        model: model,
        year: year,
      });
    }
    return items;
  }

  getCarGroupsByBrand(cars: Car[], sort?: boolean): CarGroup[] {
    const result: CarGroup[] = [];

    for (const { brand, model, year } of cars) {
      let resultItem = result[brand];
      if (!resultItem) {
        resultItem = { brand: brand, items: [] };
      }
      resultItem.items.push({ brand, model, year });
    }

    return sort
      ? result.sort((a, b) => (a.brand > b.brand ? 1 : b.brand > a.brand ? -1 : 0))
      : result;
  }

  getCarItemsGroupByBrand(cars: Car[]): Car[] {
    const carGroups: CarGroup[] = this.getCarGroupsByBrand(cars, true);
    const result: Car[] = [];

    carGroups.map((groupItem: CarGroup) => {
      const carItems = groupItem.items;
      result.concat(carItems);
    });

    return result;
  }

  // sortCarFn: OperatorFunction<string, Car[]> = (fieldName: Observable<string>) =>

  // sortCars(cars: Car[], sortFn:) {

  // }
}
