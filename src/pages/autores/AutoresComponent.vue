<template>
    <div>
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a class="brand-logo center">Autores</a>
      </div>
    </nav>

       <ul>      
         <h3>Menu</h3>
         <li>
        <button>
        <a href="#/">Livros</a>
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
    
      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="autor.nome" required>
          <label>Ano de nascimento</label>
          <input type="number" placeholder="Ano de nascimento" v-model="autor.anoDeNascimento" required>
          <label>Sexo</label>
          <div class="input-field"> 
            <select v-model="autor.sexo" class="browser-default" required>
              <option>Masculino</option>
              <option>Feminino</option>
              <option>Outros</option>
            </select>
          </div>
          <label>Nacionalidade</label>
          <input type="text" placeholder="Nacionalidade" v-model="autor.nacionalidade" required>
          
          

          <button class="btn btn-success">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ano de nascimento</th>
            <th>Sexo</th>
            <th>Nacionalidade</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="autor of autores" :key="autor.id">
            <td>{{autor.id}}</td>
            <td>{{autor.nome}}</td>
            <td>{{autor.anoDeNascimento}}</td>
            <td>{{autor.sexo}}</td>
            <td>{{autor.nacionalidade}}</td>
            <td>
              <button @click="editar(autor)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(autor)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>
import Autor from '../../services/autores'
export default {

  data(){
   return{
       autor: {
         id: '',
         nome: '',
         anoDeNascimento:'',
         sexo:'',
         nacionalidade:''
       },

       autores: [],
       errors: []
    } 
  },

  mounted(){
    this.listar()
  },

  methods:{

    listar(){
      Autor.listar().then(resposta => {
      this.autores = resposta.data
    })
    },

    salvar(){
     if(!this.autor.id){ 
      Autor.salvar(this.autor).then(resposta => {
        this.autor = {}
        alert('Salvo com sucesso')
        resposta
        this.listar()
      }).catch(e => {
        console.log(e.response.data.errors)
        this.errors = e.response.data.errors
      })
     } else {
       Autor.atualizar(this.autor).then(resposta => {
        this.autor = {}
        alert('Atualizado com sucesso')
        resposta
        this.listar()
      }).catch(e => {
        console.log(e.response.data.errors)
        this.errors = e.response.data.errors
      })
     }
    },

    editar(autor){
      this.autor = autor
    },

    remover(autor){

     if(confirm('Deseja excluir este autor?')){
        Autor.remover(autor).then(resposta => {
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
