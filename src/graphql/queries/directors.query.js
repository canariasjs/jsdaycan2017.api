import {
    GraphQLList,
    GraphQLInt
} from 'graphql';

import DirectorType from '../models/director.type';
import * as DirectorsService from '../services/directors.service';

import * as utils from '../shared/utils';

const allQuery = {
    type: new GraphQLList(DirectorType),
    description: 'List of all stored directors.',
    resolve: async (parentValues, args) => {
        return await DirectorsService.getDirectorsData();
    }
};

const byIdQuery = {
    type: new GraphQLList(DirectorType),
    description: 'List of all stored directors, filtered by their IDs.',
    args: {
        id: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        let queryParams = utils.createQueryParamsString(args.id, 'id');
        return await DirectorsService.getDirectorsData(queryParams);
    }
};

export {
    allQuery,
    byIdQuery
};
