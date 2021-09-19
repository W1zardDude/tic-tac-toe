import React, { Component } from 'react';
import Board from '../board/board';
import calculateWinner from '../calculateWinner/calculateWinner';

const ai = require('tictactoe-complex-ai');

export default class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill('')
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        aiInstance: ai.createAI(
          {
            level: "easy"
          }),
        winner: false
      }
    }

    

    componentDidUpdate() {
      console.log("componentDidUpdate", this.state)
      
      const { history, aiInstance, xIsNext, winner } = this.state;
      if(!xIsNext && !winner){
        const current = history[history.length - 1].squares;
        console.log(current, "current");
  
      
        aiInstance.play(current).then(pos => {
  
          console.log('AI plays on the position '+pos);
          current[pos] = 'O';
          this.setState({
            history: history.concat([
              {
                squares: current
              }
            ]),
            stepNumber: history.length,
            xIsNext: !this.xIsNext
          });
          
        }).catch((err) => {
          console.log('An error occurred.', err);
        });
      }
    } 
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    componentDidMount() {
      console.log('props:', this.props.level)
    }
  
    jumpTo(step) {
      console.log("Jump")
      console.log("historyJump", this.state.history.slice(0, step))
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
  
    render() {
      console.log('render', this.state.level)
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
        this.setState({
          winner: true
        })
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }