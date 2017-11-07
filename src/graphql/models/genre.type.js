import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

var GenreType = new GraphQLObjectType({
    name: 'Genre',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
});

export default GenreType;