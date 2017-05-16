const STATIC_START_TIME = new Date('2016-3-10')
const STATIC_END_TIME = new Date('2017-3-9')

const initialState = {
  loading: true,
  error: false,
  selectedDowjones: [],
  startTime: STATIC_START_TIME,
  endTime: STATIC_END_TIME
}

const LOAD_DOWJONES_DETAIL = 'LOAD_DOWJONES_DETAIL'
const LOAD_DOWJONES_DETAIL_SUCCESS = 'LOAD_DOWJONES_DETAIL_SUCCESS'
const LOAD_DOWJONES_DETAIL_ERROR = 'LOAD_DOWJONES_DETAIL_ERROR'
const SET_TIME_RANGE = 'SET_TIME_RANGE'

export function loadDowjonesDetail(items){
  const urls = items.map(e => (`api/dowjones/${e}.json`))
  console.log(urls);
  return {
    types: [LOAD_DOWJONES_DETAIL, LOAD_DOWJONES_DETAIL_SUCCESS, LOAD_DOWJONES_DETAIL_ERROR],
    urls
  }
}

// 姑且这么设计
export function setTimeRanges(range){
  const [start, end] = range
  return {
    type: SET_TIME_RANGE,
    payload: {
      start,
      end
    }
  }
}

function detailList(state = initialState, action){
  switch (action.type){
  case LOAD_DOWJONES_DETAIL: 
    return {
      ...state,
      loading: true,
      error: false
    }
  case LOAD_DOWJONES_DETAIL_SUCCESS: 
    return {
      ...state,
      loading: false,
      error: false,
      selectedDowjones: [].concat(action.payload)
    }
  case LOAD_DOWJONES_DETAIL_ERROR:
    return {
      ...state,
      loading: false,
      error: true
    }
  case SET_TIME_RANGE:
    return {
      ...state,
      startTime: action.payload.start,
      endTime: action.payload.end
    }

  default: 
    return state
  }
}

export default detailList