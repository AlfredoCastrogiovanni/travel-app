<script>
    import { mapStores } from 'pinia'
    import { useTripStore } from '@/stores/trip.js'
    import CreateDayModal from '@/components/CreateDayModal.vue'
    import DayDetailsOffcanvas from '@/components/DayDetailsOffcanvas.vue'

    export default {
        name: "TripDetailsView",
        data() {
            return {
                trip: null
            }
        },
        methods: {
            async getTrip() {
                this.trip = await this.useTripStore.fetchTripDetails(this.$route.params.id);
            },
            deleteTrip(tripId) {
                this.useTripStore.deleteTrip(tripId);
                this.$router.push('/dashboard');
            }
        },
        computed: {
            ...mapStores(useTripStore)
        },
        components: {
            CreateDayModal,
            DayDetailsOffcanvas
        },
        created() {
            this.getTrip();
        }
    }
</script>

<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-6">
                <h3>{{ this.trip?.title }}<span class="badge text-bg-primary ms-2">{{this.trip?.start_date}}</span></h3>
                <p> {{ this.trip?.description }}</p>
            </div>
            <div class="col-6 d-flex justify-content-end align-items-start">
                <button class="btn btn-primary me-2" @click="this.$router.push(`/trip/edit/${this.trip?.id}`)">Edit</button>
                <button class="btn btn-warning" @click="deleteTrip(trip.id)">Delete</button>
            </div>
            <div class="col-12">
                <h4>Days</h4>
                <div class="row">
                    <div class="col-4 mb-3" v-for="(day, index) in this.trip?.days">
                        <div class="card" data-bs-toggle="offcanvas" :data-bs-target="'#offcanvasDay' + day.id">
                            <div class="card-body">
                                <h5 class="card-title">DAY {{ index + 1 }}</h5>
                                <p>{{ day?.title }}</p>
                            </div>
                        </div>
                        <DayDetailsOffcanvas :day="day"/>
                    </div>
                    <div class="col-4 mb-3">
                        <div class="card h-100" @click="this.$router.push('')" data-bs-toggle="modal" data-bs-target="#createDayModal">
                            <div class="card-body d-flex justify-content-center align-items-center">
                                <h4>+</h4>
                            </div>
                        </div>
                        <CreateDayModal :trip="trip" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>