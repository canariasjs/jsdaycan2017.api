import { GraphQLSchema } from 'graphql';

// Tarea 1: Importar el MutationType.

import RootQueryType from './queries/root.query';

export default new GraphQLSchema({
    // Tarea 2: Definit el campo 'mutation'.
    query: RootQueryType
});

/*
Solución Tarea 1
import MutationType from './mutations/mutation';

Solución Tarea 2
mutation: MutationType
*/