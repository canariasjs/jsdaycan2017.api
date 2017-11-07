import axios from 'axios';

import log4js from '../../common/logger';
var logger = log4js.getLogger('graphql.actors.service');

import { serverConf }  from '../../config';
import * as utils  from '../shared/utils';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/actors`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const persistNewActor = async (actorData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, actorData)).data;
    } catch (error) {
        logger.error(`(persistNewActor) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getActorsDataFromMovieRelationships = async (relationships) => {
    let actorIds = [];
    let queryParams = [];

    actorIds = _getActorIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(actorIds, 'id');

    return await getActorsData(queryParams);
};

const _getActorIdsFromMovieRelationships = (relationships) => {
    return relationships.map((movieRelationship) => {
        return movieRelationship.actorId;
    });
};

const getActorsData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getActorsData) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateActor = async (actorData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${actorData.id}`, actorData)).data;
    } catch (error) {
        logger.error(`(updateActor) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

var deleteActor = async (actorId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${actorId}`)).data;
    } catch (error) {
        logger.error(`(deleteActor) - ${error.message}`);
        return {};
    }
};

export {
    getActorsDataFromMovieRelationships,
    getActorsData,
    persistNewActor,
    updateActor,
    deleteActor
};