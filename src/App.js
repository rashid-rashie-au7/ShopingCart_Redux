import React from 'react';
import Filter from './components/Filter';
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
  sortProducts= (event) =>  {
    console.log(event.target.value)
    const sort =event.target.value 
    this.setState((state) =>({
      sort: sort,
      prdts:this.state.prdts.slice().sort((a,b) =>
        sort === 'lowest'?
        a.priice > b.price
        ? 1
        :-1
        : sort === 'highest'
        ? a.priice < b.price
        ? 1
        :-1
        : a._id < b._id
        ? 1
        : -1
      ), 
    }));  
  };

  filterProducts = (event) => {
    console.log(event.target.value)
    if(event.target.value === "") {
      this.setState({ size: event.target.value, prdts: prdtData.products});
    }
    else {
      console.log("elseee",event.target.value )
      this.setState({
        size: event.target.value,
        prdts: prdtData.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
          ),
      });
    } 
  };
  render(){
    return (
      <div className="grid-container">
        <header className="App-header">
        <a href='/'>React Shopping Cart </a>
        </header>
        <main>
        <div className ="content">
          <div className="main">
            <Filter count={this.state.prdts.length}
            size = {this.state.size}
            sort={this.state.sort}
            filterProducts = {this.filterProducts}
            sortProducts ={this.sortProducts}
            >
            </Filter>
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
