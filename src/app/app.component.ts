import { Component, OnInit } from '@angular/core';
import * as tinycolor from 'tinycolor2';

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  primaryColor = '#2196F3';
  primaryColorPalette: Color[] = [];

  title = 'angular-material-theming';
  currentTheme: string;

  constructor() {
    this.savePrimaryColor(this.primaryColor);
  }

  ngOnInit(): void {
    this.currentTheme = this.primaryColor;
    localStorage.setItem('Foo', 'Bar');
  }

  changeTheme(theme: string) {
    document.documentElement.style.setProperty('--primary-color', theme);
  }

  savePrimaryColor(primaryColor: string) {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    this.primaryColor = primaryColor;
    this.primaryColorPalette = computeColors(primaryColor);

    for (const color of this.primaryColorPalette) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }
}

function computeColors(hex: string): Color[] {
  return [
    getColorObject(tinycolor(hex).lighten(52), '50'),
    getColorObject(tinycolor(hex).lighten(37), '100'),
    getColorObject(tinycolor(hex).lighten(26), '200'),
    getColorObject(tinycolor(hex).lighten(12), '300'),
    getColorObject(tinycolor(hex).lighten(6), '400'),
    getColorObject(tinycolor(hex), '500'),
    getColorObject(tinycolor(hex).darken(6), '600'),
    getColorObject(tinycolor(hex).darken(12), '700'),
    getColorObject(tinycolor(hex).darken(18), '800'),
    getColorObject(tinycolor(hex).darken(24), '900'),
    getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
    getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
    getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
    getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
  ];
}

function getColorObject(value, name): Color {
  const c = tinycolor(value);
  return {
    name,
    hex: c.toHexString(),
    darkContrast: c.isLight()
  };
}
