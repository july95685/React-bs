const fetchMiddleware = store => next => action => {

  if (!(action.url || action.urls) || !Array.isArray(action.types)) {
    return next(action)
  }

  const [LOADING, SUCCESS, ERROR] = action.types 

  next({
    type: LOADING,
    loading: true,
    ...action
  })


  if (action.urls) {
    Promise.all(action.urls.map(e => fetch(e)))
      .then(result => {
        Promise.all(result.map(e=>e.json()))
          .then(result => {
            next({
              type: SUCCESS,
              loading: false,
              payload: result
            })
          })
      }).catch(err => {
        next({
          type: ERROR,
          loading: false,
          err: err
        })
      })

  } else if (action.url) {
    fetch(action.url).then(result => result.json().then(result => {
      next({
        type: SUCCESS,
        loading: false,
        payload: result
      })
    })).catch(err => {
      next({
        type: ERROR,
        loading: false,
        err: err
      })
    })
  }
}

export default fetchMiddleware