import axios from 'axios';

import log4js from '../../common/logger';
var logger = log4js.getLogger('graphql.genres.service');

import { serverConf }  from '../../config';
import * as utils  from '../shared/utils';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/genres`;

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getGenresDataFromMovieRelationships = async (relationships) => {
    let genreIds = [];
    let queryParams = [];

    genreIds = _getGenreIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(genreIds, 'id');

    return await getGenresData(queryParams);
};

const _getGenreIdsFromMovieRelationships = (relationships) => {
    return relationships.map((genreRelationship) => {
        return genreRelationship.genreId;
    });
};

const getGenresData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getGenresData) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const persistNewGenre = async (genreData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, genreData)).data;
    } catch (error) {
        logger.error(`(persistNewGenre) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateGenre = async (genreData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${genreData.id}`, genreData)).data;
    } catch (error) {
        logger.error(`(updateGenre) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteGenre = async (genreId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${genreId}`)).data;
    } catch (error) {
        logger.error(`(deleteGenre) - ${error.message}`);
        return {};
    }
};

export {
    getGenresDataFromMovieRelationships,
    getGenresData,
    persistNewGenre,
    updateGenre,
    deleteGenre
};