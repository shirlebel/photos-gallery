import { Component, OnInit } from '@angular/core';
import { IImage } from 'src/app/interfaces/image';
import { GalleryService } from 'src/app/services/gallery/gallery.service';

enum ViewState {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical"
}

interface viewProportions {
  stateSection: string;
  imagesSection: string;
  refreshSection: string;
}

const HORIZONTAL_PROPORTIONS = {
  stateSection: "1 1 20",
  imagesSection: "1 1 50",
  refreshSection: "1 1 30"
}

const VERTICAL_PROPORTIONS = {
  stateSection: "1 1 5",
  imagesSection: "1 1 80",
  refreshSection: "1 1 15"
}

const NUMBER_OF_RANDOM = 5;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public galleryViewState: ViewState;
  public displayedImages: IImage[] = [];
  public viewProportion: viewProportions;

  private imagesList: IImage[];

  constructor(private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    this.initViewSettings();
    this.getImages();
  }

  private initViewSettings(): void {
    this.galleryViewState = ViewState.HORIZONTAL;
    this.viewProportion = HORIZONTAL_PROPORTIONS;
  }

  private async getImages(): Promise<void> {
    try {
      this.imagesList = await this.galleryService.getImages().toPromise();

      //get initial images
      this.getRandomImages(NUMBER_OF_RANDOM);

    } catch (error) {
      alert("There was a problem with loading images")
      this.imagesList = [];
      throw (error);
    }
  }

  // refresh and display NUMBER_OF_RANDOM random imasges
  public refresh(): void {
    this.getRandomImages(NUMBER_OF_RANDOM);
  }

  public changeViewState(state: ViewState) {
    this.galleryViewState = state;

    //update view proportions
    this.viewProportion = state === ViewState.HORIZONTAL? HORIZONTAL_PROPORTIONS : VERTICAL_PROPORTIONS;
  }

  private getRandomImages(numberOfRandom: number): void {
    let result = new Array(numberOfRandom);
    let length = this.imagesList.length;

    //uses to check if we took a specific item already
    let taken = new Array(length);

    while (numberOfRandom--) {
      //get a random index from the original array
      let num = Math.floor(Math.random() * length);

      result[numberOfRandom] = this.imagesList[num in taken ? taken[num] : num];
      taken[num] = --length in taken ? taken[length] : length;
    }

    this.displayedImages = result;
  }

  get ViewState() {
    return ViewState;
  }

}
