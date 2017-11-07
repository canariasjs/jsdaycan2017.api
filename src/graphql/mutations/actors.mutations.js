import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import ActorType from '../models/actor.type';
import * as ActorsService from '../services/actors.service';
import * as MoviesActorsService from '../services/movies-actors.service';

const addActor = {
    type: ActorType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLString },
        born: { type: GraphQLString },
        height: { type: GraphQLFloat },
        country: { type: GraphQLString },
        movies: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            let persistedActorData = await ActorsService.persistNewActor(args);

            if (args.movies) {
                await MoviesActorsService.addMoviesToActor(persistedActorData.id, args.movies);
            }

            return persistedActorData;
        } catch (error) {
            return error;
        }
    }
};

const updateActor = {
    type: ActorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLString },
        born: { type: GraphQLString },
        height: { type: GraphQLFloat },
        country: { type: GraphQLString }
    },
    resolve: async (parentValues, args) => {
        try {
            return await ActorsService.updateActor(args);
        } catch (error) {
            return error;
        }
    }
};

const deleteActor = {
    type: ActorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            return await ActorsService.deleteActor(args.id);
        } catch (error) {
            return error;
        }
    }
};

const addMoviesToActor = {
    type: ActorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: async (parentValues, args) => {
        try {
            let persistedActorMoviesData = await MoviesActorsService.addMoviesToActor(args.id, args.movies);

            if (persistedActorMoviesData) {
                return await ActorsService.getActorsData(args.id);
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }
};

const deleteActorMovies = {
    type: ActorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: async (parentValues, args) => {
        try {
            await MoviesActorsService.deleteActorMovies(args.id, args.movies);
            return await ActorsService.getActorsData(args.id);
        } catch (error) {
            return error;
        }
    }
};

export {
    addActor,
    updateActor,
    deleteActor,
    addMoviesToActor,
    deleteActorMovies
};