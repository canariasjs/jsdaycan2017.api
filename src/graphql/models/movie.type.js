import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList
} from 'graphql';

import * as MoviesDirectorsService from '../services/movies-directors.service';
import * as MoviesWritersService from '../services/movies-writers.service';
import * as MoviesActorsService from '../services/movies-actors.service';
import * as MoviesGenresService from '../services/movies-genres.service';

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        poster_image: { type: GraphQLString },
        duration: { type: GraphQLInt },
        rating: { type: GraphQLFloat },
        classification: { type: GraphQLString },
        year: { type: GraphQLString },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve: async (parentValues, args) => {
                return await MoviesDirectorsService.getDirectorsDataByMovieId(parentValues.id);
            }
        },
        writers: {
            type: new GraphQLList(WriterType),
            resolve: async (parentValues, args) => {
                return await MoviesWritersService.getWritersDataByMovieId(parentValues.id);
            }
        },
        actors: {
            type: new GraphQLList(ActorType),
            resolve: async (parentValues, args) => {
                return await MoviesActorsService.getActorsDataByMovieId(parentValues.id);
            }
        },
        genres: {
            type: new GraphQLList(GenreType),
            resolve: async (parentValues, args) => {
                return await MoviesGenresService.getGenresDataByMovieId(parentValues.id);
            }
        },
        genresAsArray: {
            type: new GraphQLList(GraphQLString),
            resolve: async (parentValues, args) => {
                let genres = await MoviesGenresService.getGenresDataByMovieId(parentValues.id);
                return genres.map(genre => genre.name);
            }
        }
    })
});

export default MovieType;

import DirectorType from './director.type';
import WriterType from './writer.type';
import ActorType from './actor.type';
import GenreType from './genre.type';