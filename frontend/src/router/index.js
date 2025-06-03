import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import StationForm from '../components/StationForm.vue';
import Stations from '../components/Stations.vue';

const routes = [
  { path: '/', redirect: '/stations' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/stations', component: Stations },
  { path: '/stations/new', component: StationForm },
  { path: '/stations/edit/:id', component: StationForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = !!localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});

export default router;
