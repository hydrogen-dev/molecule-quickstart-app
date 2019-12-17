export function MainReducer(state, action) {
  switch (action.type) {
    case 'USER_LOGGED_IN': {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      }
    }
    case 'USER_LOGGED_OUT': {
      return {
        ...state,
        user: null,
        accessToken: null,
      }
    }
    default: {
      return state;
    }
  }
}