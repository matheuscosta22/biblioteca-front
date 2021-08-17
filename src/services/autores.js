import { http } from './config'

export default {
    listar:() => {
        return http.get('autores')
    }, 

    salvar:(autor) => {
        return http.post('autores', autor)
    },


    atualizar:(autor) => {
        return http.put('autores/'+ autor.id, autor)
    },

    remover:(autor) => {
        return http.delete('autores/'+ autor.id, { data: autor})
    }

}