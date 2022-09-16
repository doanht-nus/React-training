import React from 'react';
import ReactDOM from 'react-dom/client';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_tab: 'index',
      data : JSON.parse(localStorage.getItem('userList'))
    };

    this.handleClick = this.handleClick.bind(this);
    this.resetList = this.resetList.bind(this);
  }

  handleClick(tab){
    this.setState({
      current_tab: tab,
    })
  }

  resetList(){
    this.setState({
      data : JSON.parse(localStorage.getItem('userList'))
    })
  }

  render() {
    let content = '';
    if(this.state.current_tab === 'index'){
      content = <IndexPage userList={this.state.data} />;
    }else if(this.state.current_tab === 'create'){
      content = <CreatePage updateData={() => this.resetList}/>;
    }else if(this.state.current_tab === 'update'){
      content = <UpdatePage />;
    }
    return (
      <div>
        <button onClick={() => this.handleClick('index')}>
          Index page
        </button>
        <button onClick={() => this.handleClick('create')}>
          Create page
        </button>
        <button onClick={() => this.handleClick('update')}>
          Update page
        </button>
        {content}
      </div>
      
    );
  }
}

class IndexPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      headers : ['Name', 'Age', 'Address']
    }
  }
  render() {
    return (
      <table>
        <thead>
          <tr>{this.state.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          { this.props.userList.map(user => <User key={user.id} user={user} />) }
        </tbody>
      </table>
    );
  }
}

function User({user:{id, name, age, address} }) {
  return (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{address}</td>
            <td><button>Edit</button></td>
        </tr>
  )
}

class CreatePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id : '',
      name : '',
      age : '',
      address : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: target.value});
  }

  handleSubmit(event) {
    let userList = localStorage.getItem('userList');
    if(userList){
      userList = JSON.parse(userList);
      userList.push(this.state)
    }else{
      userList = [this.state]
    }
    localStorage.setItem('userList', JSON.stringify(userList));
    this.props.resetList();
    alert('A name was submitted: ' + this.state.id);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Id:
          <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Age:
          <input type="text" name="age" value={this.state.age} onChange  ={this.handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={this.state.address} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class UpdatePage extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        UPDATE
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UserPage />);
