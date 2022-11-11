import { createStore, combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";

import taskReducer from "./taskReducer";
import { persistReducer, persistStore } from "redux-persist";
import AuthReducer from './reducers';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import storage from "redux-persist/lib/storage";
const RootReducers = combineReducers({
    AuthReducer,tasks: taskReducer
});
const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
  }
const persistedReducer = persistReducer(persistConfig, RootReducers);

export default () => {
    let store = createStore(persistedReducer, 
      applyMiddleware(thunk));
    let persistor = persistStore(store)
    return { store, persistor }
  };
//export const store = createStore(RootReducers,applyMiddleware(thunk));