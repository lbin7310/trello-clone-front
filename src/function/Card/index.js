import axios from 'axios';
import { API_URL } from '../../config';

export const deleteCard = () => {};
export const isActiveCard = (id, active) => {
  return axios.post(`${API_URL}/cards/isactive`, {
    id: id,
    isActive: !active // false면 true
  })
};

export const completedCards = () => {
  return axios.get(`${API_URL}/cards/isactive/completed`);
};

export const getCards = () => {
  return axios.get(`${API_URL}/cards`);
}