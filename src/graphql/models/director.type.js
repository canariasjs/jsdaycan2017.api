import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';

import * as MoviesDirectorsService from '../services/movies-directors.service';

var DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        picture: { type: GraphQLString },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: async (parentValues, args) => {
                return await MoviesDirectorsService.getMoviesDataByDirectorId(parentValues.id);
            }
        }
    })
});

export default DirectorType;

import MovieType from './movie.type';