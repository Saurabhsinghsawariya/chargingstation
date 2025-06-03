<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 rounded-lg shadow-lg text-white relative overflow-hidden">
    <div class="absolute inset-0 opacity-20 bg-gradient-to-tr from-purple-600 via-indigo-700 to-blue-800 animate-gradient-x -z-10 rounded-lg"></div>
    <h2 class="text-3xl font-extrabold mb-6 text-center drop-shadow-lg relative z-10">Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4 relative z-10">
      <input
        v-model="identifier"
        type="text"
        placeholder="Username or Email"
        class="w-full p-3 rounded bg-gray-700 bg-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-3 rounded bg-gray-700 bg-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Login
      </button>
    </form>
    <p class="mt-4 text-center relative z-10">
      Don't have an account?
      <router-link to="/register" class="text-blue-400 hover:underline">Register</router-link>
    </p>
    <p v-if="error" class="mt-4 text-red-500 text-center relative z-10">{{ error }}</p>
    <p v-if="success" class="mt-4 text-green-400 text-center font-semibold animate-pulse relative z-10">🎉 Login successful! Welcome back! 🚀</p>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      identifier: '',
      password: '',
      error: null,
      success: false,
    };
  },
  methods: {
    async handleLogin() {
      this.error = null;
      this.success = false;
      try {
        const response = await api.post('/auth/login', {
          identifier: this.identifier,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.success = true;
        setTimeout(() => {
          this.$router.push('/stations');
        }, 1500);
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
      }
    },
  },
};
</script>
