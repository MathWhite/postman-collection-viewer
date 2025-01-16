<template>
  <v-app>
    <v-main>
      <NavbarComponent />
      <v-container class="d-flex flex-column justify-start align-center" style="height: 100vh; overflow-y: auto;">
        <!-- Container principal -->
        <v-card color="secondary" class="pa-2" outlined style="width: 100%; max-width: none;">
          <!-- Título -->
          <v-row justify="center" class="mb-4">
            <v-col class="text-center">
              <v-typography color="text" class="text-h1">Postman Collection Viewer</v-typography>
              <v-typography color="text">by ~Matheus Carvalho</v-typography>
            </v-col>
          </v-row>

          <!-- Cards expansíveis das pastas, cada pasta será uma linha -->
          <v-row class="d-flex flex-column" style="width: 100%; overflow-y: auto;">
            <v-col
              v-for="folder in collection.item"
              :key="folder.name"
              cols="12"
              class="ma-0"
            >
              <v-card color="primary" class="ma-0" style="min-width: 100%;">
                <v-card-title @click="colapseAll(folder)">
                  <v-icon>mdi-folder</v-icon> 
                  <v-typography color="text" class="ml-2">{{ folder.name }}</v-typography>
                </v-card-title>
                <v-card-text v-show="folder.expanded" style="min-height: fit-content;">
                  <!-- Exibe as requisições dentro da pasta -->
                  <div v-for="request in folder.item" :key="request.name" class="request-details">
                    
                    <v-divider class="border-opacity-50 mt-6 mb-4"></v-divider>   
                    <v-typography color="text" class="text-h4">{{ request.name }}</v-typography>
                    <v-row class="ma-0">
                      <v-col class="pa-1">
                        <v-typography color="text"><strong>Method:</strong> {{ request.request.method }}</v-typography>
                      </v-col>
                    </v-row>
                    <v-row class="ma-0">
                      <v-col class="pa-1">
                        <v-typography color="text"><strong>URL: </strong></v-typography>
                        <v-code>{{ formatPath(request.request.url.path) }}</v-code>
                      </v-col>
                    </v-row>
                    <v-card class="mt-3" style="min-width: 100%;">
                      <v-card-title class="pa-0 pl-2 pb-4">
                        <v-tabs v-model="request.activeTab" align="centered">
                          <v-tab color="text">Parameters</v-tab>
                          <v-tab color="text">Headers</v-tab>
                        </v-tabs>
                      </v-card-title>

                      <!-- Conteúdo dinâmico com base na tab selecionada -->
                      <v-card-text style="min-height: fit-content;">
                        <v-row>
                          <v-col cols="12" md="4">
                            <v-typography color="text"><strong>Name</strong></v-typography>
                          </v-col>                          
                          <v-col cols="12" md="4">
                            <v-typography color="text"><strong>Value</strong></v-typography>
                          </v-col>
                        </v-row>                       
                        <v-divider class="border-opacity-50 mt-1 mb-3"></v-divider>   
                        <v-row v-if="request.activeTab === 0 && request.request.url?.query?.length > 0">
                          <v-col                         
                            v-for="query in request.request.url.query"
                            :key="query.key"
                            cols="12"
                            md="12"
                          >
                          <v-row>
                            <v-col cols="12" md="4">
                              <v-typography color="text"><strong>{{ query.key }}</strong></v-typography>
                            </v-col>
                            <v-col cols="12" md="4">
                              <v-code class="ml-2">{{ query.value }}</v-code>
                            </v-col>
                          </v-row>
                          </v-col>
                        </v-row>
                        <v-row v-if="request.activeTab === 1 && request.request.header?.length > 0">
                          <v-col                         
                            v-for="head in request.request.header"
                            :key="head.key"
                            cols="12"
                            md="12"
                          >
                            <v-row>
                              <v-col cols="12" md="4">
                                <v-typography color="text"><strong>{{ head.key }}</strong></v-typography>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-code class="ml-2">{{ head.value }}</v-code>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <!-- Condições para exibir o corpo da requisição e cURL -->
                    <div v-if="request.request?.body && request.request?.body?.raw">
                      <v-divider class="border-opacity-50 mt-6 mb-4"></v-divider> 
                      <v-typography color="text" class="text-h6">Request Body</v-typography>
                      <v-textarea
                        v-model="request.request.body.raw"
                        readonly
                        variant="solo-filled"
                        :rows="4"
                      />
                    </div>     
                    <div v-if="request.request">
                      <v-typography color="text" class="text-h6">cURL</v-typography>
                      <v-textarea
                        :value="generateCurl(request.request)"
                        readonly
                        variant="solo-filled"
                        :rows="4"
                      />
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
  
  data() {
    return {
      collection: postman,
      bodyLength: 4,
    }    
  },

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
    colapseAll(folder) {
      this.collection.item.map((n) => n === folder ? null : n.expanded = false);
      
      folder.expanded = !folder.expanded
    }
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
.request-details {
  margin-bottom: 0px;
}

.v-row {
  width: 100%;
}
</style>
