<template>
  <div>
    <h1>{{ isEdit ? 'Editar Pet' : 'Novo Pet' }}</h1>
    <form @submit.prevent="submitForm">
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
}

export default defineComponent({
  name: 'PacienteForm',
  setup() {
    const paciente = ref<Paciente>({ nome: '', especie: '', sexo: '' });
    const isEdit = ref(false);
    const route = useRoute();
    const router = useRouter();

    axios.defaults.baseURL = 'http://localhost:8080';

    // Função para buscar o paciente a ser editado
    const getPaciente = async (id: number) => {
      try {
        const response = await axios.get(`/paciente/update/${id}`);
        paciente.value = {
          id: response.data.id,
          nome: response.data.nome,
          especie: response.data.especie,
          sexo: response.data.sexo,
        };
      } catch (error) {
        console.error("Erro ao buscar paciente:", error);
      }
    };

    // Função para submeter o formulário e atualizar o paciente
    const submitForm = async () => {
      try {
        const pacienteData = {
          nome: paciente.value.nome,
          especie: paciente.value.especie,
          sexo: paciente.value.sexo,
        };
        // Atualiza o paciente
        await axios.put(`/paciente/update/${route.params.id}`, pacienteData);
        router.push('/pacientes');
      } catch (error) {
        console.error("Erro ao salvar paciente", error);
      }
    };

    // Ao montar o componente, verifica se estamos editando um paciente
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
