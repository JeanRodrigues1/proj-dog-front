<template>
  <div>
    <h1>Lista de Pacientes</h1>
    <div v-for="paciente in pacientes" :key="paciente.id" class="paciente-item">
      <h3>{{ paciente.nome }}</h3>
      <p>Especie: {{ paciente.especie }}</p>
      <p>Sexo: {{ paciente.sexo }}</p>
      <label>
        Alta:
        <input type="checkbox" v-model="paciente.alta" @change="sortPacientes" />
      </label>
      <button @click="goToEditPaciente(paciente.id)">Editar</button>
      <button @click="deletePaciente(paciente.id)">Excluir</button>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface Dono {
  id: number;
  nome: string;
}

interface Paciente {
  id: number;
  nome: string;
  especie: string;
  alta: boolean;
  sexo: string;
  dono: Dono;
}

export default defineComponent({
  name: 'PacienteList',
  setup() {
    const pacientes = ref<Paciente[]>([]);
    const router = useRouter();

    axios.defaults.baseURL = 'http://localhost:8080';

    const getPacientes = async () => {
      try {
        const response = await axios.get('/paciente/all');
        console.log(response.data); 
        pacientes.value = response.data;
        sortPacientes();
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      }
  };

    const goToEditPaciente = (id: number) => {
      router.push(`/paciente/update/${id}`);
    };

    const deletePaciente = async (id: number) => {
      try {
        await axios.delete(`/paciente/${id}`);
        getPacientes();
      } catch (error) {
        console.error(error);
      }
    };

    const sortPacientes = () => {
      pacientes.value.sort((a, b) => {
        if (a.alta === b.alta) {
          return a.id - b.id; 
        }
        return a.alta ? 1 : -1;
      });
    };

    onMounted(getPacientes);

    return {
      pacientes,
      goToEditPaciente,
      deletePaciente,
      sortPacientes
    };
  },
});
</script>

<style scoped>
.paciente-item {
  margin: 1em 0;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
