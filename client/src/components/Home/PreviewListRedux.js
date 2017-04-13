const initialState = {
  loading: true,
  error: false,
  dowjonesList: []
}

const LOAD_DOWJONES = 'LOAD_DOWJONES'
const LOAD_DOWJONES_SUCCESS = 'LOAD_DOWJONES_SUCCESS'
const LOAD_DOWJONES_ERROR = 'LOAD_DOWJONES_ERROR'

export function loadDowjones() {
  return {
    types: [LOAD_DOWJONES, LOAD_DOWJONES_SUCCESS, LOAD_DOWJONES_ERROR],
    url: '/api/dowjoneslist.json'
  } 
}

function previewList(state = initialState, action) {
  switch (action.type) {
  case LOAD_DOWJONES: 
    return {
      ...state,
      loading: true,
      error: false
    }
  case LOAD_DOWJONES_SUCCESS: 
    return {
      ...state,
      loading: false,
      error: false,
      dowjonesList: action.payload
    }
  case LOAD_DOWJONES_ERROR:
    return {
      ...state,
      loading: false,
      error: true
    }
  default: 
    return state
  }
}

export default previewList
