import {
  START_EPISODE_MODAL,
  ERROR_EPISODE_MODAL,
  SUCCESS_EPISODE_MODAL,
} from '../types/index';

export const openModalEpisodeAction = (data: {}) => {
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
  type: START_EPISODE_MODAL,
  payload: true,
});

const successLoadModal = (data: {}) => ({
  type: SUCCESS_EPISODE_MODAL,
  payload: data,
});

const errorLoadModal = () => ({
  type: ERROR_EPISODE_MODAL,
  payload: true,
});
