import authReducer from "./reducers/authReducer";
import EmployerReducer from "./reducers/EmployerReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth : authReducer,
    employer: EmployerReducer,
})

export default rootReducer;