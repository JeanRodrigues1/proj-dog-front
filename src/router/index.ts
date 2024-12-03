import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/donos',
    name: 'DonoList',
    component: () => import('../components/DonoList.vue')
  },
  {
    path: '/donos/new',
    name: 'DonoForm',
    component: () => import('../components/DonoForm.vue')
  },
  {
    path: '/dono/update/:id',
    name: 'UpdateDono',
    component: () => import('../components/DonoForm.vue')
  },
  {
    path: '/pacientes/',
    name: 'PacienteList',
    component: () => import('../components/PacienteList.vue')
  },
  {
    path: '/paciente/new/:donoId',
    name: 'PacienteFormCadastro',
    component: () => import('../components/PacienteFormCadastro.vue')
  },
  {
    path: '/paciente/update/:id',
    name: 'UpdatePaciente',
    component: () => import('../components/PacienteForm.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
