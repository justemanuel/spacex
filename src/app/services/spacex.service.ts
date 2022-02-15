import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { spaceXApiCons } from '../constants/global.constants';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {

  constructor(private http: HttpClient) { }

  public getLaunches(): Observable<any[]> {
    return this.http.get<any[]>(spaceXApiCons.baseUrl + '/launches')
    .pipe(
      map((launches) => launches.slice(0,5)),
      take(1)
    )
  }

  public getLaunch(launchId: number): Observable<any> {
    return this.http.get(spaceXApiCons.baseUrl + `/launches/${launchId}`)
    .pipe(take(1))
  }

  public getFavs(): number[] {
    return JSON.parse(localStorage.getItem('favs') || '[]');
  }

  public onFav(launchId: number): void {
    const isFav = this.isFav(launchId);
    const favs = this.getFavs();
    if (isFav) {
      favs.forEach((value, index) => {
        if (value == launchId) favs.splice(index, 1);
      });
    } else {
      favs.push(launchId);
    }
    this.saveFavs(favs);
  }

  public isFav(launchId: number): boolean {
    const favs = this.getFavs();
    const fav = favs.find(id => id == launchId);
    return fav !== undefined;
  }

  private saveFavs(Ids: number[]): void {
    localStorage.setItem('favs', JSON.stringify(Ids));
  }
}
