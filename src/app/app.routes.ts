import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Header } from './component/header/header';
import { Footer } from './component/footer/footer';
import { ContactUs } from './component/contact-us/contact-us';
import { About } from './component/about/about';
import { Privacy } from './component/privacy/privacy';
import { Academics } from './component/academics/academics';
import { OurTeachers } from './component/our-teachers/our-teachers';
import { Results } from './component/results/results';
import { Admissions } from './component/admissions/admissions';
import { SmartClasses } from './component/smart-classes/smart-classes';
import { Laborartories } from './component/laborartories/laborartories';
import { Library } from './component/library/library';
import { Club } from './component/club/club';
import { Sports } from './component/sports/sports';
import { Activities } from './component/activities/activities';
import { Syllabus } from './component/syllabus/syllabus';
import { HigherSecondary } from './component/higher-secondary/higher-secondary';
import { Matriculation } from './component/matriculation/matriculation';
import { Galary } from './component/galary/galary';
import { Facilities } from './component/facilities/facilities';
import { Terms } from './component/terms/terms';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'header', component: Header },
  { path: 'footer', component: Footer },
  { path: 'contact', component: ContactUs },
  { path: 'about', component: About },
  { path: 'privacy-policy', component: Privacy },
  { path: 'academics', component: Academics },
  { path: 'our-teachers', component: OurTeachers },
  { path: 'results', component: Results },
  { path: 'admissions', component: Admissions },
  { path: 'smart-classes', component: SmartClasses },
  { path: 'labs', component: Laborartories },
  { path: 'library', component: Library },
  { path: 'clubs', component: Club },
  { path: 'sports', component: Sports },
  { path: 'activities', component: Activities },
  { path: 'syllabus', component: Syllabus },
  { path: 'higher-secondary', component: HigherSecondary },
  { path: 'matriculation', component: Matriculation },
  { path: 'gallery', component: Galary },
  { path: 'facilities', component: Facilities },
  { path: 'terms', component: Terms },
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'admin/login',

    loadComponent: () => import('./admin/admin-login/admin-login').then((m) => m.AdminLogin),
  },

  {
    path: 'admin/dashboard',

    canActivate: [adminGuard],

    loadComponent: () =>
      import('./admin/admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
  },
];
