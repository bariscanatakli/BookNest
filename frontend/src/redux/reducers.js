// frontend/src/redux/reducers.js
import {
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_LOADING,
  SEARCH_BOOKS,
  FETCH_RECOMMENDED_BOOKS_SUCCESS,
  FETCH_RECOMMENDED_BOOKS_FAILURE,
  REMOVE_RECOMMENDATIONS,
  REMOVE_FILTERS
} from './actionTypes.js';
import { combineReducers } from 'redux';


const initialAuthState = {
  token: null,
  username: null,
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
};

const initialBooksState = {
  books: [],
  recommendations: [],
  filteredBooks: [],
  filteredRecommendations: [],
  recommendatedBookId: null,
  loading: false,
  error: null,
};

const booksReducer = (state = initialBooksState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, books: action.payload, error: null };
    case FETCH_BOOKS_FAILURE:
      return { ...state, error: action.payload };
    case SEARCH_BOOKS:
      return { ...state, books: action.payload, error: null };
    case 'FILTER_BOOKS':
      return {
        ...state,
        filteredRecommendations: state.recommendatedBookId ? state.recommendations.filter(book => {
          const { rating, awardCount, formatType, genres, seriesCount } = action.filters;
          const meetsRatingCriteria = rating !== undefined ? book.rating >= rating : true;
          const meetsAwardCountCriteria = awardCount !== undefined ? (book.awards ? book.awards.length >= awardCount : false) : true;
          const meetsFormatTypeCriteria = formatType !== undefined ? book.bookFormat === formatType : true;
          const meetsGenresCriteria = genres.length > 0 ? genres.some(genre => book.genres.includes(genre)) : true;
          const meetsSeriesCountCriteria = seriesCount !== undefined ? (book.series ? book.series.split(',').length >= seriesCount : false) : true;

          return meetsRatingCriteria &&
            meetsAwardCountCriteria &&
            meetsFormatTypeCriteria &&
            meetsGenresCriteria &&
            meetsSeriesCountCriteria;

        }) : [],
        filteredBooks: state.books.filter(book => {
          const { rating, awardCount, formatType, genres, seriesCount } = action.filters;
          const meetsRatingCriteria = rating !== undefined ? book.rating >= rating : true;
          const meetsAwardCountCriteria = awardCount !== undefined ? (book.awards ? book.awards.length >= awardCount : false) : true;
          const meetsFormatTypeCriteria = formatType !== undefined ? book.bookFormat === formatType : true;
          const meetsGenresCriteria = genres.length > 0 ? genres.some(genre => book.genres.includes(genre)) : true;
          const meetsSeriesCountCriteria = seriesCount !== undefined ? (book.series ? book.series.split(',').length >= seriesCount : false) : true;

          return meetsRatingCriteria &&
            meetsAwardCountCriteria &&
            meetsFormatTypeCriteria &&
            meetsGenresCriteria &&
            meetsSeriesCountCriteria;
        })
      };
    case FETCH_RECOMMENDED_BOOKS_SUCCESS:
      return { ...state, recommendations: action.payload.books, recommendatedBookId: action.payload.bookId, error: null };

    case REMOVE_RECOMMENDATIONS:
      return { ...state, recommendations: [], recommendatedBookId: null, error: null };
    case REMOVE_FILTERS:
      return { ...state, filteredBooks: state.books, filteredRecommendations: [] };
    case FETCH_RECOMMENDED_BOOKS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
});

