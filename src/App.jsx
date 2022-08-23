import React, { Component } from 'react';

import './App.css';
import Board from './components/Board.jsx';

class App extends Component {
	render() {
		return (
			<div>
				<div className="App">
					<header className="App-header">
						<img src="/images/texaslogo.png" className="App-logo" alt="logo" />
						<h1 className="App-title1">
						CSEN 5303 Foundations of Computer Science
						</h1>
						<h1 className="App-title2">
						Instructor: Habib M. Ammari, Ph.D. (CSE), Ph.D. (CS)
						</h1>
						<h1 className="App-title">
						Project 2: Design, Analysis, and Implementation of Game of Life
						</h1>
						<h1 className="App-title3">
						Welcome to Game of Life
						</h1>
					</header>
				</div>
				<Board />
			</div>
		);
	}
}

export default App;
