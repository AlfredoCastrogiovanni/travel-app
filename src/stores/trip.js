import { defineStore, setMapStoreSuffix } from "pinia";
import apiService from "@/assets/js/apiService";

setMapStoreSuffix('')

export const useTripStore = defineStore("useTripStore", {
    state: () => ({
        trips: [],
        selectedTrip: null,
    }),
    actions: {
        async fetchTrips() {
            try {
                const response = await apiService.getTrips();
                this.trips = response.data.results;
            } catch (error) {
                console.error('Failed to fetch trips:', error);
            }
        },
        async fetchTripDetails(tripId) {
            try {
                const response = await apiService.getTripDetails(tripId);
                this.selectedTrip = response.data.results;
                return this.selectedTrip;
            } catch (error) {
                console.error('Failed to fetch trip details:', error);
            }
        },
        async createTrip(tripData) {
            try {
                const response = await apiService.createTrip(tripData);
                this.trips.push(response.data.results);
            } catch (error) {
                console.error('Failed to create trip:', error);
            }
        },
        async updateTrip(tripId, tripData) {
            try {
                const response = await apiService.updateTrip(tripId, tripData);
                const index = this.trips.findIndex((trip) => trip.id === tripId);
                if (index !== -1) {
                        this.trips[index] = response.data.results;
                }
            } catch (error) {
                console.error('Failed to update trip:', error);
            }
        },
        async deleteTrip(tripId) {
            try {
                await apiService.deleteTrip(tripId);
                this.trips = this.trips.filter((trip) => trip.id !== tripId);
            } catch (error) {
                console.error('Failed to delete trip:', error);
            }
        },


        // Days
        async createDay(dayData) {
            try {
                const response = await apiService.createDay(dayData);
                this.selectedTrip.days.push(response.data.results);
            } catch (error) {
                console.error('Failed to create day:', error);
            }
        },
        async updateDay(dayId, dayData) {
            try {
                const response = await apiService.updateDay(dayId, dayData);
                const index = this.selectedTrip.days.findIndex((day) => day.id === dayId);
                if (index !== -1) {
                this.selectedTrip.days[index] = response.data.results;
                }
            } catch (error) {
                console.error('Failed to update day:', error);
            }
        },
        async deleteDay(dayId) {
            try {
                await apiService.deleteDay(dayId);
                this.selectedTrip.days = this.selectedTrip.days.filter((day) => day.id !== dayId);
            } catch (error) {
                console.error('Failed to delete day:', error);
            }
        },

        // Stages
        async createStage(dayId, stageData) {
            try {
                const response = await apiService.createStage(stageData);
                const day = this.selectedTrip.days.find((day) => day.id === dayId);
                if (!day.stages) {
                    day.stages = [];
                }
                if (day) {
                    day.stages.push(response.data.results);
                }
            } catch (error) {
                console.error('Failed to create stage:', error);
            }
        },
        async updateStage(stageId, stageData) {
            try {
                const response = await apiService.updateStage(stageId, stageData);
                for (const day of this.selectedTrip.days) {
                    const index = day.stages.findIndex((stage) => stage.id === stageId);
                    if (index !== -1) {
                        day.stages[index] = response.data.results;
                        break;
                    }
                }
            } catch (error) {
                console.error('Failed to update stage:', error);
            }
        },
        async deleteStage(stageId) {
            try {
                await apiService.deleteStage(stageId);
                for (const day of this.selectedTrip.days) {
                    day.stages = day.stages.filter((stage) => stage.id !== stageId);
                }
            } catch (error) {
                console.error('Failed to delete stage:', error);
            }
        },
    }
})