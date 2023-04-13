import userReducer from "./auth";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: userReducer,
});

export default rootReducer;
