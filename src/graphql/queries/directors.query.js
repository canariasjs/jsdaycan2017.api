import {
    GraphQLList,
    GraphQLInt
} from 'graphql';

import DirectorType from '../models/director.type';
import * as DirectorsService from '../services/directors.service';

import * as utils from '../shared/utils';

var allQuery = {
    type: new GraphQLList(DirectorType),
    description: 'List of all stored directors.',
    resolve: async (parentValues, args) => {
        return await DirectorsService.getDirectorsData();
    }
};

export {
    allQuery
};
