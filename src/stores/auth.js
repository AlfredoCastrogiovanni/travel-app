import { defineStore, setMapStoreSuffix } from "pinia";
import axios from "axios";

setMapStoreSuffix('')

export const useAuthStore = defineStore("useAuthStore", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        errors: null
    }),
    actions: {
        async login(formData) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/login", formData);
                console.log(response);
                
                this.token = response.data.token;
                this.user = response.data.user;

                localStorage.setItem("user", JSON.stringify(this.user))
                localStorage.setItem("token", this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            } catch (error) {
                console.error('Failed to login:', error);
                this.errors = error.response.data.errors;
            }
        },
        async register(formData) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/register", formData);
                this.token = response.data.token;
                this.user = response.data.user;

                localStorage.setItem("user", JSON.stringify(this.user))
                localStorage.setItem("token", this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            } catch (error) {
                console.error('Failed to register:', error);
                this.errors = error.response.data.errors;
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("token");
            delete axios.defaults.headers.common['Authorization'];
        }
    },
    getters: {
        isAuthenticated: state => !!state.token
    }
})