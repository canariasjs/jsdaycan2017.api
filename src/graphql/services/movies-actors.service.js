import axios from 'axios';

import log4js from '../../common/logger';
var logger = log4js.getLogger('graphql.movies.actors.service');

import { serverConf }  from '../../config';

import * as MoviesService from './movies.service';
import * as ActorsService from './actors.service';
import * as CommonService from './common.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/movies_actors`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addMoviesToActor = async (actorId, newMoviesIds) => {
    try {
        let persistedMovieIds;
        let moviesToBePersisted;
        let relationships;
        let relationshipsToBePersisted;
        
        relationships = await _getMovieActorRelationshipsByActorId(actorId);

        if (relationships.length > 0) {
            persistedMovieIds = relationships.map((movieActorPair) => {
                return movieActorPair.movieId;
            });

            moviesToBePersisted = newMoviesIds.filter((newMovieId) => {
                return (persistedMovieIds.indexOf(newMovieId) < 0);
            });
        } else {
            moviesToBePersisted = newMoviesIds;
        }

        relationshipsToBePersisted = moviesToBePersisted.map((movieId) => {
            return { actorId: actorId, movieId: movieId };
        });

        return await _persistNewMovieActorRelationships(relationshipsToBePersisted);
    } catch (error) {
        logger.error(`(addMoviesToActor) - ${error.message}`);
        return [];
    }
};

const addActorsToMovie = async (movieId, newActorsIds) => {
    try {
        let persistedActorIds;
        let actorIdsToBePersisted;
        let relationships;
        let relationshipsToBePersisted;

        relationships = await _getMovieActorRelationshipsByMovieId(movieId);

        if (relationships.length > 0) {
            persistedActorIds = relationships.map((movieActorPair) => {
                return movieActorPair.actorId;
            });

            actorIdsToBePersisted = newActorsIds.filter((newActorId) => {
                return (persistedActorIds.indexOf(newActorId) < 0);
            });
        } else {
            actorIdsToBePersisted = newActorsIds;
        }

        relationshipsToBePersisted = actorIdsToBePersisted.map((actorId) => {
            return { actorId: actorId, movieId: movieId };
        });

        return await _persistNewMovieActorRelationships(relationshipsToBePersisted);
    } catch (error) {
        logger.error(`(addActorsToMovie) - ${error.message}`);
        return [];
    }
};

const _persistNewMovieActorRelationships = async (relationshipsToBePersisted) => {
    let asyncRequests = await CommonService.generateAsyncPostRequests('movies_actors', relationshipsToBePersisted);
    return await CommonService.runAllAsyncRequests(asyncRequests, 'Persisting movie-actor relationships');
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getMoviesDataByActorId = async (actorId) => {
    try {
        let relationships = await _getMovieActorRelationshipsByActorId(actorId);
        return await MoviesService.getRelatedMovies(relationships);
    } catch (error) {
        logger.error(`(getMoviesDataByActorId) - ${error.message}`);
        return [];
    }
};

const getActorsDataByMovieId = async (movieId) => {
    try {
        let relationships = await _getMovieActorRelationshipsByMovieId(movieId);
        return await ActorsService.getActorsDataFromMovieRelationships(relationships);
    } catch (error) {
        logger.error(`(getActorsDataByMovieId) - ${error.message}`);
        return [];
    }
};

const _getMovieActorRelationshipsByMovieId = async (movieId) => {
    try {
        return (await axios.get(`${API_REST_URL}?movieId=${movieId}`)).data;
    } catch (error) {
        logger.error(`(_getMovieActorRelationshipsByMovieId) - ${error.message}`);
        return [];
    }
};

const _getMovieActorRelationshipsByActorId = async (actorId) => {
    try {
        return (await axios.get(`${API_REST_URL}?actorId=${actorId}`)).data;
    } catch (error) {
        logger.error(`(_getMovieActorRelationshipsByActorId) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteActorMovies = async (actorId, moviesIds) => {
    try {
        let relationships;
        let relationshipIdsToBeDeleted;

        relationships = await _getMovieActorRelationshipsByActorId(actorId);

        relationshipIdsToBeDeleted = relationships
            .filter((movieActorPair) => {
                return (moviesIds.indexOf(movieActorPair.movieId) >= 0);
            })
            .map((movieActorPairToBeDeleted) => {
                return movieActorPairToBeDeleted.id;
            });

        if (relationshipIdsToBeDeleted) {
            return await _deleteMovieActorRelationships(relationshipIdsToBeDeleted);
        } else {
            logger.warn(`(deleteActorMovies) - No movie-actor relationships are going to be deleted for the actor with id ${actorId}`); 
            return [];
        }
    } catch (error) {
        logger.error(`(deleteActorMovies) - ${error.message}`);
        return [];
    }
};

const _deleteMovieActorRelationships = async (relationshipIdsToBeDeleted) => {
    let asyncRequests = await CommonService.generateAsyncDeleteRequests('movies_actors', relationshipIdsToBeDeleted);
    return await CommonService.runAllAsyncRequests(asyncRequests, 'Deleting movie-actor relationships');
};

export {
    addMoviesToActor,
    addActorsToMovie,
    deleteActorMovies,
    getMoviesDataByActorId,
    getActorsDataByMovieId
};