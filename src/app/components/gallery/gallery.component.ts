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
  stateSection: "1 1 5",
  imagesSection: "1 1 100",
  refreshSection: "1 1 25"
}

const VERTICAL_PROPORTIONS = {
  stateSection: "1 1 5",
  imagesSection: "1 1 100",
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
  public imagesList: IImage[];

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

  public async getImages(): Promise<void> {
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
    this.viewProportion = state === ViewState.HORIZONTAL ? HORIZONTAL_PROPORTIONS : VERTICAL_PROPORTIONS;
  }

  public getRandomImages(numberOfRandom: number): void {
    const length = this.imagesList.length;

    while (numberOfRandom--) {
      //get a random index from the original array
      const num = Math.floor(Math.random() * length);

      const image = this.imagesList[num];
      if (!this.displayedImages.some(x => x.url === image.url)) {
        this.displayedImages.push(image);
      }
      else {
        numberOfRandom++;
      }

    }
  }

  get ViewState() {
    return ViewState;
  }

}
