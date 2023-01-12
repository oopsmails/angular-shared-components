import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, tap } from 'rxjs';
import { UsCity, UsState } from '../models';

const statesWithFlag = [
  {
    stateName: 'Alabama',
    flag_img: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png',
  },
  {
    stateName: 'Alaska',
    flag_img: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png',
  },
  {
    stateName: 'Arizona',
    flag_img: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png',
  },
  {
    stateName: 'Arkansas',
    flag_img: '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png',
  },
  {
    stateName: 'California',
    flag_img: '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png',
  },
  {
    stateName: 'Colorado',
    flag_img: '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png',
  },
  {
    stateName: 'Connecticut',
    flag_img: '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png',
  },
  {
    stateName: 'Delaware',
    flag_img: 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png',
  },
  {
    stateName: 'Florida',
    flag_img: 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png',
  },
  {
    stateName: 'Georgia',
    flag_img:
      '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png',
  },
  {
    stateName: 'Hawaii',
    flag_img: 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png',
  },
  { stateName: 'Idaho', flag_img: 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png' },
  {
    stateName: 'Illinois',
    flag_img: '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png',
  },
  {
    stateName: 'Indiana',
    flag_img: 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png',
  },
  { stateName: 'Iowa', flag_img: 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png' },
  {
    stateName: 'Kansas',
    flag_img: 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png',
  },
  {
    stateName: 'Kentucky',
    flag_img: '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png',
  },
  {
    stateName: 'Louisiana',
    flag_img: 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png',
  },
  { stateName: 'Maine', flag_img: '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png' },
  {
    stateName: 'Maryland',
    flag_img: 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png',
  },
  {
    stateName: 'Massachusetts',
    flag_img: 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png',
  },
  {
    stateName: 'Michigan',
    flag_img: 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png',
  },
  {
    stateName: 'Minnesota',
    flag_img: 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png',
  },
  {
    stateName: 'Mississippi',
    flag_img: '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png',
  },
  {
    stateName: 'Missouri',
    flag_img: '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png',
  },
  {
    stateName: 'Montana',
    flag_img: 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png',
  },
  {
    stateName: 'Nebraska',
    flag_img: '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png',
  },
  {
    stateName: 'Nevada',
    flag_img: 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png',
  },
  {
    stateName: 'New Hampshire',
    flag_img: '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png',
  },
  {
    stateName: 'New Jersey',
    flag_img: '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png',
  },
  {
    stateName: 'New Mexico',
    flag_img: 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png',
  },
  {
    stateName: 'New York',
    flag_img: '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png',
  },
  {
    stateName: 'North Carolina',
    flag_img: 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png',
  },
  {
    stateName: 'North Dakota',
    flag_img: 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png',
  },
  { stateName: 'Ohio', flag_img: '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png' },
  {
    stateName: 'Oklahoma',
    flag_img: '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png',
  },
  {
    stateName: 'Oregon',
    flag_img: 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png',
  },
  {
    stateName: 'Pennsylvania',
    flag_img: 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png',
  },
  {
    stateName: 'Rhode Island',
    flag_img: 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png',
  },
  {
    stateName: 'South Carolina',
    flag_img: '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png',
  },
  {
    stateName: 'South Dakota',
    flag_img: '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png',
  },
  {
    stateName: 'Tennessee',
    flag_img: '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png',
  },
  { stateName: 'Texas', flag_img: 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png' },
  { stateName: 'Utah', flag_img: 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png' },
  {
    stateName: 'Vermont',
    flag_img: '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png',
  },
  {
    stateName: 'Virginia',
    flag_img: '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png',
  },
  {
    stateName: 'Washington',
    flag_img: '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png',
  },
  {
    stateName: 'West Virginia',
    flag_img: '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png',
  },
  {
    stateName: 'Wisconsin',
    flag_img: '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png',
  },
  {
    stateName: 'Wyoming',
    flag_img: 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png',
  },
];
@Injectable({
  providedIn: 'root',
})
export class StateService {
  errorMessage?: string;
  statesWithFlag$: Observable<[]>;
  constructor(private httpClient: HttpClient) {
    // this.statesWithFlag$ = this.httpClient.get('assets/mockdata/stateWithFlag.json');
  }

  getUsStates(): Observable<UsState[]> {
    console.log('getStates ....');
    return of(statesWithFlag);
  }

  searchUsStates(term: string): Observable<UsState[]> {
    console.log('searchStates ....', term);
    if (term === '') {
      return of([]);
    }
    return this.getUsStates().pipe(
      map((items: UsState[]) => {
        return (
          items.filter((item: UsState) => {
            // console.log('searchState ...', term, item.name.toLowerCase().indexOf(term.toLowerCase()));
            return item.stateName.toLowerCase().indexOf(term.toLowerCase()) >= 0;
          }) || []
        );
      }),
      tap((items) => console.log('search result.size: ', (items && items.length) || '0'))
      // tap((items) => console.log('search result.size: ', items))
    );
  }

  getUsStateCity(): Observable<UsState[]> {
    return this.httpClient.get('assets/mockdata/cities.json').pipe(
      map((data) => {
        let statesData: [string, any][];
        let states: UsState[] = [];
        // console.log('Loading states and cities ..... ', data);
        if (data) {
          statesData = Object.entries(data).sort();

          let sIdx = 0;
          statesData.forEach((stateData) => {
            // console.log(`stateData[0]: `, stateData[0]);
            // console.log(`stateData[1]: `, stateData[1]);
            const state = this.makeUsState(sIdx, stateData[0]);
            sIdx++;

            let cIdx = 0;
            stateData[1].sort().forEach((cityData) => {
              const city = this.makeUsCityWithStateName(cIdx, cityData, state.stateName);
              cIdx++;
              state.cities.push(city);
            });
            states.push(state);
          });
        }
        console.log(`states: `, states);
        return states;
      })
    );
  }

  getUsStateCitySlice(indexes: number[]): Observable<UsState[]> {
    return this.getUsStateCity().pipe(
      map((items: UsState[]) => {
        const result = [];
        items.forEach((item: UsState) => {
          if (indexes.includes(item.id)) {
            result.push(item);
          }
        });
        return result;
      })
    );
  }

  getUsCities() {
    let cities: UsCity[] = [];
    let retCities: UsCity[] = [];
    return this.getUsStateCity().pipe(
      map((states) => {
        // console.log(`states: `, states);
        states.forEach((state) => {
          state.cities.forEach((cityData) => {
            // console.log(`cityData: `, cityData);
            const newCity = this.makeUsCityWithStateName(
              0,
              cityData.cityName,
              cityData.inStateName
            );
            cities.push(cityData);
          });
        });

        cities.sort((a, b) => a.cityName.localeCompare(b.cityName));
        let cIdx = 0;
        cities.forEach((city) => {
          const newCity = this.makeUsCityWithStateName(cIdx, city.cityName, city.inStateName);
          cIdx++;
          retCities.push(newCity);
        });
        console.log(`Num of cities: `, retCities.length);
        return retCities;
      })
    );
  }

  makeUsState(idx: number, stateName: string): UsState {
    const state: UsState = {} as UsState;
    state.id = idx;
    state.stateName = stateName;
    state.cities = [];

    return state;
  }

  makeUsCity(idx: number, cityName: string): UsCity {
    const city: UsCity = {} as UsCity;
    city.id = idx;
    city.cityName = cityName;

    return city;
  }

  makeUsCityWithStateName(idx: number, cityName: string, stateName: string): UsCity {
    const city: UsCity = this.makeUsCity(idx, cityName);
    city.inStateName = stateName;
    return city;
  }
}
