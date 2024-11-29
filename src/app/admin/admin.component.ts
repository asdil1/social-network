import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  iframeUrl: SafeResourceUrl = "https://localhost:443";

  constructor(private sanitizer: DomSanitizer) {
    // очищаем url чтоб разрешить загрузку из небезопасных источников
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:443");
  }
}
