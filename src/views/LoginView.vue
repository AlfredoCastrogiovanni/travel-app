<script>
    import { mapStores } from 'pinia'
    import { useAuthStore } from '@/stores/auth.js'

    export default {
        name: "LoginView",
        data() {
            return {
                formData: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async login() {
                await this.useAuthStore.login(this.formData);
                if (this.useAuthStore.isAuthenticated) {
                    this.formData.email = '';
                    this.formData.password = '';
                    this.useAuthStore.errors = [];
                    this.$router.push('/')
                }
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
            <form class="col-10 card py-3 px-4 rounded-4" @submit.prevent="login">
                <div class="mb-3">
                    <h1>Login</h1>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="formData.email" class="form-control" :class="{'is-invalid': this.useAuthStore.errors?.email != undefined }" id="email">
                    <div class="invalid-feedback" v-if="!!this.useAuthStore.errors?.email">
                        {{ this.useAuthStore.errors?.email[0] }}
                    </div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" v-model="formData.password" class="form-control" :class="{'is-invalid': !!this.useAuthStore.errors?.password }" id="password">
                    <div class="invalid-feedback" v-if="!!this.useAuthStore.errors?.password">
                        {{ this.useAuthStore.errors?.password[0] }}
                    </div>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>