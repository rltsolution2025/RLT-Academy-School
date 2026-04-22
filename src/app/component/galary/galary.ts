import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as AOS from 'aos';

type FilterType = 'all' | 'photo' | 'video' | 'event' | 'sports' | 'national';

interface GalleryItem {
  type: 'photo' | 'video';
  category: 'event' | 'sports' | 'national';
  image: string;
  title: string;
  video?: string;
}

@Component({
  selector: 'app-galary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galary.html',
  styleUrls: ['./galary.css']
})
export class Galary implements AfterViewInit {

  activeFilter: FilterType = 'all';
  lightboxOpen = false;
  selectedItem: any = null;

  constructor(private sanitizer: DomSanitizer) { }

  ngAfterViewInit(): void {
    AOS.init({ duration: 800, once: true });
  }

  filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'photo', label: 'Photos' },
    { key: 'video', label: 'Videos' },
    { key: 'event', label: 'Events' },
    { key: 'sports', label: 'Sports' },
    { key: 'national', label: 'National' }
  ]
  items: GalleryItem[] = [
    {
      type: 'photo',
      category: 'event',
      image: '/Facilities/Smart Class Room.jpeg',
      title: 'Annual Day Moments'
    },
    {
      type: 'video',
      category: 'sports',
      image: '/Facilities/Smart Class Room.jpeg',
      video: 'https://www.youtube.com/embed/tgbNymZ7vqY',
      title: 'Sports Highlights'
    },
    {
      type: 'photo',
      category: 'national',
      image: '/Facilities/Smart Class Room.jpeg',
      title: 'Republic Day Parade'
    },
    {
      type: 'photo',
      category: 'national',
      image: '/Facilities/Smart Class Room.jpeg',
      title: 'Independence Celebration'
    },
    {
      type: 'photo',
      category: 'sports',
      image: '/Facilities/Smart Class Room.jpeg',
      title: 'Track & Field'
    },
    {
      type: 'photo',
      category: 'event',
      image: '/Facilities/Smart Class Room.jpeg',
      title: 'Cultural Fest'
    }
  ];

  get filteredItems() {
    if (this.activeFilter === 'all') return this.items;

    return this.items.filter(item =>
      item.type === this.activeFilter ||
      item.category === this.activeFilter
    );
  }

  setFilter(filter: FilterType) {
    this.activeFilter = filter;
  }

  openLightbox(item: GalleryItem) {
    if (item.type === 'video' && item.video) {
      this.selectedItem = {
        ...item,
        safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(item.video + '?autoplay=1')
      };
    } else {
      this.selectedItem = item;
    }

    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
    this.selectedItem = null;
  }
}