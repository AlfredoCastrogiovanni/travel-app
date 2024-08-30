<script>
    import { mapStores } from 'pinia'
    import { useTripStore } from '@/stores/trip.js'
    import { Modal } from 'bootstrap';
    import UpdateDayModal from '@/components/UpdateDayModal.vue'
    import CreateStageModal from '@/components/CreateStageModal.vue'
    import UpdateStageModal from '@/components/UpdateStageModal.vue'

    export default {
        name: "DayDetailsOffcanvas",
        data() {
            return {
                selectedStage: null
            }
        },
        methods: {
            deleteDay() {
                this.useTripStore.deleteDay(this.day.id);
            },
            deleteStage(stageId) {
                this.useTripStore.deleteStage(stageId);
            },
            prepareUpdateDayModal() {
                this.$refs.offcanvas.addEventListener('hidden.bs.offcanvas', this.openUpdateDayModalModal, { once: true });
            },
            openUpdateDayModalModal() {
                const modalElement = this.$refs.updateDayModal?.$el?.nextElementSibling;
                const modalInstance = new Modal(modalElement);
                modalInstance.show();
            },
            prepareCreateStageModal() {
                this.$refs.offcanvas.addEventListener('hidden.bs.offcanvas', this.openCreateStageModal, { once: true });
            },
            openCreateStageModal() {
                const modalElement = this.$refs.createDayModal?.$el?.nextElementSibling;
                const modalInstance = new Modal(modalElement);
                modalInstance.show();
            },
            prepareUpdateStageModal(stage) {
                this.$refs.offcanvas.addEventListener('hidden.bs.offcanvas', this.openUpdateStageModal(stage), { once: true });
            },
            openUpdateStageModal(stage) {
                this.selectedStage = stage;
                const modalElement = this.$refs.updateStageModal.$el.nextElementSibling;
                const modalInstance = new Modal(modalElement);
                modalInstance.show();
            },
        },
        components: {
            UpdateDayModal,
            CreateStageModal,
            UpdateStageModal
        },
        computed: {
            ...mapStores(useTripStore)
        },
        props: ['day']
    }
</script>

<template>
    <div class="offcanvas offcanvas-start" tabindex="-1" data-bs-backdrop="static" :id="'offcanvasDay' + day.id" aria-labelledby="offcanvasDayLabel" ref="offcanvas">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title me-auto" id="offcanvasExampleLabel">{{ day.title }}</h5>
            <div class="d-flex align-items-center">
                <!-- Delete -->
                <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" data-bs-dismiss="offcanvas" aria-label="Close" @click="deleteDay()">
                    <path d="M10 12V17" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 12V17" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 7H20" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <!-- Edit -->
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="ms-2" data-bs-dismiss="offcanvas" aria-label="Close" @click="prepareUpdateDayModal()">
                    <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#808080" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#808080" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <button type="button" class="btn-close ms-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
        </div>
        <div class="offcanvas-body">
            <div class="mb-3">{{ day.description }}</div>
            <div class="row py-2 mb-2 align-items-center">
                <div class="col-6">
                    <h6 class="m-0">Stages</h6>
                </div>
                <div class="col-6 text-end">
                    <button class="btn btn-primary btn-sm" data-bs-dismiss="offcanvas" aria-label="Close" @click="prepareCreateStageModal()">Add Stage</button>
                </div>
            </div>
            <div class="list-group">
                <div class="list-group-item list-group-item-action" v-for="(stage, index) in day.stages">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-2">{{ stage.title }}</h5>
                        <small class="d-flex align-items-center">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" data-bs-dismiss="offcanvas" aria-label="Close" @click="prepareUpdateStageModal(stage)">
                                <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#808080" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#808080" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <button type="button" class="btn-close ms-1" @click="deleteStage(stage.id)"></button>
                        </small>
                    </div>
                    <p class="mb-1">{{ stage.description }}</p>
                    <small>Stage {{ index + 1 }}</small>
                </div>
            </div>
        </div>
    </div>
    <UpdateDayModal :day="this.day" ref="updateDayModal"/>
    <CreateStageModal :day="this.day" ref="createDayModal" />
    <UpdateStageModal :stage="selectedStage" ref="updateStageModal" />
</template>

<style lang="scss" scoped>

</style>