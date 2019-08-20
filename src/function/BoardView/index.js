import axios from 'axios';
import { API_URL } from '../../config';

export const updateBoard = (id, title) => {
  axios.post(`${API_URL}/boards/update`, {
    id,
    title,
  });
};

export const deleteBoard = id => {
  axios.post(`${API_URL}/boards/delete`, {
    id,
  });
};
