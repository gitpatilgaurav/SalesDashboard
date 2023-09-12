const intialState = [];
export default function ApiReducer(state = intialState, action) {
  switch (action.type) {
    case "GET_DATA":
      return action.payload;
    default:
      return state;
  }
}
