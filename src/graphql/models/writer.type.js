import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';

import * as MoviesWritersService from '../services/movies-writers.service';

var WriterType = new GraphQLObjectType({
    name: 'Writer',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        picture: { type: GraphQLString },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: async (parentValues, args) => {
                return await MoviesWritersService.getMoviesDataByWriterId(parentValues.id);
            }
        }
    })
});

export default WriterType;

import MovieType from './movie.type';
