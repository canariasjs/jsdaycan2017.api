import {
    GraphQLList,
    GraphQLInt
} from 'graphql';

import GenreType from '../models/genre.type';
import * as GenresService from '../services/genres.service';

import * as utils from '../shared/utils';

var allQuery = {
    // Tarea: Definir el resultado de devuelve esta consulta.
    // Pista: Se debe devolver una lista de objetos tipo 'GenereType'.
    type: '¿Qué debo devolver?',
    description: 'List of all stored genres.',
    resolve: async (parentValues, args) => {
        // Tarea: Obtener todos los géneros de películas.
        // Pista: En el servicio 'GenresService' hay un método asíncrono llamado 'getGenresData()'.
        return 'Devolver la información solicitada';
    }
};

var byIdQuery = {
    // Tarea: Definir el resultado de devuelve esta consulta.
    // Pista: Se debe devolver una lista de objetos tipo 'GenereType'.
    type: '¿Qué debo devolver?',
    description: 'List of all stored genres, filtered by their IDs.',
    args: {
        // Tarea: Definir el o los argumentos necesarios para obtener un determinado conjunto de Géneros según su ID.
        // Pista: Se puede recibir una lista de números enteros.
        tarea: 'Definir el argumento que va a recibir la petición'
    },
    resolve: async (parentValues, args) => {
        // Tarea: Obtener los queryParams para solicitar los datos necesarios.
        // Pista 1: Primero hay que generar los "query params".
        // Pista 2: En el servicio 'GenresService' hay un método asíncrono llamado 'getGenresData()' al que le puedes pasar los query params.
        return 'Devolver la información solicitada';
    }
};

export {
    allQuery,
    byIdQuery
};

/*
Solución (allQuery)
type: new GraphQLList(GenreType)
return await GenresService.getGenresData();

Solución (byIdQuery)
type: new GraphQLList(GenreType)
id: { type: new GraphQLList(GraphQLInt) }
let queryParams = utils.createQueryParamsString(args.id, 'id');
return await GenresService.getGenresData(queryParams);
*/