import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_LOADING,
  SEARCH_BOOKS,
  REMOVE_FILTERS,
  FETCH_RECOMMENDED_BOOKS_SUCCESS,
  FETCH_RECOMMENDED_BOOKS_FAILURE,
} from './actionTypes.js';
import { notification } from 'antd';

// Authentication actions
export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});

// Book actions
export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.get("http://localhost:5000/books");
    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BOOKS_FAILURE, payload: "Error fetching books" });
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
    const response = await axios.get(`http://localhost:5000/books/search?query=${query}`);
    dispatch({ type: SEARCH_BOOKS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BOOKS_FAILURE, payload: "Error searching books" });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
    notification.success({
        message: `Searching for ${query}`,
        description: "Please wait while we search for your query",
        placement: "bottomLeft",
      })
  }
};

// In your actions.js file
export const filterBooks = (filters) => ({
    type: 'FILTER_BOOKS',
    filters,
  });
  

export const fetchRecommendedBooks = (bookId) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.get(`http://localhost:5000/books/recommendations/${bookId}`);
    dispatch({ type: FETCH_RECOMMENDED_BOOKS_SUCCESS, payload: {books:response.data, bookId} });
  } catch (error) {
    dispatch({ type: FETCH_RECOMMENDED_BOOKS_FAILURE, payload: "Error fetching recommended books" });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

