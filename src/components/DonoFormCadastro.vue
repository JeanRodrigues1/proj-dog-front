<template>
    <div>
      <h1>Cadastrar Novo Dono</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nome">Nome:</label>
          <input v-model="dono.nome" id="nome" type="text" required />
        </div>
        <div>
          <label for="cpf">CPF:</label>
          <input v-model="dono.cpf" id="cpf" type="text" required />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  interface Dono {
    nome: string;
    cpf: string;
  }
  
  export default defineComponent({
    name: 'DonoFormCadastro',
    setup() {
      const dono = ref<Dono>({ nome: '', cpf: '' });
      const router = useRouter();
      axios.defaults.baseURL = 'http://localhost:8080';
  
      const submitForm = async () => {
        try {
          await axios.post('/dono/save', dono.value);
          router.push('/donos');
        } catch (error) {
          console.error("Erro ao cadastrar dono:", error);
        }
      };
  
      return {
        dono,
        submitForm
      };
    }
  });
  </script>
  