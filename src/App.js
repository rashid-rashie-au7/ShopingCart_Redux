import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import prdtData from './data.json';

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      prdts: prdtData.products,
      cartItems: [],
      size: "",
      sort: "",
    };
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if(item._id === product._id) {
        item.count++;
        alreadyInCart =true;
      } 
    });
    if(!alreadyInCart){
      cartItems.push({...product,count: 1});
    }
    this.setState  ({cartItems});         
  };
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
             <Products products= {this.state.prdts} addToCart={this.addToCart} ></Products>
          </div>
          <div className="sidebar">
              <Cart cartItems={this.state.cartItems} 
                    removeFromCart={this.removeFromCart}
              />
              
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
