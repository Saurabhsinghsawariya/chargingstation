 <template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 rounded-lg shadow-lg text-white relative overflow-hidden">
    <div class="absolute inset-0 opacity-20 bg-gradient-to-tr from-purple-600 via-indigo-700 to-blue-800 animate-gradient-x -z-10"></div>
    <div class="flex justify-between items-center mb-6 relative z-10">
      <h2 class="text-3xl font-extrabold tracking-wide drop-shadow-lg">Charging Stations</h2>
      <div>
        <router-link
          to="/stations/new"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Station
        </router-link>
        <button
          @click="toggleView"
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mr-4"
        >
          {{ showMap ? 'Show List' : 'Show Map' }}
        </button>
        <button
          @click="handleLogout"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mr-4"
        >
          Logout
        </button>
      </div>
    </div>

    <div class="mb-4 flex space-x-4">
      <select v-model="filters.status" class="p-2 rounded bg-gray-700 text-white">
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <select v-model="filters.connectorType" class="p-2 rounded bg-gray-700 text-white">
        <option value="">All Connector Types</option>
        <option v-for="type in uniqueConnectorTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <input
        type="number"
        v-model.number="filters.minPowerOutput"
        placeholder="Min Power Output (kW)"
        class="p-2 rounded bg-gray-700 text-white w-48"
        min="0"
      />
      <button
        @click="filterNearMe"
        class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Show Stations Near Me
      </button>
    </div>

    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <StationsMap v-if="showMap" :stations="filteredStations" />
    <table v-else class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b border-gray-700">
          <th class="py-2 px-4">Name</th>
          <th class="py-2 px-4">Location</th>
          <th class="py-2 px-4">Status</th>
          <th class="py-2 px-4">Power Output</th>
          <th class="py-2 px-4">Connector Type</th>
          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="station in filteredStations" :key="station._id" class="border-b border-gray-700">
          <td class="py-2 px-4">{{ station.name }}</td>
          <td class="py-2 px-4">{{ station.location.latitude }}, {{ station.location.longitude }}</td>
          <td class="py-2 px-4">{{ station.status }}</td>
          <td class="py-2 px-4">{{ station.powerOutput }} kW</td>
          <td class="py-2 px-4">{{ station.connectorType }}</td>
          <td class="py-2 px-4 space-x-2">
            <router-link
              :to="`/stations/edit/${station._id}`"
              class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
            >
              Edit
            </router-link>
            <button
              @click="deleteStation(station._id)"
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../api';
import StationsMap from './StationsMap.vue';

export default {
  components: {
    StationsMap,
  },
  data() {
    return {
      stations: [],
      error: null,
      showMap: false,
      filters: {
        status: '',
        connectorType: '',
        minPowerOutput: null,
        nearMe: false,
      },
      userLocation: null,
    };
  },
  computed: {
    uniqueConnectorTypes() {
      const types = this.stations.map(s => s.connectorType);
      return [...new Set(types)];
    },
    filteredStations() {
      return this.stations.filter(station => {
        const statusMatch = this.filters.status ? station.status === this.filters.status : true;
        const connectorMatch = this.filters.connectorType ? station.connectorType === this.filters.connectorType : true;
        const powerMatch = this.filters.minPowerOutput != null ? station.powerOutput >= this.filters.minPowerOutput : true;
        const nearMeMatch = this.filters.nearMe && this.userLocation
          ? this.isWithinRadius(station.location, this.userLocation, 10)
          : true;
        return statusMatch && connectorMatch && powerMatch && nearMeMatch;
      });
    },
  },
  async created() {
    await this.fetchStations();
  },
  methods: {
    toggleView() {
      this.showMap = !this.showMap;
    },
    async fetchStations() {
      this.error = null;
      try {
        const response = await api.get('/stations');
        this.stations = response.data.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to load stations';
      }
    },
    async deleteStation(id) {
      if (!confirm('Are you sure you want to delete this station?')) return;
      this.error = null;
      try {
        await api.delete(`/stations/${id}`);
        this.stations = this.stations.filter(s => s._id !== id);
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to delete station';
      }
    },
    handleLogout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
};
</script>
