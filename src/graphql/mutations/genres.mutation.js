import {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import GenreType from '../models/genre.type';
import * as GenresService from '../services/genres.service';
import * as MoviesGenresService from '../services/movies-genres.service';

const addGenre = {
    type: GenreType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        movies: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            let persistedGenreData = await GenresService.persistNewGenre({ name: args.name });

            if (args.movies) {
                await MoviesGenresService.addMoviesToGenre(persistedGenreData.id, args.movies);
            }

            return persistedGenreData;
        } catch (error) {
            return error;
        }
    }
};

const updateGenre = {
    type: GenreType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parentValues, args) => {
        try {
            return await GenresService.updateGenre(args);
        } catch (error) {
            return error;
        }
    }
};

const deleteGenre = {
    type: GenreType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            return await GenresService.deleteGenre(args.id);
        } catch (error) {
            return error;
        }
    }
};

const addMoviesToGenre = {
    type: GenreType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: async (parentValues, args) => {
        try {
            let persistedGenreMoviesData = MoviesGenresService.addMoviesToGenre(args.id, args.movies);

            if (persistedGenreMoviesData) {
                return await GenresService.getGenresData(args.id);
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }
};

const deleteGenreMovies = {
    type: GenreType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: async (parentValues, args) => {
        try {
            await MoviesGenresService.deleteGenreMovies(args.id, args.movies);
            return await GenresService.getGenresData(args.id);
        } catch (error) {
            return error;
        }
    }
};

export {
    addGenre,
    updateGenre,
    deleteGenre,
    addMoviesToGenre,
    deleteGenreMovies
};