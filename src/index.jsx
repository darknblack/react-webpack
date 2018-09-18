import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import Body from './components/body';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.sass';

const store = createStore(reducer);
store.subscribe(() => {
	// console.log(store.getState());
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Provider store={store}>
				<Body />
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

export default hot(module)(App);
