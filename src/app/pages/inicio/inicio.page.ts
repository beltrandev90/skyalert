import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClimaService } from 'src/app/servicios/clima.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClimaDatos } from 'src/app/models/clima.model';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage {
  ciudad: string = '';
  currentDay: string = '';
  currentDate: string = '';
  forecastData: Array<{ day: string, temp: number, icon: string }> = [];
  resultados: {
    nombre: string;
    temperatura: number;
    maxTemp: number;
    minTemp: number;
    sensacion: number;
    descripcion: string;
    icono: string;
    viento: number;
    humedad: number;
  } | null = null;
  ciudadesFiltradas: Observable<Ciudad[]> = of([]);

  esFavorito: boolean = false;
  favoritos: string[] = [];

  constructor(
    private router: Router,
    private climaService: ClimaService,
    private ciudadService: CiudadService,
    private modalController: ModalController
  ) {
    this.initializeCurrentDate();
  }

  ngOnInit() {
    const storedFavoritos = localStorage.getItem('favoritos');
    if (storedFavoritos) {
      this.favoritos = JSON.parse(storedFavoritos);
    }

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['ciudad']) {
      this.ciudad = navigation.extras.state['ciudad'];
      this.buscarCiudad(); // Busca automáticamente la ciudad seleccionada
    }

    this.router.events.subscribe(() => {  // Elimina el 'event'
      const nav = this.router.getCurrentNavigation();
      if (nav?.extras.state && nav.extras.state['ciudad']) {
        this.ciudad = nav.extras.state['ciudad'];
        this.buscarCiudad();
      }
    });

    // Lógica para redirigir después de 5 segundos (puedes ajustar el tiempo)
    setTimeout(() => {
      this.router.navigate(['/home']);  // Redirige a la página 'home'
    }, 5000);  // Cambia este valor para ajustarlo al tiempo de tu animación

  }

  initializeCurrentDate() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    this.currentDay = days[now.getDay()];
    this.currentDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  openFavoritos() {
    this.router.navigate(['/favoritos'], {
      state: { favoritos: this.favoritos }
    });
  }

  toggleFavorito() {
    if (this.resultados && this.resultados.nombre) {
      this.esFavorito = !this.esFavorito;

      if (this.esFavorito) {
        this.agregarAFavoritos(this.resultados.nombre);
      } else {
        this.eliminarDeFavoritos(this.resultados.nombre);
      }
    } else {
      console.warn('No hay resultados disponibles para agregar a favoritos.');
    }
  }

  agregarAFavoritos(ciudad: string) {
    if (!this.favoritos.includes(ciudad)) {
      this.favoritos.push(ciudad);
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
      console.log('Ciudad agregada a favoritos:', ciudad);
    }
  }

  eliminarDeFavoritos(ciudad: string) {
    this.favoritos = this.favoritos.filter(fav => fav !== ciudad);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    console.log('Ciudad eliminada de favoritos:', ciudad);
  }

  verificarSiEsFavorito() {
    if (this.resultados && this.resultados.nombre) {
      this.esFavorito = this.favoritos.includes(this.resultados.nombre);
    } else {
      this.esFavorito = false;
    }
  }

  buscarCiudad() {
    console.log('Ciudad introducida:', this.ciudad);
    if (this.ciudad) {
      this.climaService.obtenerClima(this.ciudad).subscribe(
        (datos: ClimaDatos) => {
          console.log('Datos del clima recibidos:', datos);
          this.resultados = {
            nombre: datos.name,
            temperatura: datos.main.temp,
            maxTemp: datos.main.temp_max,
            minTemp: datos.main.temp_min,
            sensacion: datos.main.feels_like,
            descripcion: datos.weather[0].description,
            icono: `http://openweathermap.org/img/wn/${datos.weather[0].icon}.png`,
            viento: datos.wind.speed,
            humedad: datos.main.humidity
          };
          this.verificarSiEsFavorito();  // Verifica si la ciudad es un favorito

          this.forecastData = [
            { day: 'Sat', temp: 23, icon: 'cloud-outline' },
            { day: 'Sun', temp: 28, icon: 'sunny-outline' },
            { day: 'Mon', temp: 2, icon: 'rainy-outline' },
            { day: 'Tue', temp: 14, icon: 'cloudy-outline' }
          ];
        },
        error => {
          console.error('Error al obtener el clima', error);
          this.resultados = null;
        }
      );
    } else {
      console.log('No se ha introducido ninguna ciudad');
    }
  }

  onCiudadChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const termino = inputElement.value;

    console.log('Término de búsqueda:', termino);

    if (termino && termino.length > 2) {
      this.ciudadesFiltradas = this.ciudadService.filtrarCiudades(termino).pipe(
        debounceTime(300)
      );
    } else {
      this.ciudadesFiltradas = of([]);
    }
  }

  selectCiudad(ciudad: Ciudad) {
    this.ciudad = ciudad.name;
    this.ciudadesFiltradas = of([]);
    this.buscarCiudad();
  }
}
