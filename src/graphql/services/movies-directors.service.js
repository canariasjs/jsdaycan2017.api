import axios from 'axios';

import log4js from '../../common/logger';
var logger = log4js.getLogger('graphql.movies.directors.service');

import { serverConf }  from '../../config';

import * as MoviesService from './movies.service';
import * as DirectorsService from './directors.service';
import * as CommonService from './common.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/movies_directors`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addMoviesToDirector = async (directorId, newMoviesIds) => {
    try {
        let persistedMovieIds;
        let moviesIdsToBePersisted;
        let relationships;
        let relationshipsToBePersisted;
        
        relationships = await _getMovieDirectorRelationshipsByDirectorId(directorId);

        if (relationships.length > 0) {
            persistedMovieIds = relationships.map((movieDirectorPair) => {
                return movieDirectorPair.movieId;
            });

            moviesIdsToBePersisted = newMoviesIds.filter((newMovieId) => {
                return (persistedMovieIds.indexOf(newMovieId) < 0);
            });
        } else {
            moviesIdsToBePersisted = newMoviesIds;
        }

        relationshipsToBePersisted = moviesIdsToBePersisted.map((movieId) => {
            return { directorId: directorId, movieId: movieId };
        });

        return await _persistNewMovieDirectorRelationships(relationshipsToBePersisted);
    } catch (error) {
        logger.error(`(addMoviesToDirector) - ${error.message}`);
        return [];
    }
};

const addDirectorsToMovie = async (movieId, directorsIds) => {
    try {
        let persistedDirectorIds;
        let directorIdsToBePersisted;
        let relationships;
        let relationshipsToBePersisted;
        
        relationships = await _getMovieDirectorRelationshipsByMovieId(movieId);

        if (relationships.length > 0) {
            persistedDirectorIds = relationships.map((directorMoviePair) => {
                return directorMoviePair.directorId;
            });

            directorIdsToBePersisted = directorsIds.filter((newDirectorId) => {
                return (persistedDirectorIds.indexOf(newDirectorId) < 0);
            });
        } else {
            directorIdsToBePersisted = directorsIds;
        }

        relationshipsToBePersisted = directorIdsToBePersisted.map((directorId) => {
            return { directorId: directorId, movieId: movieId };
        });

        return await _persistNewMovieDirectorRelationships(relationshipsToBePersisted);
    } catch (error) {
        logger.error(`(addDirectorsToMovie) - ${error.message}`);
        return [];
    }
};

const _persistNewMovieDirectorRelationships = async (relationshipsToBePersisted) => {
    let asyncRequests = CommonService.generateAsyncPostRequests('movies_directors', relationshipsToBePersisted);
    return await CommonService.runAllAsyncRequests(asyncRequests, '(runAllAsyncRequests) - Persisting movie-director relationships');
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getMoviesDataByDirectorId = async (directorId) => {
    try {
        let relationships = await _getMovieDirectorRelationshipsByDirectorId(directorId);
        return await MoviesService.getRelatedMovies(relationships);
    } catch (error) {
        logger.error(`(getMoviesDataByDirectorId) - ${error.message}`);
        return [];
    }
};

const getDirectorsDataByMovieId = async (movieId) => {
    try {
        let relationships = await _getMovieDirectorRelationshipsByMovieId(movieId);
        return await DirectorsService.getDirectorsDataFromMovieRelationships(relationships);;
    } catch (error) {
        logger.error(`(getDirectorsDataByMovieId) - ${error.message}`);
        return [];
    }
};

const _getMovieDirectorRelationshipsByMovieId = async (movieId) => {
    try {
        return (await axios.get(`${API_REST_URL}?movieId=${movieId}`)).data;
    } catch (error) {
        logger.error(`(_getMovieDirectorRelationshipsByMovieId) - ${error.message}`);
        return [];
    }
};

const _getMovieDirectorRelationshipsByDirectorId = async (directorId) => {
    try {
        return (await axios.get(`${API_REST_URL}?directorId=${directorId}`)).data;
    } catch (error) {
        logger.error(`(_getMovieDirectorRelationshipsByDirectorId) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteDirectorMovies = async (directorId, moviesIds) => {
    try {
        let relationships;
        let relationshipIdsToBeDeleted;

        relationships = await _getMovieDirectorRelationshipsByDirectorId(directorId);

        relationshipIdsToBeDeleted = relationships
            .filter((movieDirectorPair) => {
                return (moviesIds.indexOf(movieDirectorPair.movieId) >= 0);
            })
            .map((movieDirectorPairToBeDeleted) => {
                return movieDirectorPairToBeDeleted.id;
            });

        if (relationshipIdsToBeDeleted) {
            return await _deleteMovieDirectorRelationships(relationshipIdsToBeDeleted);
        } else {
            logger.warn(`(deleteDirectorMovies) - No movie-director relationships are going to be deleted for the director with id ${directorId}`); 
            return [];
        }
    } catch (error) {
        logger.error(`(deleteDirectorMovies) - ${error.message}`);
        return [];
    }
};

const _deleteMovieDirectorRelationships = async (relationshipIdsToBeDeleted) => {
    let asyncRequests = await CommonService.generateAsyncDeleteRequests('movies_directors', relationshipIdsToBeDeleted);
    return await CommonService.runAllAsyncRequests(asyncRequests, '(runAllAsyncRequests) - Deleting movie-director relationships');
};

export {
    addMoviesToDirector,
    addDirectorsToMovie,
    deleteDirectorMovies,
    getMoviesDataByDirectorId,
    getDirectorsDataByMovieId
};