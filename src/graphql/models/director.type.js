// Tarea 1 - Importar los servicios que nos permiten obtener las relaciones
//           entre películas y directores.
// Tarea 2 - Importar el objeto tipo "MovieType".
// Tarea 3 - Implementar el campo "movies" en la definición de "DirectorType"
//           y comprobar que en el atributo "args" de la función "resolve"
//           obtenemos el ID del director en cuestión.
// Tarea 4 - Devolver las películas del director seleccionado.

import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

var DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        picture: { type: GraphQLString }
    })
});

export default DirectorType;

/*
Solcuión Tarea 1
import * as MoviesDirectorsService from '../services/movies-directors.service';

Solcuión Tarea 2
import MovieType from './movie.type';

Solcuión Tarea 3
movies: {
    type: new GraphQLList(MovieType),
    resolve: async (parentValues, args) => {
        console.log(`parentValues: ${JSON.stringify(parentValues)`);
        return [];
    }
}

Solcuión Tarea 4
resolve: async (parentValues, args) => {
    return await MoviesDirectorsService.getMoviesDataByDirectorId(parentValues.id);
}
*/
