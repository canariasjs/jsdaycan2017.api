import {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import WriterType from '../models/writer.type';

import * as WritersService from '../services/writers.service';
import * as MoviesWritersService from '../services/movies-writers.service';

const addWriter = {
    type: WriterType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLString },
        movies: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            let persistedWriterData = await WritersService.persistNewWriter(args);

            if (args.movies) {
                await MoviesWritersService.addMoviesToWriter(persistedWriterData.id, args.movies);
            }
            
            return persistedWriterData;
        } catch (error) {
            return error;
        }
    }
};

const updateWriter = {
    type: WriterType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLString }
    },
    resolve: async (parentValues, args) => {
        try {
            return await WritersService.updateWriter(args);
        } catch (error) {
            return error;
        }
    }
};

const deleteWriter = {
    type: WriterType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            return await WritersService.deleteWriter(args.id);
        } catch (error) {
            return error;
        }
    }
};

const addMoviesToWriter = {
    type: WriterType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: async (parentValues, args) => {
        try {
            let persistedWriterMoviesData = MoviesWritersService.addMoviesToWriter(args.id, args.movies);

            if (persistedWriterMoviesData) {
                return await WritersService.getWritersData(args.id);
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }
};

const deleteWriterMovies = {
    type: WriterType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: async (parentValues, args) => {
        try {
            await MoviesWritersService.deleteWriterMovies(args.id, args.movies);
            return await WritersService.getWritersData(args.id);
        } catch (error) {
            return error;
        }
    }
};

export {
    addWriter,
    updateWriter,
    deleteWriter,
    addMoviesToWriter,
    deleteWriterMovies
};