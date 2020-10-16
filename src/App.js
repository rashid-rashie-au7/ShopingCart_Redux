import React from 'react';
import Products from './components/Products';
import prdtData from './data.json';

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      prdts: prdtData.products,
      size: "",
      sort: "",
    };
  }
  render(){
    return (
      <div className="grid-container">
        <header className="App-header">
        <a href='/'>React Shopping Cart </a>
        </header>
        <main>
        <div className ="content">
          <div className="main">
            <Products products= {this.state.prdts}></Products>
          </div>
          <div className="sidebar">
              cart items
            </div>
        </div>
        </main>
       
        <footer>
          All right reserved
        </footer>
      </div>
    );
}
}

export default App;
