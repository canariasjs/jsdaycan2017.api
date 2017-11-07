var createQueryParamsString = (listOfValues, queryParamVariable) => {
    if (!listOfValues || listOfValues.length === 0) {
        throw new Error('It\'s needed a list of values in order to create a query params string.');
    }

    if (!queryParamVariable) {
        throw new Error('It\'s needed a param in order to create a query params string.');
    }

    if (listOfValues && queryParamVariable) {
        return listOfValues.reduce((previousValue, currentValue, index, array) => {
            return ((previousValue) ? previousValue : previousValue) + ((index > 0) ? `&${queryParamVariable}=` : '') + currentValue;
        }, `?${queryParamVariable}=`);
    }
};

export {
    createQueryParamsString
};