import { ADD_TO_FAV, REMOVE_FROM_FAV } from "../action/favAction"
import { favItems } from "../initialValues/favItems"

const initialState = {
    favItems: favItems,
};

export default function favReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_FAV:
      let jobAdvert = state.favItems.find((c) => c.jobAdvert.jobAdvertId === payload.jobAdverdId);
      if (jobAdvert) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          favItems: [...state.favItems, {  jobAdvert: payload }],
        };
      }

    case REMOVE_FROM_FAV:
      return {
        ...state,
        favItems: state.favItems.filter((c) => c.jobAdvert.jobAdvertId !== payload.jobAdvertId),
      };
    default:
      return state;
  }
}