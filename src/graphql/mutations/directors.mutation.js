// Tarea 1 - Importar el Objetos Tipo que vamos a modificar.

// Tarea 2 - Importar los servicios que vamos a necesitar.
//       2.1 - Importar el servicio DirectorsService.
//       2.2 - Importar el servicio MoviesDirectorsService.

// Tarea 3 - Implementar la mutación "addDirector" que nos permitirá añadir
//           nuevos directores/as.
//           Los directores estarán definidos por un nombre, una imagen y
//           una array de enteros que representarán los ID de las películas
//           que han dirigido. Este último array puede ser vacío ([]).
//       3.1 - Definir el objeto tipo (DirectorType) que vamos a devolver.
//       3.2 - Definir los argumentos "name", "picture" y "movies" que vamos a proporcionar.
//             Pista: Los dos primeros deben ser de tipo cadena de caracteres y nunca 
//             podrán ser null mientras que el tercero, tiene que ser una lista de valores
//             enteros que sí puede ser null.
//       3.3 - Implementar el código necesario para almacenar los datos del nuevo director.

// Tarea 4 - Implementar la mutación "updateDirector" que nos permitirá actualizar
//           la información de directores/as ya existentes.
//           Para actualizar la información de un determinado director, debemos
//           proporcionar el ID de dicho director así como los campos que queremos
//           actualizar, que en este caso, sólo serán su nombre y su foto.
//       4.1 - Definir el objeto tipo (DirectorType) que vamos a devolver.
//       4.2 - Definir los argumentos "id", "name" y "picture" que vamos a proporcionar.
//             Pista: El argumento "id" debe ser de tipo entero y no podrá valer null. Por
//             otro lado, los argumentos "name" y "picture" serán de tipo cadena de caracteres 
//             y ahora sí podrán ser null.
//       4.3 - Implementar el código necesario para actualizar los datos del director.

// Tarea 5 - Implementar la mutación "deleteDirector" que nos permitirá eliminar la información
//           de un determinado director.
//           Para eliminar la información de un determinado director, debemos
//           proporcionar el ID de dicho director.
//       5.1 - Definir el objeto tipo (DirectorType) que vamos a devolver.
//       5.2 - Definir el argumento "id"que vamos a proporcionar.
//             Pista: El argumento "id" debe ser de tipo entero y no podrá valer null.
//       5.3 - Implementar el código necesario para eliminar los datos del director.

import {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

const addDirector = {
    type: 'Objeto tipo que se va a ver afectado por la mutación',
    args: {
        agumentos: 'que serán usados por la mutación'
    },
    resolve: async (parentValues, args) => {
        // Tarea 3.3 aquí.
    }
};

// const updateDirector = {
//     type: 'Objeto tipo que se va a ver afectado por la mutación',
//     args: {
//         agumentos: 'que serán usados por la mutación'
//     },
//     resolve: async (parentValues, args) => {
//         // Tarea 4.3 aquí.
//     }
// };

// const deleteDirector = {
//     type: 'Objeto tipo que se va a ver afectado por la mutación',
//     args: {
//         agumentos: 'que serán usados por la mutación'
//     },
//     resolve: async (parentValues, args) => {
//         // Tarea 4.3 aquí.
//     }
// };

// Tarea 7: Implementar la mutación 'deleteDirector'.
// var deleteDirector = {};

export {
    addDirector,
    // updateDirector,
    // deleteDirector,
    // addMoviesToDirector,
    // deleteDirectorMovies
};

/*
Solución Tarea 1
================
import DirectorType from '../models/director.type';
*/

/*
Solución Tarea 2
================
import * as DirectorsService from '../services/directors.service';
import * as MoviesDirectorsService from '../services/movies-directors.service';
*/

/*
Solución Tarea 3
================

3.1
type: DirectorType

3.2
name: { type: new GraphQLNonNull(GraphQLString) }
picture: { type: new GraphQLNonNull(GraphQLString) }
movies: { type: new GraphQLList(GraphQLInt) }

3.3
try {
    let persistedDirectorData = await DirectorsService.persistNewDirector({ name: args.name });

    if (args.movies) {
        await MoviesDirectorsService.addMoviesToDirector(persistedDirectorData.id, args.movies);
    }
    
    return persistedDirectorData;
} catch (error) {
    return error;
}
*/

/*
Solcuión Tarea 4
================

4.1
type: DirectorType

4.2
id: { type: new GraphQLNonNull(GraphQLInt) }
name: { type: GraphQLString }
picture: { type: GraphQLString }

4.3
try {
    if (!args.name && !args.picture) {
        throw new Error('Para actualizar los datos de un Director, o el nombre o la foto han de estar definidos.');
    }

    return await DirectorsService.updateDirector(args);
} catch (error) {
    return error;
}
*/

/*
Solcuión Tarea 5
================

5.1
type: DirectorType

5.2
id: { type: new GraphQLNonNull(GraphQLInt) }

5.3
try {
    return await DirectorsService.deleteDirector(args.id);
} catch (error) {
    return error;
}
*/