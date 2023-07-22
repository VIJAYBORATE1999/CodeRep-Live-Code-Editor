import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Editors } from "./editors";
import { Authentication } from "./authentication";
import { Users } from "./users";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      // Add Reducer Functions Here
      editors: Editors,
      authentication: Authentication,
      users: Users,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
