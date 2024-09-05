import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClimaService } from 'src/app/servicios/clima.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClimaDatos } from 'src/app/models/clima.model';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

// Importar íconos de FontAwesome
import { faCloud, faSun, faCloudRain, faCloudSun, faCloudShowersHeavy, faSnowflake, faSmog, faWind, faBolt, faCloudMoon, faCloudSunRain } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

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

  // Definir los íconos que se utilizarán en la página
  faCloud = faCloud;
  faSun = faSun;
  faCloudRain = faCloudRain;
  faCloudSun = faCloudSun;
  faCloudShowersHeavy = faCloudShowersHeavy;
  faSnowflake = faSnowflake;
  faSmog = faSmog;
  faWind = faWind;
  faBolt = faBolt;
  faCloudMoon = faCloudMoon;
  faCloudSunRain = faCloudSunRain;


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

  }

  // Mapea los códigos de icono del API a los iconos de FontAwesome
  getIconoClima(iconCode: string) {
    switch (iconCode) {
      case '01d': return this.faSun;
      case '01n': return this.faCloudMoon;
      case '02d': return this.faCloudSun;
      case '02n': return this.faCloudMoon;
      case '03d':
      case '03n':
      case '04d':
      case '04n': return this.faCloud;
      case '09d':
      case '09n': return this.faCloudShowersHeavy;
      case '10d':
      case '10n': return this.faCloudRain;
      case '11d':
      case '11n': return this.faBolt;
      case '13d':
      case '13n': return this.faSnowflake;
      case '50d':
      case '50n': return this.faSmog;
      default: return this.faCloud; // Ícono predeterminado
    }
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

