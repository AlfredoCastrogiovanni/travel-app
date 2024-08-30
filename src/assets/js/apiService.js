import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

export default {
    // Trips
    getTrips() {
        return apiClient.get('/trips', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
      },
    getTripDetails(tripId) {
        return apiClient.get(`/trips/${tripId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
    createTrip(tripData) {
        return apiClient.post('/trips', tripData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
    updateTrip(tripId, tripData) {
        return apiClient.put(`/trips/${tripId}`, tripData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
    deleteTrip(tripId) {
        return apiClient.delete(`/trips/${tripId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },


    // Days
    createDay(dayData) {
        return apiClient.post('/days', dayData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
    updateDay(dayId, dayData) {
        return apiClient.put(`/days/${dayId}`, dayData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
    deleteDay(dayId) {
        return apiClient.delete(`/days/${dayId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },


    // Stages
    createStage(stageData) {
        return apiClient.post('/stages', stageData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
    updateStage(stageId, stageData) {
        return apiClient.put(`/stages/${stageId}`, stageData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
    deleteStage(stageId) {
        return apiClient.delete(`/stages/${stageId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
}