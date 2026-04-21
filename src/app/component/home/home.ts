import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

declare var AOS: any;
declare var particlesJS: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements AfterViewInit {
  email: string = '';
  successMessage = false;
  submitted = false;

  subscribe(form: any) {

    this.submitted = true;
    this.successMessage = false;

    if (!this.validateEmail(this.email)) {
      return;
    }

    // ✅ SHOW SUCCESS FIRST
    this.successMessage = true;

    // 🔥 DELAY RESET (IMPORTANT FIX)
    setTimeout(() => {
      form.resetForm();
      this.submitted = false;
    }, 500);

    // AUTO HIDE MESSAGE
    setTimeout(() => {
      this.successMessage = false;
    }, 3000);
  }

  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  onInputChange() {
    this.successMessage = false;
  }

  /* ================= INIT ================= */
  ngAfterViewInit(): void {

    /* ================= SLIDER ================= */
    const slides = document.querySelectorAll('.slide');
    let current = 0;

    if (slides.length > 0) {
      setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, 5000);
    }


    /* ================= PARTICLES ================= */
    if (typeof particlesJS !== 'undefined') {
      particlesJS("particles-js", {
        particles: {
          number: { value: 30 },
          size: { value: 3 },
          move: { speed: 0.8 },
          line_linked: {
            enable: true,
            opacity: 0.15
          }
        }
      });
    }


    /* ================= AOS ================= */
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true
      });
    }


    /* ================= GALLERY FILTER ================= */
    const tabs = document.querySelectorAll('.tab');
    const items = document.querySelectorAll('.gallery-item');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        items.forEach(item => {
          const el = item as HTMLElement;

          if (filter === 'all' || item.classList.contains(filter!)) {
            el.style.display = 'block';
          } else {
            el.style.display = 'none';
          }
        });

      });
    });


    /* ================= LIGHTBOX ================= */
    const lightbox = document.getElementById('lightbox') as HTMLElement;
    const img = document.getElementById('lightbox-img') as HTMLImageElement;
    const video = document.getElementById('lightbox-video') as HTMLIFrameElement;
    const closeBtn = document.querySelector('.lightbox .close') as HTMLElement;

    items.forEach(item => {
      item.addEventListener('click', () => {

        if (!lightbox) return;

        lightbox.style.display = 'flex';

        if (item.classList.contains('video')) {
          video.src = item.getAttribute('data-video') || '';
          video.style.display = 'block';
          img.style.display = 'none';
        } else {
          img.src = item.getAttribute('data-src') || '';
          img.style.display = 'block';
          video.style.display = 'none';
        }

      });
    });

    /* CLOSE BUTTON */
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        video.src = '';
      });
    }

    /* OUTSIDE CLICK CLOSE */
    if (lightbox) {
      lightbox.addEventListener('click', (e: any) => {
        if (e.target === lightbox) {
          lightbox.style.display = 'none';
          video.src = '';
        }
      });
    }

  }

}