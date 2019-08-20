import axios from 'axios';
import { API_URL } from '../../config';

export const updateContainer = (id, title) => {
  axios.post(`${API_URL}/containers/update`, {
    id,
    title,
  });
};
export const deleteContainer = () => {};
