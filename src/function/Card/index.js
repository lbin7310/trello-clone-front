import axios from 'axios';
import { API_URL } from '../../config';

export const updateCard = () => {};
export const deleteCard = () => {};
export const isActiveCard = (id, active) => {
  axios.post(`${API_URL}/cards/isactive`, {
    id: id,
    isActive: !active
  })
};