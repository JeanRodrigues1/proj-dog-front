<template>
    <div>
      <h1>{{ isEdit ? 'Editar Dono' : 'Novo Dono' }}</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nome">Nome:</label>
          <input v-model="dono.nome" id="nome" type="text" required />
        </div>
        <div>
          <label for="cpf">CPF:</label>
          <input v-model="dono.cpf" id="cpf" type="text" required />
        </div>
        <button type="submit">{{ isEdit ? 'Atualizar' : 'Salvar' }}</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios'; // Importando axios diretamente
  import { useRoute, useRouter } from 'vue-router';
  
  interface Dono {
    id: number;
    nome: string;
    cpf: string;
  }
  
  export default defineComponent({
    name: 'DonoForm',
    setup() {
      const dono = ref<Dono>({ id: 0, nome: '', cpf: '' });
      const isEdit = ref(false);
      const route = useRoute();
      const router = useRouter();
      axios.defaults.baseURL = 'http://localhost:8080';
  
      // const getDono = async (id: number) => {
      //   try {
      //     const response = await axios.get(`/dono/${id}`);
      //     dono.value = response.data;
      //   } catch (error) {
      //     console.error("Erro ao buscar paciente:", error);
      //   }
      // };
  
      const submitForm = async () => {
        try {
            await axios.put(`/dono/update/${route.params.id}`, dono.value);
            router.push('/donos')
        } catch (error) {
          console.error(error);
        }
      };
  
      return {
        dono,
        isEdit,
        submitForm
      };
    }
  });
  </script>
  