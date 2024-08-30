<script>
    import { mapStores } from 'pinia'
    import { useAuthStore } from '@/stores/auth.js'

    export default {
        name: "AppHeader",
        methods: {
            async logout() {
                await this.useAuthStore.logout();
                this.$router.push('/');
            }
        },
        computed: {
            ...mapStores(useAuthStore)
        }
    }
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand">Travelly</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <RouterLink to="/dashboard" class="nav-link" v-if="this.useAuthStore.isAuthenticated">Dashboard</RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="!this.useAuthStore.isAuthenticated">
                    <li class="nav-item">
                        <RouterLink to="/register" class="nav-link" v-if="$route.fullPath != '/register'">Register</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/login" class="nav-link" v-if="$route.fullPath != '/login'">Login</RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="this.useAuthStore.isAuthenticated">
                    <!-- <li class="nav-item dropdown">
                        <button class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Welcome {{ this.useAuthStore.user?.name }}
                        </button>
                        <ul class="dropdown-menu" id="myDropdown" >
                            <li><a class="dropdown-item" href="#" @click="this.useAuthStore.logout()">Logout</a></li>
                        </ul>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link" @click="logout()">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

</style>