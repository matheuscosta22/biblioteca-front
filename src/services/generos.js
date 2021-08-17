import { http } from './config'

export default {
    listar:() => {
        return http.get('generos')
    }, 

    salvar:(genero) => {
        return http.post('generos', genero)
    },


    atualizar:(genero) => {
        return http.put('generos/'+ genero.id, genero)
    },

    remover:(genero) => {
        return http.delete('generos/'+ genero.id, { data: genero})
    }

}