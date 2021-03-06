import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider}  from 'react-redux';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import burgerReducer from './store/reducers/burger';
import orderReducer  from './store/reducers/order';
import authReducer from './store/reducers/auth';

import {watchAuth} from './store/sagas';
//const store = createStore(reducer);


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({burgerReducer, orderReducer, authReducer});
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk, sagaMiddleware)
));


sagaMiddleware.run(watchAuth);

const app= (
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
