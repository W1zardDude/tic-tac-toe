import React, {Component} from 'react'
import Game from './game/game'
import Levels from './level/level'

export default class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: false,
            level: null
        }
    }

    componentDidMount() {
        console.log('props', this.state.level)
    }

    selectLevel = (item) => {
        const newLevel = item.innerHTML.toLowerCase()
        console.log(typeof item.innerHTML.toLowerCase())
        this.setState({
            level: newLevel,
            selected: !this.state.selected
        })
    }

    render(){
        const {level, selected} = this.state
        const main = selected === true ? <Game level={level}/> : <Levels selectLevel={this.selectLevel}/>
        return (
            <>
                {main}
            </>
        )
    }
}