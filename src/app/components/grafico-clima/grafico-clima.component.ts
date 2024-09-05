import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registra todos los componentes necesarios para el gráfico de líneas
Chart.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

@Component({
  selector: 'app-grafico-clima',
  templateUrl: './grafico-clima.component.html',
  styleUrls: ['./grafico-clima.component.scss'],
})
export class GraficoClimaComponent implements OnInit {
  @Input() forecast: { date: string; temp: number }[] = [];
  chart: Chart<'line'> | undefined;

  ngOnInit() {
    const labels = this.forecast.map(f => f.date);
    const data = this.forecast.map(f => f.temp);

    const chartData: ChartData<'line'> = {
      labels: labels,
      datasets: [
        {
          label: 'Temperatura',
          data: data,
          borderColor: '#00aeef',
          fill: false
        }
      ]
    };

    const chartOptions: ChartOptions<'line'> = {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          type: 'category' as const, // Usa 'as const' para asegurar el tipo
          display: true,
        },
        y: {
          type: 'linear' as const, // Usa 'as const' para asegurar el tipo
          display: true,
        }
      }
    };

    this.chart = new Chart('canvas', {
      type: 'line',
      data: chartData,
      options: chartOptions
    });
  }
}
