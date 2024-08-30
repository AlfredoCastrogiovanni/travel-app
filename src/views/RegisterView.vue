<script>
    import { mapStores } from 'pinia'
    import { useAuthStore } from '@/stores/auth.js'

    export default {
        name: "RegisterView",
        data() {
            return {
                formData: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async register() {
                await this.useAuthStore.register(this.formData);
                this.formData.name = ''
                this.formData.email = ''
                this.formData.password = ''
                this.useAuthStore.isAuthenticated ? this.$router.push('/') : '';
            }
        },
        computed: {
            ...mapStores(useAuthStore)
        }
    }
</script>

<template>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <form class="col-10 card py-3 px-4 rounded-4" @submit.prevent="register">
                <div class="mb-3">
                    <h1>Register</h1>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" v-model="formData.name" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="formData.email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" v-model="formData.password" class="form-control" id="password">
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div class="mb-3">
                    <h1 v-if="this.useAuthStore.error != null"> {{ this.useAuthStore.error }}</h1>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>