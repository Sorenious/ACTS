import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import Volume from "../../components/Volume";
import Ding from "./zapsplat_multimedia_game_star_win_gain_x1_12387.mp3";
import './Chat.css';

let audioElement = document.createElement("audio");
    audioElement.setAttribute("src", Ding);
    audioElement.volume = 0.2;

class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      name: '',
      slider: 0.2,
      message: '',
      users: [
        {name: 'Lloyd'},
        {name: 'Kyle'},
        {name: 'Britta'},
        {name: 'Cami'},
        {name: 'Madison'},
      ],
      messages: [
        {ts: `${new Date().getHours()}:${new Date().getMinutes()}`, name: 'Lloyd', msg:'Ciao'},
        {ts: `${new Date().getHours()}:${new Date().getMinutes()}`, name: 'Britta', msg:'Salut'},
        {ts: `${new Date().getHours()}:${new Date().getMinutes()}`, name: 'Kyle', msg:'Komichiwa'},
        {ts: `${new Date().getHours()}:${new Date().getMinutes()}`, name: 'Cami', msg:'Hi'},
        {ts: `${new Date().getHours()}:${new Date().getMinutes()}`, name: 'Madison', msg:'Hola'},
      ]
    }
  }

  componentDidMount(){
    console.log("Chat is here")
    let { socket } = this.props;

    socket.on('logged in', (data)=>{
      console.log(data)
      this.setState({ loggedIn: data.loggedIn, user: data.currentUser, messages: data.history});
    })

    socket.on('update users', data=>{
      console.log('update users')
      console.log('users', data.users)
      this.setState({ users: data.users });
    })

    socket.on('message', data=>{
      audioElement.play();
      this.setState({ messages: data });
    })
  }

  login(e){
    e.preventDefault()
    console.log('logging in')
    console.log(e)
    this.props.socket.emit('login', this.state.name)
  }

  sendMsg(e){
    e.preventDefault()
    let { user, message} = this.state;
    let msg = {name: user, msg: message}
    this.props.socket.emit('send message', msg)
    this.setState({ message: '' });
  }

  handleInput(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSlider = (event, value) => {
    this.setState({slider: value});
    audioElement.volume = this.state.slider;
  };

  render() {
    let { users, messages} = this.state;
    
    const displayUsers = users.map((user, i)=><div className='user' key={i}>{user.name}</div>)

    let displayMsg = messages.map((msg, i)=><div className='message' key={i}><span>{msg.timestamp}→</span><span>{msg.name}:</span><span>{msg.msg}</span></div>)
    displayMsg.reverse();

    return (
      <div className="Chat">
        {
          this.state.loggedIn
          ?
          <div className="main-content">
            <section className="users-box">
              
              <div className="users-list">
                {displayUsers}
              </div>
            </section>
            <section className="chat-area">
              <div className="message-area">
                {displayMsg}
              </div>
            <Volume 
              value={this.state.slider}
              handleSlider={this.handleSlider}
            />
              <form onSubmit={e=>this.sendMsg(e)} className="input-box">
                <input onChange={e=>this.handleInput(e)} value={this.state.message} name='message' type="text"/>
                <button type='submit' className="submit-btn">Send</button>
              </form>
            </section>
          </div>
          :
          <div className="login-all">
            <form onSubmit={e=>this.login(e)} className="login">
              <div className="input-group">
                <label htmlFor="">Name</label>
                <input onChange={e=>this.handleInput(e)} value={this.state.name} type="text" name='name' className="username"/>
              </div>
              <button type='submit' className="login-button">Login</button>
            </form>
          </div>
        }
      </div>
    );
  }
}

export default socketConnect(Chat);
