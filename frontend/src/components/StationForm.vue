<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">{{ isEdit ? 'Edit Station' : 'Add Station' }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input
        v-model="station.name"
        type="text"
        placeholder="Station Name"
        class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
        required
      />
      <div class="flex space-x-4">
        <input
          v-model.number="station.location.latitude"
          type="number"
          step="any"
          placeholder="Latitude"
          class="flex-1 p-3 rounded bg-gray-700 text-white focus:outline-none"
          required
          min="-90"
          max="90"
        />
        <input
          v-model.number="station.location.longitude"
          type="number"
          step="any"
          placeholder="Longitude"
          class="flex-1 p-3 rounded bg-gray-700 text-white focus:outline-none"
          required
          min="-180"
          max="180"
        />
      </div>
      <select
        v-model="station.status"
        class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
        required
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <input
        v-model.number="station.powerOutput"
        type="number"
        placeholder="Power Output (kW)"
        class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
        required
        min="0"
      />
      <input
        v-model="station.connectorType"
        type="text"
        placeholder="Connector Type"
        class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
        required
      />
      <button
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
      >
        {{ isEdit ? 'Update' : 'Create' }}
      </button>
      <p v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  props: ['id'],
  data() {
    return {
      station: {
        name: '',
        location: { latitude: '', longitude: '' },
        status: 'Active',
        powerOutput: null,
        connectorType: '',
      },
      error: null,
    };
  },
  computed: {
    isEdit() {
      return !!this.id;
    },
  },
  async created() {
    if (this.isEdit) {
      await this.fetchStation();
    }
  },
  methods: {
    async fetchStation() {
      this.error = null;
      try {
        const response = await api.get(`/stations`);
        const station = response.data.data.find(s => s._id === this.id);
        if (station) {
          this.station = station;
        } else {
          this.error = 'Station not found';
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to load station';
      }
    },
    async handleSubmit() {
      this.error = null;
      try {
        if (this.isEdit) {
          await api.put(`/stations/${this.id}`, this.station);
        } else {
          console.log('Submitting new station:', this.station);
          const response = await api.post('/stations', this.station);
          console.log('Response:', response);
        }
        this.$router.push('/stations');
      } catch (err) {
        console.error('Error submitting station:', err);
        this.error = err.response?.data?.message || (this.isEdit ? 'Update failed' : 'Creation failed');
      }
    },
  },
};
</script>
