<script setup lang="ts">
import { useCarStore } from '@/store/cars.store';
import { ref, computed, onMounted } from 'vue';

const carStore = useCarStore();
await carStore.fetchCars();

const selectedMake = ref(carStore.searchFilters.selectedMake);
const selectedModel = ref(carStore.searchFilters.selectedModel);
const selectedFuelType = ref(carStore.searchFilters.selectedFuelType);
const filteredCars = ref(carStore.searchResults);

const availableModels = computed(() => {
  let filteredCarsList = carStore.cars;
  if (selectedMake.value) {
    filteredCarsList = filteredCarsList.filter(car => car.make === selectedMake.value);
  }
  if (selectedFuelType.value) {
    filteredCarsList = filteredCarsList.filter(car => car.fuel_type === selectedFuelType.value);
  }
  return filteredCarsList.map(car => car.model);
});

const updateModels = () => {
  selectedModel.value = null;
};

const searchCars = () => {
  let cars = carStore.cars;
  if (selectedMake.value) {
    cars = cars.filter(car => car.make === selectedMake.value);
  }
  if (selectedModel.value) {
    cars = cars.filter(car => car.model === selectedModel.value);
  }
  if (selectedFuelType.value) {
    cars = cars.filter(car => car.fuel_type === selectedFuelType.value);
  }
  filteredCars.value = cars;

  carStore.saveFilters({
    selectedMake: selectedMake.value,
    selectedModel: selectedModel.value,
    selectedFuelType: selectedFuelType.value,
  });
  carStore.saveResults(cars);
};
</script>


<template>
  <KeepAlive>
    <v-container>
      <v-row justify="center">
        <!-- Comboboxes for selecting filters -->
        <v-col cols="auto" style="width: 300px;">
          <v-combobox clearable label="Márka" :items="carStore.uniqueMakes.sort()" variant="outlined"
            v-model="selectedMake" @change="updateModels"></v-combobox>
        </v-col>
        <v-col cols="auto" style="width: 300px;">
          <v-combobox clearable label="Modell" :items="availableModels" variant="outlined" v-model="selectedModel"
            :disabled="!selectedMake"></v-combobox>
        </v-col>
        <v-col cols="auto" style="width: 300px;">
          <v-combobox clearable label="Üzemanyag" :items="carStore.uniqueFuelTypes.sort()" variant="outlined"
            v-model="selectedFuelType"></v-combobox>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="auto">
          <v-btn color="primary" @click="searchCars">Search</v-btn>
        </v-col>
      </v-row>

      <!-- Display filtered cars in cards -->
      <v-row justify="center" v-if="filteredCars.length > 0">
        <v-col v-for="car in filteredCars" :key="car.id" cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-card-title>{{ car.make }} - {{ car.model }}</v-card-title>
            <v-card-subtitle>{{ car.fuel_type }}</v-card-subtitle>
            <v-card-text>
              <div><strong>Price:</strong> {{ car.price }}</div>
              <div><strong>Year:</strong> {{ car.year }}</div>
            </v-card-text>
            <v-card-actions>
              <nuxtLink :to="`/car/${car.id}`">
                <v-btn color="primary">View Details</v-btn>
              </nuxtLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </KeepAlive>
</template>
