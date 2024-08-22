const initialState = {
    scouts: [],
  };
  
  const scoutsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SCOUTS':
        return {
          ...state,
          scouts: action.payload,
        };
        case 'DELETE_SCOUT':
      return {
        ...state,
        scouts: state.scouts.filter(scout => scout.id !== action.payload)
      }
      default:
        return state;
    }
  };
  
  export default scoutsReducer