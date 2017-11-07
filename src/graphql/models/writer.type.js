import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

var WriterType = new GraphQLObjectType({
    name: 'Writer',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        picture: { type: GraphQLString }
    })
});

export default WriterType;
