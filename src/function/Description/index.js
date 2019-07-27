import axios from 'axios';
import { API_URL } from '../../config';

export const updateDescription = (id, title) => {
  return axios.post(`${API_URL}/description/update`, {
    id,
    title
  })
};
export const deleteDescription = () => {};