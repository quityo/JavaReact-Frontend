import favReducer from "./reducers/favReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    favSummary :favReducer
})

export default rootReducer;