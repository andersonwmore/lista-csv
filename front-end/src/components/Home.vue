<template>
    <v-container fluid >
      <v-row>
      <v-spacer></v-spacer>

      <v-sheet class="ma-15 rounded-lg" outlined elevation ="12" rounded width="900" min-height="500" :style="{ border: '5px solid blue'}">
       <div v-show="passo_name==='passo_a'">
       
        <div class="ma-10 text-h3 text-center">
           <span><strong> Verifique a validade de uma</strong></span><br>
           <span><strong> lista de mensagens</strong> 👍</span>
        </div>
           <br>
            <v-card class="mx-auto" max-width="380" flat>
          <v-file-input outlined :color="primary_color"
            v-model="file"
            label="Selecionar lista"
            truncate-length="30"
            accept=".csv"
            @change="readCSV($event, csvData)"
          ></v-file-input>
           </v-card>
          <div class="text-h6 text-center">
              <span><strong> Selecione um arquivo CSV para iniciar a verificação </strong></span><br>
              <span><strong> de uma lista com números e mensagens de SMS.</strong></span>
          </div>
          <br>
          <div class="text-md-body-1 text-center">
              <span> Use nosso <a href="campanha01.csv" download> modelo</a> de arquivo se você tem alguma dúvida.</span>
          </div>

       </div>

       <div v-show="passo_name==='passo_b'">
       
        <div class="ma-10 text-h3 text-center">
           <span><strong> Estamos verificando todas as </strong></span><br>
           <span><strong> mensagens em seu arquivo...</strong></span><br><br>
           <v-progress-circular indeterminate size="50"></v-progress-circular>
 
        </div>
          <br>
          <div class="text-md-body-1 text-center">
              <span> Você quer <a @click="goPasso('passo_a')"> cancelar e voltar ao início?</a></span>
          </div>
          
       </div>

    <div v-show="passo_name==='passo_c'">
       
        <div class="ma-10 text-h3 text-center">
           <span><strong> Encontramos </strong></span><span :style="{color: 'green'}"><strong>{{msg_validas.length}}</strong></span><span><strong> mensagens</strong></span><br>
           <span><strong> válidas em sua lista 🎉</strong></span>
        </div>
   
          <v-card class="ma-12">
            <v-simple-table
               fixed-header
               height="300px"
               

            >
               <template v-slot:default>
                  <thead>
                  <tr>
                     <th class="text-h6 text-left">
                        <strong>Número</strong>
                     </th>
                     <th class="text-h6 text-left">
                        <strong>Prévia da Mensagem</strong>
                     </th>
                     <th class="text-h6 text-left">
                        <strong>Resultado</strong>
                     </th>
 
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                     v-for="item in csvData"
                     :key="item.numero"
                  >
                     <td>{{ item.numero }}</td>
                     <td>{{ item.msg_resumo }}</td>
                     <td>{{ item.valido_display }}</td>

                  </tr>
                  </tbody>
               </template>
            </v-simple-table>

          </v-card>

       <div class="text-h5 text-center">
              <span><strong> Está pronto para prosseguir? </strong>🤔</span><br><br>
              <v-card-actions>
                 <v-spacer></v-spacer>
              <v-btn  x-large color="grey" outlined @click="goPasso('passo_a')"> Cancelar 
               <v-icon right dark>mdi-cancel</v-icon>
              </v-btn>
               <v-btn x-large :color="primary_color" dark  @click="enviarLista">  Salvar lista 
                  <v-icon right dark>mdi-check</v-icon>
               </v-btn>
                 <v-spacer></v-spacer>
              </v-card-actions>
              <span :style="{color: 'red'}">{{msg_erro}}</span>
          </div>
          <br>

       </div>

      <div v-show="passo_name==='passo_d'">
       
        <div class="ma-10 text-h3 text-center" >
           <span :style="{color: 'blue'}"><strong> É isso aí</strong> 🚀</span><br>
        </div>
           <br>
          <div class="text-h4 text-center">
              <span><strong> Sua lista está pronta para </strong></span><br>
              <span><strong> entrar em produção!</strong></span>
          </div>
          <br>
          <div class="text-h6 text-center">
              <span><strong> Já guardamos todas as mensagens válidas para que </strong></span><br>
              <span><strong> você possa usá-las em uma campanha no futuro.</strong></span>
          </div>
          <br>

          <div class="text-md-body-1 text-center">
              <span><a @click="goPasso('passo_a')">Voltar ao início</a> para iniciar outra verificação</span>
          </div>
   
       </div>


       </v-sheet>
      <v-spacer></v-spacer>

      </v-row>

  </v-container>

</template>

<script>
import MDService from "../store/MDataService";
export default {
   name: "home",

data() {
    return ({
      passo_name: 'passo_a',
      file_name: null,
      file: null,
      csvData: [],
      loading : false,
      msg_erro: null,
     });
  },

  computed: {
     primary_color() {
        return 'indigo'
     },
     msg_validas() {
      return this.csvData.filter(item => {
               return item.valido.indexOf('1') > -1 
              })
     },
    
  },

  methods: {

     enviarLista() {
        MDService.sendArquivo({arquivo: this.file_name, dados: JSON.stringify(this.csvData)})
        .then((response) => {
           if (response.status) {
              if (response.status === 200) {
                  this.msg_erro = null
                  this.goPasso('passo_d')
              } else {
                 this.msg_erro = 'Ops! Ocorreu um erro aqui...'
              }
           }
        })
        .catch((e) => {
         console.log(e)
        });
    },


     goPasso(value) {
        if (value === 'passo_a') {
           this.file = null
           this.loading = false
           this.csvData.length = 0
          }
        this.passo_name = value
    },

   async sleep(time) {
      return new Promise((resolve)=> setTimeout(resolve, time))
   },

    async readCSV(input, dados) {
       if (input){
            this.file_name = input.name
            this.goPasso('passo_b')
            this.loading = true
            await this.sleep(3000)
           }
      if (this.passo_name === 'passo_b'){
         this.executeCSV(input, dados, this.loading)
      }
      
     },

     executeCSV(input, dados, loading) {
       if (input) {
          let reader = new FileReader()
          reader.readAsText(input, 'utf-8')
          reader.onload = function (e) {
          let rows = e.target.result.split("\n")
          console.log(dados)
          rows.forEach(element => {
             if (!loading) {
                return
              }
              element = element.split(";")
              let valido = '0'
              let valido_display = 'inválida ❌'
              let msg_resumo = null
              if (element[0] && element[1]) {
                 if (element[1].length > 30) {
                    msg_resumo = element[1].substring(0,60) + '...' 
                 } else {
                    msg_resumo = element[1]
                 }

                  if (element[0].length === 11 && element[0].substring(3,2) === '9' && element[1].length < 161) {
                      valido = '1'
                      valido_display = 'válida ✔️'
                    }
                } 
              dados.push({'numero': element[0], 'mensagem' : element[1], 'valido' : valido, 'msg_resumo': msg_resumo, 'valido_display': valido_display})
              })
      
        }
        
       this.goPasso('passo_c')
     
       } else {
          this.goPasso('passo_a')
       }

    },

  },

mounted() {
    this.goPasso('passo_a')
  },
};

</script>
