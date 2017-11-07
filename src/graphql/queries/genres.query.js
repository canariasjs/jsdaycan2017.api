import {
    GraphQLList,
    GraphQLInt
} from 'graphql';

import GenreType from '../models/genre.type';
import * as GenresService from '../services/genres.service';

import * as utils from '../shared/utils';

var allQuery = {
    type: new GraphQLList(GenreType),
    description: 'List of all stored genres.',
    resolve: async (parentValues, args) => {
        return await GenresService.getGenresData();
    }
};

var byIdQuery = {
    type: new GraphQLList(GenreType),
    description: 'List of all stored genres, filtered by their IDs.',
    args: {
        id: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        let queryParams = utils.createQueryParamsString(args.id, 'id');
        return await GenresService.getGenresData(queryParams);
    }
};

export {
    allQuery,
    byIdQuery
};