import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let displayedImages;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getRandomImages', () => {
    it('should set displayedImages to an array of size 5 ', () => {
      component.getRandomImages(5);
      expect(component.displayedImages.length).toEqual(5);
    });
  })

  describe('getImages', () => {
    it('should set imagesList', () => {
      component.getImages();
      expect(component.imagesList.length).toBeDefined();
    });
  })
});


