import {
  START_CHARACTER_MODAL,
  ERROR_CHARACTER_MODAL,
  SUCCESS_CHARACTER_MODAL,
} from '../types/index';

const initialState = {
  error: null,
  loading: false,
  info: {
    isOpen: false,
    data: {}
  }
};

type Action = {
  type: string;
  payload: boolean;
};

const characterModalReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case START_CHARACTER_MODAL:
      return {
        ...state,
        loading: action.payload,
      };
    case SUCCESS_CHARACTER_MODAL:
      return {
        ...state,
        loading: false,
        error: null,
        info: action.payload,
      };
    case ERROR_CHARACTER_MODAL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default characterModalReducer;
