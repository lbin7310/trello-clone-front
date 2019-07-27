import axios from 'axios';
import { API_URL } from '../../config';

export const updateBoard = (id, title) => {
  axios.post(`${API_URL}/boards/update`, {
    id,
    title
  })
};
export const deleteBoard = () => {
  axios.post(`${API_URL}/boards/delete`, {

  })
  .then(res => res);
};