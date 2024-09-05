import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class FavoritosPage implements OnInit {
  favoritos: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.favoritos = navigation.extras.state['favoritos'] || [];
    }
  }

  selectCiudad(ciudad: string) {
    this.router.navigate(['/home'], {
      state: { ciudad: ciudad }
    });
  }

  close() {
    this.router.navigate(['/home']);
  }
}
