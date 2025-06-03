<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 rounded-lg shadow-lg text-white relative overflow-hidden">
    <div class="absolute inset-0 opacity-20 bg-gradient-to-tr from-purple-600 via-indigo-700 to-blue-800 animate-gradient-x -z-10 rounded-lg"></div>
    <h2 class="text-3xl font-extrabold mb-6 text-center drop-shadow-lg relative z-10">Register</h2>
    <form @submit.prevent="handleRegister" class="space-y-4 relative z-10">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-full p-3 rounded bg-gray-700 bg-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
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
        class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Register
      </button>
    </form>
    <p class="mt-4 text-center relative z-10">
      Already have an account?
      <router-link to="/login" class="text-blue-400 hover:underline">Login</router-link>
    </p>
    <p v-if="error" class="mt-4 text-red-500 text-center relative z-10">{{ error }}</p>
    <p v-if="success" class="mt-4 text-green-400 text-center font-semibold animate-pulse relative z-10">🎉 Registration successful! Please login to continue. 🚀</p>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null,
      success: false,
    };
  },
  methods: {
    async handleRegister() {
      this.error = null;
      this.success = false;
      try {
        const response = await api.post('/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.success = true;
        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed';
      }
    },
  },
};
</script>
