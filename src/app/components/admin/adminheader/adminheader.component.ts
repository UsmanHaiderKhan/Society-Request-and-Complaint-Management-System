import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.scss'],
})
export class AdminheaderComponent implements OnInit {
  showFiller = false;
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
