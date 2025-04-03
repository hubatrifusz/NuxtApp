<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useCarStore } from '@/store/cars.store';
import { onMounted, ref } from 'vue';

const route = useRoute();
const router = useRouter();
const carStore = useCarStore();
const car = ref(null);

onMounted(() => {
    const carId = route.params.id;
    const carDetails = carStore.cars.find((car) => car.id === Number(carId));

    if (carDetails) {
        car.value = carDetails;
    } else {
        console.error('Car not found');
    }
});

const goBack = () => {
    router.back();
};
</script>

<template>
    <v-container v-if="car">
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>{{ car.make }} - {{ car.model }}</v-card-title>
                    <v-card-subtitle>{{ car.fuel_type }}</v-card-subtitle>
                    <v-card-text>
                        <div><strong>Price:</strong> {{ car.price }}</div>
                        <div><strong>Year:</strong> {{ car.year }}</div>
                        <div><strong>Description:</strong> {{ car.description }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="goBack">Go Back</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-else>
        <v-alert type="error">Car details not found.</v-alert>
    </v-container>
</template>
