import React, { Component } from 'react';
import Square from '../square/square.js';


export default class Board extends Component {
    constructor(props){
        super(props);
        this.renderSquare = this.renderSquare.bind(this);
        this.boardNow = this.boardNow.bind(this);
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          key={i}
        />
      );
    }
  
    boardNow() {
        let count = 0;
        let arr = [];
        for(let i = 0; i < 3; i++) {
            let items = [];
            for(let j = 0; j < 3; j++) {
                items.push(this.renderSquare(count));
                count++;
            }
            arr.push(<div className="border-now" key={i}>{items}</div>)
        }
        return <div>{arr}</div>
    }; 
  
    render() {
      return (
        <div>
            {this.boardNow()}
        </div>
      );
    }
  }