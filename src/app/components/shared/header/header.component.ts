import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  navBarItems: Array<any>;
  currentSelected = 'home';
  constructor() {
    this.navBarItems = [
      { name: 'Home', link: 'home' },
      { name: 'About', link: 'about' },
      { name: 'Services', link: 'services' },
      { name: 'Gallery', link: 'gallery' },
    ];
  }

  ngOnInit(): void {}
  onSelected(navlink: string) {
    this.currentSelected = navlink;
    console.log(navlink);
  }
}
