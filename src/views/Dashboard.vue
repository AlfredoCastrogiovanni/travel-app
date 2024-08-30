<script>
    import { mapStores } from 'pinia'
    import { useTripStore } from '@/stores/trip.js'

    export default {
        name: "Dashboard",
        computed: {
            ...mapStores(useTripStore)
        },
        created() {
            this.useTripStore.fetchTrips();
        }
    }
</script>

<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 mb-2">
                <h3>Your trips</h3>
            </div>
            <div class="col-4 mb-2" v-for="trip in this.useTripStore.trips">
                <div class="card h-100" @click="this.$router.push(`/trip/${trip.id}`)">
                    <div class="card-body">
                        <h5 class="card-title">{{ trip.title }}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">{{ trip.start_date }}</h6>
                        <p class="card-text">{{ trip.description }}</p>
                    </div>
                </div>
            </div>
            <div class="col-4 mb-2">
                <div class="card h-100" @click="this.$router.push('/trip/create')">
                    <div class="card-body d-flex justify-content-center align-items-center">
                        <h4>+</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>