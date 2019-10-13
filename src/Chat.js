import React from 'react';
import MessageList from './components/MessageList'
import SendMessageForm from "./components/SendMessageForm"
import Chatkit from "@pusher/chatkit-client";
import {tokenUrl, instanceLocator} from './config'
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';


import './App.css'




class Chat extends React.Component {

  constructor() {
    super()
      this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
      }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'ethan',
      tokenProvider: new Chatkit.TokenProvider({url: tokenUrl})
    })

  
  chatManager.connect()
  .then(currentUser => {
    this.currentUser = currentUser
    this.getRooms()
  })
  }

  sendMessage(text, RoomId) {
    this.currentUser.sendMessage({
      text: text,
      roomId: String(this.state.roomId)
    })
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoomMultipart({
      roomId: String(roomId),
      hooks: {
        onMessage: message => {
          this.setState({
          messages: [...this.state.messages, message]
          })
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: String(room.id),
      })
      this.getRooms()
    })
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms: joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err => console.log("error on joinable rooms ", err))
  }

  createRoom(name) {
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log("couldn't create room", err))
  }

  render() {
    return(
      <div className='App'>
        <MessageList messages={this.state.messages}
        roomId= {this.state.roomId} />
        <SendMessageForm sendMessage={this.sendMessage}
        disabled={!this.state.roomId}/>
        <RoomList subscribeToRoom= {this.subscribeToRoom} 
        roomId={this.state.roomId}
        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <NewRoomForm createRoom={this.createRoom} />
       </div>
    )
  }
}

export default Chat;

