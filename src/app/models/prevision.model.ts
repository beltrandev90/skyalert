// prevision.model.ts

export interface PrevisionDiaria {
    data: {
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      time: string[];
      // Otros campos según la respuesta
    };
  }
  
  export interface PrevisionPorHoras {
    data: {
      temperature_2m: number[];
      time: string[];
      // Otros campos según la respuesta
    };
  }
  
  // Define interfaces para los datos transformados que se usan en la vista
  export interface PrevisionDiariaTransformada {
    dia: string;
    temperaturaMax: number;
    temperaturaMin: number;
    icono: string;
  }
  
  export interface PrevisionPorHorasTransformada {
    hora: string;
    temperatura: number;
    icono: string;
  }
  