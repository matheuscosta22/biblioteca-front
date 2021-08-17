<template>
  <div>
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a class="brand-logo center">Livros</a>
      </div>
    </nav>

       <ul>      
         <h3>Menu</h3>
         <li>
        <button>
        <a href="#/autores">Autores</a>
        </button>
         </li>
         <li>
        <button>
        <a href="#/generos">Gêneros literários</a>
        </button>
         </li>
         <li>
        <button>
        <a href="#/editoras">Editoras</a>
        </button>
         </li>
      </ul>
    <div class="container">
    <ul>
      <span class="material-icons">
      arrow_back</span><li>Você vai encontrar todas as informações que precisa nas listas ao lado</li>
    </ul>
      <form @submit.prevent="salvar">

          <label>Título</label>
          <input type="text" placeholder="Título" v-model="livro.titulo" required>
          <label>Ano de lançamento</label>
          <input type="number" placeholder="Ano de lançamento" v-model="livro.anoDeLancamento" required>
          <label>Id do autor</label>
          <input type="number" placeholder="Id do autor" v-model="livro.id_autor" required>
          <label>Id do gênero literário</label>
          <input type="number" placeholder="Id do gênero literáro" v-model="livro.id_genero" required>
          <label>Id da editora</label>
          <input type="number" placeholder="Id da editora" v-model="livro.id_editora" required>
          

          <button class="btn btn-success">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Ano de lançamento</th>
            <th>Id do Autor</th>
            <th>Id do Gênero literário</th>
            <th>Id da Editora</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="livro of livros" :key="livro.id">
            <td>{{livro.id}}</td>
            <td>{{livro.titulo}}</td>
            <td>{{livro.anoDeLancamento}}</td>
            <td>{{livro.id_autor}}</td>
            <td>{{livro.id_genero}}</td>
            <td>{{livro.id_editora}}</td>
            <td>
              <button @click="editar(livro)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(livro)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>


<script>
import Livro from '../../services/livros'
import Editora from '../../services/editoras'
import Vue from "vue"
import vSelect from "vue-select"


Vue.component("v-select", vSelect);

export default {

  data(){

   return{
       livro: {
         id: '',
         titulo: '',
         anoDeLancamento:'',
         id_autor:'',
         id_genero:'',
         id_editora:''
       },
       editoras: [],
       livros: [],
       errors: []
    } 
  },


  mounted(){
    this.listar()
    this.exibir()
  },

  methods:{

    listar(){
      Livro.listar().then(resposta => {
      this.livros = resposta.data
    })
    },

    exibir(){
      Editora.listar().then(resposta => {
      this.editoras = resposta.data
    })
    },

    salvar(){
     if(!this.livro.id){ 
      Livro.salvar(this.livro).then(resposta => {
        this.livro = {}
        alert('Salvo com sucesso')
        resposta
        this.listar()
      }).catch(e => {
        console.log(e.response.data.errors)
        this.errors = e.response.data.errors
      })
     } else {
       Livro.atualizar(this.livro).then(resposta => {
        this.livro = {}
        alert('Atualizado com sucesso')
        resposta
        this.listar()
      }).catch(e => {
        console.log(e.response.data.errors)
        this.errors = e.response.data.errors
      })
     }
    },

    editar(livro){
      this.livro = livro
    },

    remover(livro){

     if(confirm('Deseja excluir este livro?')){
        Livro.remover(livro).then(resposta => {
        resposta
        this.errors = []  
        this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
     } 
      
    
    }
  }
}
</script>


<style>

</style>