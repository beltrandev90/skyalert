import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoClimaComponent } from '../components/grafico-clima/grafico-clima.component'; // Ajusta la ruta según sea necesario

@NgModule({
  declarations: [GraficoClimaComponent],
  imports: [CommonModule],
  exports: [GraficoClimaComponent] // Exporta el componente para usarlo en otros módulos
})
export class SharedModule {}
