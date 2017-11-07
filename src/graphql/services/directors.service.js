import axios from 'axios';

import log4js from '../../common/logger';
var logger = log4js.getLogger('graphql.directors.service');

import { serverConf }  from '../../config';
import * as utils  from '../shared/utils';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/directors`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const persistNewDirector = async (directorData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, directorData)).data;
    } catch (error) {
        logger.error(`(persistNewDirector) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getDirectorsDataFromMovieRelationships = async (relationships) => {
    let directorIds = [];
    let queryParams = [];

    directorIds = _getDirectorIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(directorIds, 'id');

    return await getDirectorsData(queryParams);
};

const _getDirectorIdsFromMovieRelationships = (relationships) => {
    return relationships.map((directorRelationship) => {
        return directorRelationship.directorId;
    });
};

const getDirectorsData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getDirectorsData) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateDirector = async (directorData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${directorData.id}`, directorData)).data;
    } catch (error) {
        logger.error(`(updateDirector) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteDirector = async (directorId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${directorId}`)).data;
    } catch (error) {
        logger.error(`(deleteDirector) - ${error.message}`);
        return {};
    }
};

export {
    persistNewDirector,
    updateDirector,
    deleteDirector,
    getDirectorsDataFromMovieRelationships,
    getDirectorsData
};