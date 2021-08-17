<template>
    <div>
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a class="brand-logo center">Gêneros literários</a>
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
        <a href="#/editoras">Editoras</a>
        </button>
         </li>
         <li>
        <button>
        <a href="#/livros">Livros</a>
        </button>
         </li>
      </ul>
    <div class="container">
    
      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="genero.nome" required>
          
          
          <button class="btn btn-success">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Id</th>
            <th>Nome</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="genero of generos" :key="genero.id">
            <td>{{genero.id}}</td>
            <td>{{genero.nome}}</td>
            <td>
              <button @click="editar(genero)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(genero)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Genero from '../../services/generos'
export default {

  data(){
   return{
       genero: {
         id: '',
         nome: ''
       },

       generos: [],
       errors: []
    } 
  },

  mounted(){
    this.listar()
  },

  methods:{

    listar(){
      Genero.listar().then(resposta => {
      this.generos = resposta.data
    })
    },

    salvar(){
     if(!this.genero.id){ 
      Genero.salvar(this.genero).then(resposta => {
        this.genero = {}
        alert('Salvo com sucesso')
        resposta
        this.listar()
      }).catch(e => {
        console.log(e.response.data.errors)
        this.errors = e.response.data.errors
      })
     } else {
       Genero.atualizar(this.genero).then(resposta => {
        this.genero = {}
        alert('Atualizado com sucesso')
        resposta
        this.listar()
      }).catch(e => {
        console.log(e.response.data.errors)
        this.errors = e.response.data.errors
      })
     }
    },

    editar(genero){
      this.genero = genero
    },

    remover(genero){

     if(confirm('Deseja excluir este gênero literário?')){
        Genero.remover(genero).then(resposta => {
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

<style scoped>

</style>