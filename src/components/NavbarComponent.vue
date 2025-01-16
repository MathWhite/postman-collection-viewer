<template>
  
    <v-app-bar app color="info">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Doc by Matheus</v-toolbar-title>
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

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-title>Menu Item 1</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Menu Item 2</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Menu Item 3</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
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
    }
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
