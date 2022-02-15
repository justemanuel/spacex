import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacexService } from 'src/app/services/spacex.service';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  styleUrls: ['./launch-details.component.scss']
})
export class LaunchDetailsComponent implements OnInit {

  isFav: boolean;
  launch: any;

  constructor(private spacexService: SpacexService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const launchId = this.route.snapshot.paramMap.get('id');
    this.isFav = this.spacexService.isFav(Number(launchId));
    console.log(this.isFav);
    
    this.loadLaunchDetails(Number(launchId));
  }

  private loadLaunchDetails(launchId: number) {
    this.spacexService.getLaunch(launchId)
    .subscribe(launch => {
      this.launch = launch;
      console.log(this.launch);
    });
  }

  onFav(launchId: any) {
    this.spacexService.onFav(launchId);
    this.isFav = this.spacexService.isFav(launchId);
  }

}
