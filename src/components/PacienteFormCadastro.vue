<template>
    <div>
      <h1>{{ isEdit ? 'Editar Pet' : 'Novo Pet' }}</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="id_dono">ID Dono:</label>
          <span id="id_dono">{{ paciente.donoId ? `ID: ${paciente.donoId}` : 'Não informado' }} </span>
        </div>
        <div>
          <label for="nome">Nome do Pet:</label>
          <input v-model="paciente.nome" id="nome" type="text" required />
        </div>
        <div>
          <label for="especie">Espécie do Pet:</label>
          <input v-model="paciente.especie" id="especie" type="text" required />
        </div>
        <div>
          <label for="sexo">Sexo:</label>
          <input v-model="paciente.sexo" id="sexo" type="text" required />
        </div>
        <button type="submit">{{ isEdit ? 'Atualizar' : 'Salvar' }}</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  interface Paciente {
    id?: number;
    nome: string;
    especie: string;
    sexo: string;
    donoId?: number;
  }
  
  export default defineComponent({
    name: 'PacienteForm',
    setup() {
      const paciente = ref<Paciente>({ nome: '', especie: '', sexo: '' });
      const isEdit = ref(false);
      const route = useRoute();
      const router = useRouter();
  
      axios.defaults.baseURL = 'http://localhost:8080';
  
    const getPaciente = async (id: number) => {
      try {
        const response = await axios.get(`/paciente/new/${id}`);
        paciente.value = {
          id: response.data.id,
          nome: response.data.nome,
          especie: response.data.especie,
          sexo: response.data.sexo,
          donoId: response.data.dono?.id
        };
      } catch (error) {
        console.error("Erro ao buscar paciente:", error);
      }
  };
  
  const submitForm = async () => {
  try {
    const donoId = route.params.donoId;
    const pacienteData = {
      nome: paciente.value.nome,
      especie: paciente.value.especie,
      sexo: paciente.value.sexo,
      dono: { id: donoId },
    };
    await axios.post('/paciente/save', pacienteData);
    router.push('/pacientes');
  } catch (error) {
    console.error("Erro ao salvar paciente", error);
  }
};

  
  onMounted(() => {
  
    if (route.params.id) {
      isEdit.value = true;
      getPaciente(Number(route.params.id));
    }
  });
  
      return {
        paciente,
        isEdit,
        submitForm,
      };
    },
  });
  </script>
  