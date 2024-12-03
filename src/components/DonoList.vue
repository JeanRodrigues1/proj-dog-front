<template>
  <div>
    <h1>Lista de Donos</h1>
    <!-- Botão para navegar até a página de cadastro de novo dono -->
    <button @click="goToNewDono">Adicionar Novo Dono</button>

    <!-- Lista de donos -->
    <div v-for="dono in donos" :key="dono.id" class="dono-item">
      <h3>{{ dono.nome }}</h3>
      <p>{{ dono.cpf }}</p>
      <button @click="goToEditDono(dono.id)">Editar</button>
      <button @click="deleteDono(dono.id)">Excluir</button>
      <button @click="goToAddPaciente(dono.id)">Cadastrar Pet</button>
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
  cpf: string;
}

export default defineComponent({
  name: 'DonoList',
  setup() {
    const donos = ref<Dono[]>([]); // Definir o tipo correto aqui
    const router = useRouter();

    // Definir a base URL para o axios
    axios.defaults.baseURL = 'http://localhost:8080'; // Defina o URL do back-end

    const getDonos = async () => {
      try {
        const response = await axios.get('/dono/all');
        donos.value = response.data; // A resposta deve ser um array de Dono
      } catch (error) {
        console.error(error);
      }
    };

    // Função para navegar até a tela de cadastro de um novo dono
    const goToNewDono = () => {
      router.push('/donos/new'); // Redireciona para a rota de cadastro de novo dono
    };

    // Função para editar um dono
    const goToEditDono = (id: number) => {
      router.push(`/dono/update/${id}`); // Rota para editar dono
    };

    // Função para excluir um dono
    const deleteDono = async (id: number) => {
      try {
        await axios.delete(`/dono/${id}`);
        getDonos(); // Atualizar a lista após a exclusão
      } catch (error) {
        console.error(error);
      }
    };

    // Função para navegar até a tela de cadastro de um pet para um dono específico
    const goToAddPaciente = (donoId: number) => {
      router.push(`/paciente/new/${donoId}`);
    };

    onMounted(getDonos); // Buscar donos quando o componente for montado

    return {
      donos,
      goToNewDono,
      goToEditDono,
      deleteDono,
      goToAddPaciente
    };
  }
});
</script>

<style scoped>
.dono-item {
  margin: 1em 0;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
