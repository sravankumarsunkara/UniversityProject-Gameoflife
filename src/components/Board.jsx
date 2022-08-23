import React, { Component } from 'react';
import Grid from './Grid.jsx';

class Board extends Component {
	// constructir call to handle the existing current state
	constructor(props) {
		super(props);
		this.state = {
			rows: 10,
			columns: 10,
			grid: [],
			intervalId: 0,
			generation: 0
		};
		this.makeGrid = this.makeGrid.bind(this);
		this.step = this.step.bind(this);
		this.count = this.count.bind(this);
		this.firstgeneration = this.firstgeneration.bind(this);
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.toggleCell = this.toggleCell.bind(this);
		this.reset = this.reset.bind(this);
	}

	componentDidMount() {
		this.reset();
	}
    //function to build a grid using the no of rows and columns
	makeGrid() {
		const { columns, rows } = this.state;
		let grid = new Array(columns);
		for (let i = 0; i < grid.length; i++) {
			grid[i] = new Array(rows);
		}
		return grid;
	}

	step() {
		let next = this.makeGrid();
		const { grid, columns, rows, generation } = this.state;

		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				let state = grid[i][j];
				let neighbors = this.count(grid, i, j);
                 // Implementing the Rules of Life
				 // A new cell is born
				if (state === 0 && neighbors === 3) {
					next[i][j] = 1;
					// Cell is lonely and dies and Cell dies due to over and less population
				} else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
					next[i][j] = 0;
				} else {
					// Remains the same state 
					next[i][j] = state;
				}
			}
		}
		this.setState({ grid: next, generation: generation + 1 });
	}
	// checking through every cell
    // finding no Of Neighbours that are alive
	count(grid, x, y) {
		const { columns, rows } = this.state;
		let sum = 0;
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let col = (x + i + columns) % columns;
				let row = (y + j + rows) % rows;

				sum += grid[col][row];
			}
		}
        // The cell needs to be subtracted from
		// its neighbours as it was counted before
		sum -= grid[x][y];
		return sum;
	}
  //initial state of grid with different randsom numbers
	firstgeneration() {
		const { columns, rows, grid } = this.state;
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				grid[i][j] = Math.round(Math.random());
			}
		}
		this.setState({ grid });
	}
    //setting the grid interval for every 100secs 
	//clearing the interval parallel
	play() {
		clearInterval(this.state.intervalId);
		const intervalId = setInterval(this.step, 100);
		this.setState({ intervalId });
	}
   //pause the grid flow by clearInterval
	pause() {
		clearInterval(this.state.intervalId);
	}
   //setting back to the existing /previous state
	reset() {
		const { columns, rows } = this.state;
		let grid = this.makeGrid();
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				grid[i][j] = 0;
			}
		}
		this.setState({ grid, generation: 0 });
	}
    // toggle function is to mark or populate the cells of the grid
	toggleCell(x, y) {
		const { grid } = this.state;
		grid[x][y] = grid[x][y] ? 0 : 1;
		this.setState({ grid });
	}
    state = {
		color: 'red'
	  }
	  onChange = () => {
		 this.setState({ color: 'green' });
	  }
	render() {
		const { grid, columns, rows, generation } = this.state;
		return (
			<div style={{ textAlign: 'center'}} onClick={this.onChange}>
				<button className="button1" onClick={this.step}>STEP</button>
				<button className="button2" onClick={this.firstgeneration}>RANDOMIZE</button>
				<button className="button3" onClick={this.play}>PLAY</button>
				<button className="button4" onClick={this.pause}>STOP</button>
				<button className="button5" onClick={this.reset}>RESET</button>
				<Grid
					grid={grid}
					columns={columns}
					rows={rows}
					onToggleCell={this.toggleCell}
				/>
				<p>Generation: {generation}</p>
			</div>
		);
	}
}

export default Board;
