import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import trashlogo from "./assets/trash.png";
import refreshlogo from "./assets/refresh.png";
import cartlogo from "./assets/cart.png";

function Buttons(props){
  let add = "+"
  let sub = "-"
  let trash = "trash"
    return (
      <div className="buttons">
        <button key={add} className="add" onClick={props.onClickAdd}>
          {add}
        </button>
        <button key={sub} className="sub" onClick={props.onClickSub}>
        {sub}
      </button>
      <button key={trash} className="trash" onClick={props.onClickTrash}>
          <img src={trashlogo} alt="trash" width={20}/>
      </button>
    </div>
    );
}
function Item(props){
  return(
        <Buttons
          item = {props.item}
          onClickAdd = {()=>{
            props.onClickAdd()
          }}
          onClickSub = {()=>{
            props.onClickSub()
          }}
          onClickTrash = {()=>{
            props.onClickTrash();
          }}
        />
    );
}
class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Cookies",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    this.setState({value: event.target.value});
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {"Choose an Item: "}
          <select value={this.state.value} onChange={this.handleChange}>
          <optgroup label="Snacks">
              <option value="Chocolate">Chocolate</option>
              <option value="Cookies">Cookies</option>
              <option value="Chips">Chips</option>
              <option value="Gummy">Gummy</option>
            </optgroup>
            <optgroup label="Fruits">
              <option value="Grapefruit">Grapefruit</option>
              <option value="Lime">Lime</option>
              <option value="Coconut">Coconut</option>
              <option value="Mango">Mango</option>
            </optgroup>
          </select>
        </label>
        <input type="submit" value=" Add to Cart" />
      </form>
    );
  }
}

class Site extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemlist: ["Cookies"],
      quantitys: ["Zero"],
     };
  }
  handleincrement(i){
    const newQuantity = [];
    const temp = this.state.quantitys[i] === "Zero" ? 1 : this.state.quantitys[i] + 1;
    for (let j = 0; j < this.state.quantitys.length; j++){
      if (i !== j){
        newQuantity.push(this.state.quantitys[j]);
      }
      else{
        newQuantity.push(temp);
      }
    }
    this.setState({
      quantitys: newQuantity,
    });
    
  }
  handledecrement(i){
    const newQuantity = [];
    const temp = this.state.quantitys[i] === "Zero" || this.state.quantitys[i] === 1 ? "Zero" : this.state.quantitys[i] - 1;
    for (let j = 0; j < this.state.quantitys.length; j++){
      if (i !== j){
        newQuantity.push(this.state.quantitys[j]);
      }
      else{
        newQuantity.push(temp);
      }
    }
    this.setState({
      quantitys: newQuantity,
    });
  }
  handleClickTrash(i){
    const itemlist = [];
    const newQuantity = [];

    for (let j = 0; j < this.state.itemlist.length; j++){
      if (i !== j){
        itemlist.push(this.state.itemlist[j]);
        newQuantity.push(this.state.quantitys[j]);
      }
    }
    this.setState({itemlist: itemlist, quantitys: newQuantity});
  }
  handleRefresh(){
    const newQuantity = [];
    for (let i = 0; i < this.state.quantitys.length; i++){
      newQuantity.push("Zero");
    }
    this.setState({quantitys: newQuantity});
  }
  handleSubmit(item){
    const newItemlist =  this.state.itemlist;
    const newQuantity = this.state.quantitys;
    if(!this.state.itemlist.includes(item)){
      newItemlist.push(item);
      newQuantity.push("Zero");
    }
    this.setState({
      itemlist: newItemlist,
      quantitys: newQuantity
    })
  }
  render(){
    const output = this.state.itemlist.map((element, index)=>{
      return (
        <div className="item" key={element}>
          <h3 className="itemname">{element}{": "}</h3>
          <h3 className="itemquantity"><p>{this.state.quantitys[index]}</p></h3>
          <Item 
            item = {element}
            onClickAdd = {()=>{
              this.handleincrement(index);
            }}
            onClickSub = {()=>{
              this.handledecrement(index);
            }}
            onClickTrash = {()=>{
              this.handleClickTrash(index);
            }}
          />
        </div>
      );
    });
  let numofItems = 0;
  for (let i = 0; i < this.state.quantitys.length; i ++){
    if (this.state.quantitys[i] !== "Zero"){
      numofItems += 1;
    }
  }
  return (
    <div className="site">
      <div className="nav">
        <img className="cart" src={cartlogo} alt="cart" width={35}/>
        <h2 className="num">{numofItems}</h2>
        <h2 className="text">{"Items"}</h2>
        <button className="refresh" onClick={()=>{this.handleRefresh()}}>
          <img src={refreshlogo} alt="refresh" width={18}/>
        </button>
      </div>
      {output}
      <ItemList
        onSubmit={(item)=>{this.handleSubmit(item)}}
      />
    </div>
    );
  }
}

ReactDOM.render(
  <Site />,
  document.getElementById('root')
);


