import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_LOADING,
  SEARCH_BOOKS,
  FETCH_RECOMMENDED_BOOKS_SUCCESS,
  FETCH_RECOMMENDED_BOOKS_FAILURE,
} from './actionTypes.js';
import apiClient from '../middleware/apiClient.js';
import { notification } from 'antd';

// Authentication actions
export const loginSuccess = (token) => (
  console.log(token), {
    type: LOGIN_SUCCESS,
    payload: token,
  });

export const logout = () => (

  localStorage.removeItem('token'),
  notification.success({
    message: 'Logged out',
    description: 'Logged out successfully!',
    placement: 'bottomLeft',
  }),
  {
    payload: null,
    type: LOGOUT,
  }

);

// Book actions
export const fetchBooks = () => async (dispatch) => {

  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await apiClient.get('/books'); 
    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BOOKS_FAILURE, payload: "Error fetching books" });
    notification.error({
      message: 'Fetching books failed',
      description: error.message,
      placement: 'bottomLeft',
    })

  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  

  }
};

export const searchBooks = (query) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  notification.info({
    message: `Searching for ${query}`,
    description: "Please wait while we search for your query",
    placement: "bottomLeft",
  })
  try {
    const response = await axios.get(`http://localhost:5000/books/searchStartWith?query=${query}`);
    dispatch({ type: SEARCH_BOOKS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BOOKS_FAILURE, payload: "Error searching books" });
    notification.error({
      message: 'Error searching books',
      description: error.message,
      placement: 'bottomLeft',
    })
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
    notification.success({
      message: `Searching for ${query}`,
      description: "Searched books successfully!",
      placement: "bottomLeft",
    })
  }
};

// In your actions.js file
export const filterBooks = (filters) => (
  notification.info({
    message: 'Filtering books',
    description: 'Please wait while we filter your books',
    placement: 'bottomLeft',
  }),
  {
    type: 'FILTER_BOOKS',
    filters,
  });


export const fetchRecommendedBooks = (bookId) => async (dispatch) => {
  notification.info({
    message: 'Fetching recommended books',
    description: 'Please wait while we fetch your recommended books',
    placement: 'bottomLeft',
  })
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.get(`http://localhost:5000/books/recommendations/${bookId}`);
    dispatch({ type: FETCH_RECOMMENDED_BOOKS_SUCCESS, payload: { books: response.data, bookId } });
  } catch (error) {
    dispatch({ type: FETCH_RECOMMENDED_BOOKS_FAILURE, payload: "Error fetching recommended books" });
    notification.error({
      message: 'Error fetching recommended books',
      description: error.message,
      placement: 'bottomLeft',
    })
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
    notification.success({
      message: 'Fetching recommended books success',
      description: 'Books fetched successfully!',
      placement: 'bottomLeft',
    })
  }
};

