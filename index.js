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
  
  keysNotToFlatten = ["button", "warning", "status", "error", "languages", "countries", "warningTab", "docsValidationSetup", "errors", "statusCases", "warnings", "buttons" ];

  executeFuntion = (obj) =>{
    const objParse = JSON.parse(obj);
    const result = {};
    this.update(objParse, result);
    const ordered = {};
    Object.keys(result).sort((a,b) => {
      if ( a.toLowerCase() < b.toLowerCase() ) {
      return -1;
      } else if ( a.toLowerCase() > b.toLowerCase() ) {
          return 1;
      } else {
          return 0;
      }
    }).forEach(key => {
      ordered[key] = result[key];
    });
    this.setState({result: ordered});
    return this.state.result;
  };

  update = (objText, result = {}) => {
    const keys = Object.keys(objText);
    const tempResultObj = keys.map(key => {
      
      if(objText[key] instanceof Object){
        if(this.keysNotToFlatten.includes(key)){
            result[key] = objText[key]
        }else {
          this.update(objText[key], result);
        }
      }else {
        if(!result.hasOwnProperty(key)){
          result[key] = objText[key];
        }else {
            console.log('error', key)
        }
      }
      
      
    })
  };

  resetFunction = () => {
    this.setState({text: ''})
    this.setState({result: undefined})
  }

  render() {
    return (
      <div 
      style={{display:'flex', flexDirection:'row', fontFamily: 'sans-serif'}}
      >
        <div>
          <h3
            style={{margin:'20px 20px 0px'}}
          >Add your JSON</h3>
          <textarea
            value={this.state.text}
            onChange={(e)=> this.setState({text:e.target.value})}
            style={{height:'500px', width:'250px', margin:'20px'}}
          >
          </textarea>
        </div>
        <button
          onClick = {() => this.executeFuntion(this.state.text)}
          style={{height:'50px', width:'60px', margin:'20px', alignSelf: 'center'}}
        >
          Execute
        </button>
        <button
          onClick = {() => this.resetFunction(this.state.text)}
          style={{height:'50px', width:'60px', margin:'20px', alignSelf: 'center'}}
        >
          Reset
        </button>
        <div>
          <h3
            style={{margin:'20px 20px 0px'}}
          >Result</h3>
          <textarea 
            style={{height:'500px', width:'250px', margin:'20px'}}
            value={JSON.stringify(this.state.result)}
          >
          </textarea>
        </div>
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
