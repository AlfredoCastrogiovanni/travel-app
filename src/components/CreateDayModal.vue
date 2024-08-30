<script>
    import { mapStores } from 'pinia'
    import { useTripStore } from '@/stores/trip.js'

    export default {
        name: "CreateDayModal",
        data() {
            return {
                formData: {
                    title: '',
                    description: '',
                    trip_id: this.$route.params.id
                }
            }
        },
        methods: {
            async createDay() {
                await this.useTripStore.createDay(this.formData);
                this.formData.title = '';
                this.formData.description = '';
            }
        },
        computed: {
            ...mapStores(useTripStore)
        },
        props: ['trip']
    }
</script>

<template>
    <!-- Modal -->
    <div class="modal fade" id="createDayModal" tabindex="-1" aria-labelledby="createDayModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="createDayModalLabel">Create Day</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="title" class="col-form-label">Title</label>
                            <input type="text" v-model="formData.title" class="form-control" id="title">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" v-model="formData.description" id="description" rows="5"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createDay">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>