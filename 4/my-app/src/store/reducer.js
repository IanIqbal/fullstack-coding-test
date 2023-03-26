const { GET_ORGANIZATIONS, GET_MY_ORGANIZATIONS } = require("./actionType");

const initialState = { organizations: [], myOrganizations: [] }


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORGANIZATIONS:

            return {
                ...state,
                organizations: action.payload
            }

        case GET_MY_ORGANIZATIONS:

            return {
                ...state,
                myOrganizations: action.payload
            }
        default:

            return state
    }
}

module.exports = reducer