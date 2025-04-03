import { defineStore } from 'pinia';
import type { Car } from '~/models/car.model';

interface CarFilters {
  selectedMake: string | null;
  selectedModel: string | null;
  selectedFuelType: string | null;
}

export const useCarStore = defineStore('carStore', {
  state: () => ({
    cars: [],
    searchFilters: {
      selectedMake: null,
      selectedModel: null,
      selectedFuelType: null,
    } as CarFilters,
    searchResults: [] as any[], // Adjust type as needed
  }),
  actions: {
    async fetchCars() {
      const res = await fetch('http://localhost:3001/cars');
      this.cars = await res.json();
    },
    saveFilters(filters: CarFilters) {
      this.searchFilters = filters;
    },
    saveResults(results: any[]) {
      this.searchResults = results;
    },
  },
  getters: {
    uniqueMakes(state) {
      return [...new Set(state.cars.map(car => (car as Car).make))];
    },
    uniqueFuelTypes(state) {
      return [...new Set(state.cars.map(car => (car as Car).fuel_type))];
    }
  },
});