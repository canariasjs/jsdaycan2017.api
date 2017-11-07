// Tarea 1 - Definir el campo "directors" para obtener los directores de la película.
//       1.1 - Importar los servicios que nos permiten obtener las relaciones
//             entre películas y directores.
//       1.2 - Importar el objeto tipo "DirectorType".
//       1.3 - Implementar el campo "directors" en la definición de "MovieType"
//             así como su función "resolve".
//       1.4 - Devolver los directores de la película seleccionada.

// Tarea 2 - Definir el campo "writers" para obtener los guionistas de la película.
//       2.1 - Importar los servicios que nos permiten obtener las relaciones
//             entre películas y guionistas.
//       2.2 - Importar el objeto tipo "WriterType".
//       2.3 - Implementar el campo "writers" en la definición de "MovieType"
//             así como su función "resolve".
//       2.4 - Devolver los guionistas de la película seleccionada.

// Tarea 3 - Definir el campo "actors" para obtener los actores y actrices de la película.
//       3.1 - Importar los servicios que nos permiten obtener las relaciones
//             entre películas y actores/actrices.
//       3.2 - Importar el objeto tipo "ActorType".
//       3.3 - Implementar el campo "actors" en la definición de "MovieType"
//             así como su función "resolve".
//       3.4 - Devolver los actores y actrices de la película seleccionada.

// Desafío 1 - Definir el campo "genres" para obtener los géneros de la película.

// Desafío 2 - Definir el campo "genresAsArray" para obtener los géneros de la película
//             en formato array de cadenas, conteniendo únicamente los nombre de los géneros.

import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} from 'graphql';

var MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        poster_image: { type: GraphQLString },
        duration: { type: GraphQLInt },
        rating: { type: GraphQLFloat },
        classification: { type: GraphQLString },
        year: { type: GraphQLString }
    })
});

export default MovieType;


/*
Solcuión Tarea 1
================
1.1
import * as MoviesDirectorsService from '../services/movies-directors.service';

1.2
import DirectorType from './director.type';

1.3
directors: {
    type: new GraphQLList(DirectorType),
    resolve: async (parentValues, args) => {
        
    }
}

1.4
directors: {
    type: new GraphQLList(DirectorType),
    resolve: async (parentValues, args) => {
        return await MoviesDirectorsService.getDirectorsDataByMovieId(parentValues.id);
    }
}
*/

/*
Solcuión Tarea 2
================
2.1
import * as MoviesWritersService from '../services/movies-writers.service';

2.2
import WriterType from './writer.type';

2.3
writers: {
    type: new GraphQLList(WriterType),
    resolve: async (parentValues, args) => {
        
    }
}

2.4
writers: {
    type: new GraphQLList(WriterType),
    resolve: async (parentValues, args) => {
        return await MoviesWritersService.getWritersDataByMovieId(parentValues.id);
    }
}
*/

/*
Solcuión Tarea 3
================
3.1
import * as MoviesActorsService from '../services/movies-actors.service';

3.2
import ActorType from './actor.type';

3.3
actors: {
    type: new GraphQLList(ActorType),
    resolve: async (parentValues, args) => {

    }
}

3.4
actors: {
    type: new GraphQLList(ActorType),
    resolve: async (parentValues, args) => {
        return await MoviesActorsService.getActorsDataByMovieId(parentValues.id);
    }
}
*/
