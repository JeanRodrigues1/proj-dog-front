<template>
  <div id="app">
    <header>
      <h1>ProjDog Petshop</h1>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/donos">Donos</router-link></li>
          <li><router-link to="/pacientes">Pacientes</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <!-- A área onde as views serão carregadas dependendo da navegação -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style scoped>
/* Estilos específicos do App.vue, se necessário */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

header {
  background-color: #42b983;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  display: flex;
  gap: 10px;
}

nav li {
  display: inline-block;
}
</style>
