import {
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import ActorType from '../models/actor.type';
import * as ActorsService from '../services/actors.service';

import * as utils from '../shared/utils';

var allQuery = {
    type: new GraphQLList(ActorType),
    description: 'List of all stored actors.',
    resolve: async (parentValues, args) => {
        return await ActorsService.getActorsData();
    }
};

var byIdQuery = {
    type: new GraphQLList(ActorType),
    description: 'List of all stored actors and actresses, filtered by their IDs.',
    args: {
        id: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        let queryParams = utils.createQueryParamsString(args.id, 'id');
        return await ActorsService.getActorsData(queryParams);
    }
};

export {
    allQuery,
    byIdQuery
};