import {
  START_EPISODE_MODAL,
  ERROR_EPISODE_MODAL,
  SUCCESS_EPISODE_MODAL,
} from '../types/index';

const initialState = {
  error: null,
  loading: false,
  info: {
    isOpen: false,
    data: {},
  },
};

type Action = {
  type: string;
  payload: boolean;
};

const episodeModalReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case START_EPISODE_MODAL:
      return {
        ...state,
        loading: action.payload,
      };
    case SUCCESS_EPISODE_MODAL:
      return {
        ...state,
        loading: false,
        error: null,
        info: action.payload,
      };
    case ERROR_EPISODE_MODAL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default episodeModalReducer;
