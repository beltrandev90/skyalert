// src/app/models/clima.model.ts

export interface ClimaDatos {
    coord: { lon: number; lat: number };
    weather: { id: number; main: string; description: string; icon: string }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number; // Añadido
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    }; // Añadido
    clouds: { all: number };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
