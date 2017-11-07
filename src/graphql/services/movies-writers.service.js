import axios from 'axios';

import log4js from '../../common/logger';
var logger = log4js.getLogger('graphql.movies.writers.service');

import { serverConf }  from '../../config';

import * as MoviesService from './movies.service';
import * as WritersService from './writers.service';
import * as CommonService from './common.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/movies_writers`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addMoviesToWriter = async (writerId, newMoviesIds) => {
    try {
        let persistedMovieIds;
        let moviesIdsToBePersisted;
        let relationships;
        let relationshipsToBePersisted;

        relationships = await _getMovieWriterRelationshipsByWriterId(writerId);

        if (relationships.length > 0) {
            persistedMovieIds = relationships.map((movieWriterPair) => {
                return movieWriterPair.movieId;
            });

            moviesIdsToBePersisted = newMoviesIds.filter((newMovieId) => {
                return (persistedMovieIds.indexOf(newMovieId) < 0);
            });
        } else {
            moviesIdsToBePersisted = newMoviesIds;
        }

        relationshipsToBePersisted = moviesIdsToBePersisted.map((movieId) => {
            return { writerId: writerId, movieId: movieId };
        });

        return await _persistNewMovieWriterRelationships(relationshipsToBePersisted);
    } catch (error) {
        logger.error(`(addMoviesToWriter) - ${error.message}`);
        return [];
    }
};

const addWritersToMovie = async (movieId, newWritesIds) => {
    try {
        let persistedWriterIds;
        let writerIdsToBePersisted;
        let relationships;
        let relationshipsToBePersisted;

        relationships = await _getMovieWriterRelationshipsByMovieId(movieId);

        if (relationships.length > 0) {
            persistedWriterIds = relationships.map((movieWriterPair) => {
                return movieWriterPair.writerId;
            });

            writerIdsToBePersisted = newWritesIds.filter((newWritesId) => {
                return (persistedWriterIds.indexOf(newWritesId) < 0);
            });
        } else {
            writerIdsToBePersisted = newWritesIds;
        }

        relationshipsToBePersisted = writerIdsToBePersisted.map((writerId) => {
            return { writerId: writerId, movieId: movieId };
        });

        return await _persistNewMovieWriterRelationships(relationshipsToBePersisted);
    } catch (error) {
        logger.error(`(addWritersToMovie) - ${error.message}`);
        return [];
    }
};

const _persistNewMovieWriterRelationships = async (dataToBePersisted) => {
    let asyncRequests = await CommonService.generateAsyncPostRequests('movies_writers', dataToBePersisted);
    return await CommonService.runAllAsyncRequests(asyncRequests, 'Persisting movie-writer relationships');
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getMoviesDataByWriterId = async (writerId) => {
    try {
        let relationships = await _getMovieWriterRelationshipsByWriterId(writerId);
        return await MoviesService.getRelatedMovies(relationships);
    } catch (error) {
        logger.error(`(getMoviesDataByWriterId) - ${error.message}`);
        return [];
    }
};

const getWritersDataByMovieId = async (movieId) => {
    try {
        let relationships = await _getMovieWriterRelationshipsByMovieId(movieId);
        return await WritersService.getWritersDataFromMovieRelationships(relationships);

    } catch (error) {
        logger.error(`(getWritersDataByMovieId) - ${error.message}`);
        return [];
    }
};

const _getMovieWriterRelationshipsByMovieId = async (movieId) => {
    try {
        return (await axios.get(`${API_REST_URL}?movieId=${movieId}`)).data;
    } catch (error) {
        logger.error(`(_getMovieWriterRelationshipsByMovieId) - ${error.message}`);
        return [];
    }
};

const _getMovieWriterRelationshipsByWriterId = async (writerId) => {
    try {
        return (await axios.get(`${API_REST_URL}?writerId=${writerId}`)).data;
    } catch (error) {
        logger.error(`(_getMovieWriterRelationshipsByWriterId) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteWriterMovies = async (writerId, moviesIds) => {
    try {
        let relationships;
        let relationshipIdsToBeDeleted;

        relationships = await _getMovieWriterRelationshipsByWriterId(writerId);

        relationshipIdsToBeDeleted = relationships
            .filter((movieWriterPair) => {
                return (moviesIds.indexOf(movieWriterPair.movieId) >= 0);
            })
            .map((movieWriterPairToBeDeleted) => {
                return movieWriterPairToBeDeleted.id;
            });

        if (relationshipIdsToBeDeleted) {
            return await _deleteMovieWriterRelationships(relationshipIdsToBeDeleted);
        } else {
            logger.warn(`No movie-director relationships are going to be deleted for the writer with id ${writerId}`); 
            return [];
        }        
    } catch (error) {
        logger.error(`(deleteWriterMovies) - ${error.message}`);
        return [];
    }
};

const _deleteMovieWriterRelationships = async (relationshipIdsToBeDeleted) => {
    let asyncRequests = await CommonService.generateAsyncDeleteRequests('movies_writers', relationshipIdsToBeDeleted);
    return await CommonService.runAllAsyncRequests(asyncRequests, 'Deleting movie-writer relationships');
};

export {
    addMoviesToWriter,
    addWritersToMovie,
    deleteWriterMovies,
    getMoviesDataByWriterId,
    getWritersDataByMovieId
};