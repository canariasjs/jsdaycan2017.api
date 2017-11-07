import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import MovieType from '../models/movie.type';

import * as MoviesService from '../services/movies.service';
import * as MoviesDirectorsService from '../services/movies-directors.service';
import * as MoviesWritersService from '../services/movies-writers.service';
import * as MoviesActorsService from '../services/movies-actors.service';
import * as MoviesGenresService from '../services/movies-genres.service';

import * as CommonService from '../services/common.service';

const COPLEX_MOVIE_FIELDS = [
    'directors',
    'writers',
    'actors',
    'genres'
];

const PROCESS_COMPLEX_MOVIE_FIELDS = {
    'directors': { persist: (movieId, directorsIds) => { return MoviesDirectorsService.addDirectorsToMovie(movieId, directorsIds); } },
    'writers': { persist: (movieId, writersIds) => { return MoviesWritersService.addWritersToMovie(movieId, writersIds); } },
    'actors': { persist: (movieId, actorsIds) => { return MoviesActorsService.addActorsToMovie(movieId, actorsIds); } },
    'genres': { persist: (movieId, genresIds) => { return MoviesGenresService.addGenresToMovie(movieId, genresIds); } }
};

const addMovie = {
    type: MovieType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        poster_image: { type: GraphQLString },
        duration: { type: GraphQLInt },
        rating: { type: GraphQLFloat },
        classification: { type: GraphQLString },
        year: { type: GraphQLString },
        directors: { type: new GraphQLList(GraphQLInt) },
        writers: { type: new GraphQLList(GraphQLInt) },
        actors: { type: new GraphQLList(GraphQLInt) },
        genres: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            let movieBasicFieldsObject = _getMovieBasicFieldsAsObject(args);
            let movieComplexFields = _getMovieComplexFieldsAsObject(args);

            let persistedMovieData = await MoviesService.persistNewMovie(movieBasicFieldsObject);

            if (movieComplexFields) {
                let persistedComplexFields = await Object.keys(movieComplexFields).map(async (fieldName) => {
                    return await PROCESS_COMPLEX_MOVIE_FIELDS[fieldName]
                        .persist(persistedMovieData.id, movieComplexFields[fieldName]);
                });

                await CommonService.runAllAsyncRequests(persistedComplexFields, '(runAllAsyncRequests) - Persisting movie complex fields');
            } 

            return persistedMovieData;
        } catch (error) {
            return error;
        }
    }
};

const _getMovieBasicFieldsAsObject = (rawFields) => {
    let obtainedFiedlNames = Object.keys(rawFields).filter((fieldName) => {
        return COPLEX_MOVIE_FIELDS.indexOf(fieldName) < 0;
    });

    return _getFieldsContent(rawFields, obtainedFiedlNames);
};

const _getMovieComplexFieldsAsObject = (rawFields) => {
    let obtainedFiedlNames = Object.keys(rawFields).filter((fieldName) => {
        return COPLEX_MOVIE_FIELDS.indexOf(fieldName) >=0;
    });
    
    return _getFieldsContent(rawFields, obtainedFiedlNames);
};

const _getFieldsContent = (rawFields, selectedFields) => {
    return selectedFields.reduce((previousValue, currentValue) => {
        previousValue[currentValue] = rawFields[currentValue];
        return previousValue;
    }, {});
};

const updateMovie = {
    type: MovieType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        poster_image: { type: GraphQLString },
        duration: { type: GraphQLInt },
        rating: { type: GraphQLFloat },
        classification: { type: GraphQLString },
        year: { type: GraphQLString }
    },
    resolve: async (parentValues, args) => {
        try {
            return await MoviesService.updateMovie(args);
        } catch (error) {
            return error;
        }
    }
};

const deleteMovie = {
    type: MovieType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            return await MoviesService.deleteMovie(args.id);
        } catch (error) {
            return error;
        }
    }
};

export {
    addMovie,
    updateMovie,
    deleteMovie
};