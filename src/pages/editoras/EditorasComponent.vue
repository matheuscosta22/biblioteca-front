<template>
    <div>
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a class="brand-logo center">Editoras</a>
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
        <a href="#/livros">Livros</a>
        </button>
         </li>
      </ul>
    <div class="container">
    
      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="editora.nome" required>
          
          
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

          <tr v-for="editora of editoras" :key="editora.id">
            <td>{{editora.id}}</td>
            <td>{{editora.nome}}</td>
            <td>
              <button @click="editar(editora)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(editora)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Editora from '../../services/editoras'
export default {

  data(){
   return{
       editora: {
         id: '',
         nome: ''
       },

       editoras: [],
       errors: []
    } 
  },

  mounted(){
    this.listar()
  },

  methods:{

    listar(){
      Editora.listar().then(resposta => {
      this.editoras = resposta.data
    })
    },

    salvar(){
     if(!this.editora.id){ 
      Editora.salvar(this.editora).then(resposta => {
        this.editora = {}
        alert('Salvo com sucesso')
        resposta
        this.listar()
      }).catch(e => {
        console.log(e.response.data.errors)
        this.errors = e.response.data.errors
      })
     } else {
       Editora.atualizar(this.editora).then(resposta => {
        this.editora = {}
        alert('Atualizado com sucesso')
        resposta
        this.listar()
      }).catch(e => {
        console.log(e.response.data.errors)
        this.errors = e.response.data.errors
      })
     }
    },

    editar(editora){
      this.editora = editora
    },

    remover(editora){

     if(confirm('Deseja excluir esta editora?')){
        Editora.remover(editora).then(resposta => {
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