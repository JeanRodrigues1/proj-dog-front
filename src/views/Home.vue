<template>
    <div>
      <h1>Bem-vindo ao ProjDog</h1>
      <p>Escolha uma das opções abaixo:</p>
      <div>
        <router-link to="/donos">Ver Donos</router-link>
      </div>
      <div>
        <router-link to="/pacientes">Ver Pets</router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'Home'
  };
  </script>
  
  <style scoped>
  h1 {
    color: #4CAF50;
  }
  p {
    font-size: 1.2em;
  }
  div {
    margin: 10px 0;
  }
  </style>
  