import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { SpacexService } from 'src/app/services/spacex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  tableColumns: string[] = ['']
  launches: any[];
  allLaunches: any[];
  searchControl: FormControl;

  constructor(private spacexService: SpacexService, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadRockets();
    this.searchControl = new FormControl('');
    this.searchControl.valueChanges.pipe(
      map((value) => { return value }),
      //filter((value: string) => value.length > ),
      debounceTime(500)
    ).subscribe((missionName: string) => {
      console.log(missionName)
      if (missionName.length > 0) {
        this.launches = this.allLaunches.filter(l => 
          l.mission_name.toLocaleLowerCase().indexOf(missionName.toLocaleLowerCase()) !== -1
        );
      }
      else {
        this.launches = this.allLaunches;
      }
      console.log(this.launches);
      this.cd.markForCheck();
    });
  }

  private loadRockets(): void {
    this.spacexService.getLaunches()
    .subscribe(launches => {
      this.allLaunches = launches;
      this.launches = this.allLaunches;
    })
  }

  viewDetails(launchId: any) {
    console.log(launchId);
    
    this.router.navigate(['/launch-details/' + launchId]);
  }

  isFav(flight_number: any): boolean {
    return this.spacexService.isFav(flight_number);
  }

  fav(flight_number: any): void {
    this.spacexService.onFav(flight_number);
  }

}

