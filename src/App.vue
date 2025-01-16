<template>
  <v-app>
    <v-main>
      <NavbarComponent />
      <v-container class="d-flex flex-column justify-start align-center" style="height: 100vh; overflow-y: auto;">
        <!-- Container principal -->
        <v-card class="pa-5" outlined shaped>
          <!-- Título -->
          <v-row justify="center" class="mb-4">
            <v-col class="text-center">
              <h1>{{ collection.info.name }}</h1>
              <p>Collection of API endpoints and details for Jitterbit integration.</p>
            </v-col>
          </v-row>

          <!-- Cards expansíveis das pastas, cada pasta será uma linha -->
          <v-row class="d-flex flex-column" style="width: 100%; overflow-y: auto;">
            <v-col
              v-for="folder in collection.item"
              :key="folder.name"
              cols="12"
              class="mb-3"
            >
              <v-card>
                <v-card-title @click="folder.expanded = !folder.expanded">
                  <v-icon>mdi-folder</v-icon> {{ folder.name }}
                </v-card-title>
                <v-card-text v-show="folder.expanded">
                  <!-- Exibe as requisições dentro da pasta -->
                  <div v-for="request in folder.item" :key="request.name" class="request-details">
                    <h2>{{ request.name }}</h2>
                    <p><strong>Method:</strong> {{ request.request.method }}</p>
                    <p><strong>URL:</strong> <code>{{ formatPath(request.request.url.path) }}</code></p>

                    <v-card>
                      <v-card-title>
                        <v-tabs v-model="folder.activeTab" align="centered">
                          <v-tab>Parameters</v-tab>
                          <v-tab>Headers</v-tab>
                        </v-tabs>
                      </v-card-title>

                      <!-- Conteúdo dinâmico com base na tab selecionada -->
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" md="4">
                            <span>Name</span>
                          </v-col>                          
                          <v-col cols="12" md="4">
                            <span>Value</span>
                          </v-col>
                        </v-row>                       
                        <v-divider class="border-opacity-50 mt-5"></v-divider>   

                        <v-row v-if="folder.activeTab === 0 && request.request.url?.query?.length > 0">
                          <v-col                         
                            v-for="query in request.request.url.query"
                            :key="query.key"
                            cols="12"
                            class="mb-3"
                          >
                            <p><strong>{{ query.key }}:</strong> {{ query.value }}</p>
                          </v-col>
                        </v-row>
                        <v-row v-if="folder.activeTab === 1 && request.request.header?.length > 0">
                          <v-col                         
                            v-for="head in request.request.header"
                            :key="head.key"
                            cols="12"
                            class="mb-3"
                          >
                            <p><strong>{{ head.key }}:</strong> {{ head.value }}</p>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <!-- Condições para exibir o corpo da requisição e cURL -->
                    <div v-if="request.request?.body && request.request?.body?.raw">
                      <h3>Request Body</h3>
                      <pre>{{ request.request.body.raw }}</pre>
                    </div>     
                    <div v-if="request.request">
                      <h3>cURL</h3>
                      <pre>{{ generateCurl(request.request) }}</pre>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import postman from './assets/postman-collection.json';

export default {
  name: 'App',

  components: {
    NavbarComponent,
  },
  data: () => ({
    collection: postman,
  }),
  methods: {
    // Método para gerar o cURL a partir da requisição
    generateCurl(request) {
      const { method, url, header, body } = request;
      let curl = `curl -X ${method} "${url.raw}"`;

      if (header) {
        header.forEach((header) => {
          curl += ` -H "${header.key}: ${header.value}"`;
        });
      }

      if (body && body.raw) {
        curl += ` -d '${body.raw}'`;
      }

      return curl;
    },

    // Método para formatar o caminho da URL
    formatPath(paths) {
      return paths.join('/');
    },
  },
};
</script>

<style scoped>
.v-card {
  width: 100%;
  max-width: 800px;
  margin-top: 10px;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  padding-top: 20px;
  overflow-y: auto;
}

.v-card-title {
  cursor: pointer;
}

.v-card-text {
  max-height: 300px;
  overflow-y: auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 20px;
  color: #333;
}

h3 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 15px;
  color: #3f51b5;
}

p {
  font-size: 1rem;
  margin: 5px 0;
  color: #555;
}

code {
  font-family: "Courier New", Courier, monospace;
  background-color: #f4f4f4;
  padding: 5px;
  border-radius: 4px;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.request-details {
  margin-bottom: 20px;
}

.v-row {
  width: 100%;
}
</style>
