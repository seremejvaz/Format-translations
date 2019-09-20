import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      result: undefined,
      tempObj: {}
    };
  }
  
  keysNotToFlatten = ["bars", "formBar"];

  handleText = (obj) =>{
    const objParse = JSON.parse(obj);
    const result = {};
    this.update(objParse, result);
    console.log('resultObj', result)
    this.setState({result: result});
    return this.state.result;
  };

  update = (objText, result = {}) => {
    const keys = Object.keys(objText);

    const tempResultObj = keys.map(key => {
      if(objText[key] instanceof Object){
        if(this.keysNotToFlatten.includes(key)){
          result[key] = objText[key]
        }
        else {
          this.update(objText[key], result);
        }
      }
      else{
        result[key] = objText[key];
      }
    })
  };

  render() {
    return (
      <div 
      style={{display:'flex', flexDirection:'row'}}
      >
        <textarea
        value={this.state.text}
        onChange={(e)=> this.setState({text:e.target.value})}
        style={{height:'500px', width:'250px', margin:'20px'}}
        >
        </textarea>
        <button
        onClick = {() => this.handleText(this.state.text)}
        style={{height:'50px', width:'50px', margin:'20px'}}
        placeholder='execute'
        />
        <textarea 
        style={{height:'500px', width:'250px', margin:'20px'}}
        value={JSON.stringify(this.state.result)}
        >
        </textarea>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));