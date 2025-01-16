<template>
  
    <v-app-bar app color="info">
      <v-btn 
        icon
        @click="redirectToIn"
      >
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
      <v-btn 
        icon
        @click="redirectToGit"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-spacer />
      <div class="d-flex align-center">
        <v-switch
          v-model="isDarkTheme"
          @change="toggleTheme"
          class="mt-6 mr-2"
        />
        <v-icon class="ml-2 mr-5">{{ isDarkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </div>
    </v-app-bar>
  
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      isDarkTheme: localStorage.getItem('selectedTheme') === 'dark',
    };
  },
  methods: {
    toggleTheme() {
      const newTheme = this.isDarkTheme ? 'dark' : 'light';
      this.$vuetify.theme.global.name = newTheme; // Altera o tema global do Vuetify
      localStorage.setItem('selectedTheme', newTheme); // Atualiza o tema no localStorage
    },
    redirectToIn() {
      window.open("https://www.linkedin.com/in/matheus-carvalho-4639a5170/", "_blank"); // Abre em uma nova aba
    },
    redirectToGit() {
      window.open("https://github.com/MathWhite/postman-collection-viewer/", "_blank"); // Abre em uma nova aba
    },
  },
  mounted() {
    // Define o tema inicialmente ao montar o componente
    this.$vuetify.theme.global.name = this.isDarkTheme ? 'dark' : 'light';
  }
};
</script>

<style>
/* Adicione seus estilos personalizados aqui */
</style>
