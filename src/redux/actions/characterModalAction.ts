import {
  START_CHARACTER_MODAL,
  ERROR_CHARACTER_MODAL,
  SUCCESS_CHARACTER_MODAL,
} from '../types/index';

export const openModalAction = (data: {}) => {
  return (dispatch: any) => {
    dispatch(loadModal());
    try {
      dispatch(successLoadModal(data));
    } catch (error) {
      dispatch(errorLoadModal());
    }
  };
};

const loadModal = () => ({
  type: START_CHARACTER_MODAL,
  payload: true,
});

const successLoadModal = (data: {}) => ({
  type: SUCCESS_CHARACTER_MODAL,
  payload: data,
});

const errorLoadModal = () => ({
  type: ERROR_CHARACTER_MODAL,
  payload: true,
});
