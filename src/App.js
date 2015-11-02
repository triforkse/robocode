import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import Board from './Board';
import engine from './engine/engine.js';
import {range, random} from 'lodash';
import ui from './engine/ui_actions.js'

require('./App.css');

export class App extends Component {
  constructor() {
    super();

    const levelSize = 10;
    const numRobots = 4;
    this.actions = [];

    const game = engine.createGame(levelSize, numRobots);

    const getInput = () => {
      const actions = this.actions;
      this.actions = [];
      return actions || [];
    };

    const onGameTick = (game) => {
      this.setState({game: game});
    };

    engine.run(game, onGameTick, getInput);

    this.state = {game, robotId: 0};

    document.addEventListener("keydown", (e) => {
      const D_KEY = 68;
      const ENTER_KEY = 13;

      if (e.keyCode === D_KEY) {
        console.log(this.state.game.toJS());
      }
      else if ((e.metaKey || e.ctrlKey) && e.keyCode === ENTER_KEY) {
        this.uploadAI();
      }
    });
  }

  uploadAI() {
    const robotId = +this.state.robotId;
    const code = this.refs.editor.getValue();
    const action = ui.updateRobotAI(robotId, code);
    this.actions.push(action);
  }

  selectRobot() {
    this.setState({robotId: this.refs.robotSelector.value});
  }

  render() {
    return (
      <div>
        <h1>Robocode | Death Robot Operating System</h1>
        <div className="page">
          <Board className="page__board" game={this.state.game} />
          <div className="page__editor">
            <div className="page__editor-content">
              <CodeEditor ref="editor" code={this.code} />
            </div>
            <div className="page__editor-buttons">
              <button type="button" onClick={this.uploadAI.bind(this)}>Upload AI</button>
              <select onChange={this.selectRobot.bind(this)} ref="robotSelector">
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
