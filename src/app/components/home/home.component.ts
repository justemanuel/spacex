import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpacexService } from 'src/app/services/spacex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tableColumns: string[] = ['']
  launches: any[];

  constructor(private spacexService: SpacexService, private router: Router) { }

  ngOnInit(): void {
    this.loadRockets();
  }

  private loadRockets(): void {
    this.spacexService.getLaunches()
    .subscribe(launches => {
      this.launches = launches;
      console.log(this.launches);
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

