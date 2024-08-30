<script>
    import { mapStores } from 'pinia'
    import { useTripStore } from '@/stores/trip.js'
    import { useAuthStore } from '@/stores/auth.js'

    export default {
        name: "CreateTripView",
        data() {
            return {
                formData: {
                    title: '',
                    start_date: '',
                    description: '',
                }
            }
        },
        methods: {
            async updateTrip() {
                await this.useTripStore.updateTrip(this.$route.params.id, this.formData);
                this.$router.push(`/trip/${this.$route.params.id}`);
            },
            async getTrip() {
                const trip = await this.useTripStore.fetchTripDetails(this.$route.params.id)
                this.formData.title = trip.title;
                this.formData.start_date = trip.start_date;
                this.formData.description = trip.description;
            }
        },
        computed: {
            ...mapStores(useTripStore, useAuthStore)
        },
        created() {
            this.getTrip();
        }
    }
</script>

<template>
    <div class="container mt-3">
        <div class="row">
            <form class="col-10 row" @submit.prevent="updateTrip">
                <div class="col-12 mb-2">
                    <h3>Edit Trip</h3>
                </div>
                <div class="col-6 mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" v-model="formData.title" class="form-control" id="title">
                </div>
                <div class="col-6">
                    <label for="start_date" class="form-label">Start Date</label>
                    <input type="date" v-model="formData.start_date" class="form-control" id="start_date">
                </div>
                <div class="col-mb-12 mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" v-model="formData.description" id="description" rows="5"></textarea>
                </div>
                <div class="col-12">
                    <input type="submit" class="btn btn-primary">
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>