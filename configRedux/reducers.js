const initialState = {
    users: [],
    loading: false,
    error: null,
};

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_FETCH_REQUESTED':
            return { ...state, loading: true, error: null };
        case 'USERS_FETCH_SUCCEEDED':
            return { ...state, loading: false, users: action.payload };
        case 'USERS_FETCH_FAILED':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default reducers;
