import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowDetailsService } from '../shared/show-details.service';

@Component({
  selector: 'app-show-seasons',
  templateUrl: './show-seasons.component.html',
  styleUrls: ['./show-seasons.component.css']
})
export class ShowSeasonsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private showDetailsService: ShowDetailsService) { }
  selectedShowId: number;
  loader = true;
  seasonsDetails: any = [];

  ngOnInit(): void {
    this.loader = true;
    this.selectedShowId = this.route.snapshot.params.id;
    this.loadSeasons();
  }

  loadSeasons(): void {
    this.showDetailsService.getSpecificSeasonsInfo(this.selectedShowId).subscribe(seasonsData => {
      this.seasonsDetails = seasonsData;
      this.loader = false;
    });
  }
}
