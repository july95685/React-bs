const initialState = {
  loading: true,
  error: false,
  collectionList: [],
  dowjonesList: []
}

//const Wilddog = require("wilddog");

let ref = null;

const LOAD_DOWJONES = 'LOAD_DOWJONES'
const LOAD_DOWJONES_SUCCESS = 'LOAD_DOWJONES_SUCCESS'
const LOAD_DOWJONES_ERROR = 'LOAD_DOWJONES_ERROR'
const LOAD_COLLECTION = 'LOAD_COLLECTION'
const LOAD_COLLECTION_SUCCESS = 'LOAD_COLLECTION_SUCCESS'
const LOAD_COLLECTION_ERROR = 'LOAD_COLLECTION_ERROR'
const INIT_CHAT = 'INIT_CHAT'

export function loadDowjones() {
  return {
    types: [LOAD_DOWJONES, LOAD_DOWJONES_SUCCESS, LOAD_DOWJONES_ERROR],
    url: '/api/dowjoneslist.json'
  } 
}

export function loadCollection() {
  return {
    types: [LOAD_COLLECTION, LOAD_COLLECTION_SUCCESS, LOAD_COLLECTION_ERROR],
    url: 'https://july95685.wilddogio.com/age'
  } 
}

export function init(chats){
  return {
      type : INIT_CHAT,
      chats
  }
}

export function loadCollectionago(){
  return function(dispatch){
      ref = new Wilddog("https://july95685.wilddogio.com/");
      ref.on("value", function(snapshot) {
           console.log(snapshot.val());
           dispatch(init(snapshot.val()));
       }, function (errorObject) {
           console.log("The read failed: " + errorObject.code);
       });
      // ref.child("location/city").on("value", function(datasnapshot) {    
      //     console.log(datasnapshot.val());   // 结果会在 console 中打印出 "beijing"
      //     return {
      //       ...state,
      //       collectionList:datasnapshot.val()
      //     }
      // }, function(error){
      //     console.log(error);
      //     // 处理请求失败打错误
      // });
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
  case LOAD_COLLECTION: 
    console.log(11);
    return {
      ...state
    }
  case LOAD_COLLECTION_SUCCESS: 
    console.log(12);
    return {
      ...state
    }
  case LOAD_COLLECTION_ERROR:
    console.log(13);
    return {
      ...state
    }
  case INIT_CHAT:
    console.log(14);
    console.log(action);
    return Object.assign({},state,action.chats);
  default: 
    return state
  }
}

export default previewList
