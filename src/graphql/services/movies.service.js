import axios from 'axios';

import log4js from '../../common/logger';
var logger = log4js.getLogger('graphql.movies.service');

import { serverConf }  from '../../config';
import * as utils  from '../shared/utils';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/movies`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const persistNewMovie = async (movieData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, movieData)).data;
    } catch (error) {
        logger.error(`(persistNewMovie) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getRelatedMovies = async (relationships) => {
    let moviesIds = [];
    let queryParams = [];

    moviesIds = _getMovieIds(relationships);

    queryParams = utils.createQueryParamsString(moviesIds, 'id');

    return await getMoviesData(queryParams);
};

const _getMovieIds = (relationships) => {
    return relationships.map((movieRelationship) => {
        return movieRelationship.movieId;
    });
};

const getMoviesData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getMoviesData) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateMovie = async (movieData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${movieData.id}`, movieData)).data;
    } catch (error) {
        logger.error(`(updateMovie) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteMovie = async (movieId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${movieId}`)).data;
    } catch (error) {
        logger.error(`(deleteMovie) - ${error.message}`);
        return {};
    }
};

export {
    persistNewMovie,
    updateMovie,
    deleteMovie,
    getRelatedMovies,
    getMoviesData
};