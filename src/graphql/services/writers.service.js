import axios from 'axios';

import log4js from '../../common/logger';
var logger = log4js.getLogger('graphql.writers.service');

import { serverConf }  from '../../config';
import * as utils  from '../shared/utils';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/writers`;

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getWritersDataFromMovieRelationships = async (relationships) => {
    let writerIds = [];
    let queryParams = [];

    writerIds = _getWriterIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(writerIds, 'id');

    return await getWritersData(queryParams);
};

const _getWriterIdsFromMovieRelationships = (relationships) => {
    return relationships.map((writerRelationship) => {
        return writerRelationship.writerId;
    });
};

const getWritersData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getWritersData) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const persistNewWriter = async (writerData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, writerData)).data;
    } catch (error) {
        logger.error(`(persistNewWriter) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateWriter = async (writerData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${writerData.id}`, writerData)).data;
    } catch (error) {
        logger.error(`(updateWriter) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteWriter = async (writerId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${writerId}`)).data;
    } catch (error) {
        logger.error(`(deleteWriter) - ${error.message}`);
        return {};
    }
};

export {
    persistNewWriter,
    updateWriter,
    deleteWriter,
    getWritersDataFromMovieRelationships,
    getWritersData
};