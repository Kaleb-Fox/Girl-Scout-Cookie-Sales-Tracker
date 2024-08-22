const initialState = {
    flavors: [],
  };
  
  const flavorsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FLAVORS':
        return {
          ...state,
          flavors: action.payload,
        };
      case 'DELETE_FLAVOR':
        return {
          ...state,
          flavors: state.flavors.filter(flavor => flavor.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default flavorsReducer;