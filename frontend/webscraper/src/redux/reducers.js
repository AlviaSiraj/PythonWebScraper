import { SCRAPE_REQUEST, SCRAPE_FAILURE, SCRAPE_SUCCESS } from "./actions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SCRAPE_REQUEST:
      return { ...state, loading: true };
    case SCRAPE_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case SCRAPE_FAILURE:
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
