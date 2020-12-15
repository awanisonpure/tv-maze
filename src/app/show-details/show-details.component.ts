import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowDetailsService } from '../shared/show-details.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private showDetailsService: ShowDetailsService) { }
  selectedShowId: number;
  showDetails: any;
  loader = true;
  castDetails: any;
  seasonsDetails: any;

  ngOnInit(): void {
    this.loader = true;
    this.selectedShowId = this.route.snapshot.params.id;
    this.loadShowsData();
  }

  // loads shows info based on show id
  loadShowsData(): void {
    this.showDetailsService.getSpecificShowsInfo(this.selectedShowId).subscribe(data => {
      this.showDetails = data;
      this.castDetails = this.showDetails._embedded.cast;
      this.removeSemanticTagsFromSummary();
      this.loader = false;
    });
  }

  // remove HTML Tags from summary information
  removeSemanticTagsFromSummary(): void {
    if (this.showDetails.summary !== null && this.showDetails.summary !== undefined) {
      this.showDetails.summary = this.showDetails.summary.replace(/(<([^>]+)>)/g, '');
    } else {
      this.showDetails.summary = 'Summary Is unavailable.';
    }
  }
}
