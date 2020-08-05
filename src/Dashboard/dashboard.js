import React from 'react';
import NewChatComponent from '../NewChat/newChat';
import ChatListComponent from '../ChatList/chatList';
import ChatViewComponent from '../ChatView/chatView';
import ChatTextBoxComponent from '../ChatTextBox/chatTextBox';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import Info from '../Profile/Info'
import moment from 'moment'

const firebase = require("firebase");


class DashboardComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      friends: [],
      chats: [],
      friendName:'',
      about:'',
      pic:'',
      aboutS:'',
      picS:'',
      myabout:'',
      mypic:'',
      users:[],
      docid:'',
      myemail:'',
      user1:false,
      user2:false
    };
  }

  render() {

    const { classes } = this.props;

    if(this.state.email) {
      return(
        <div className='dashboard-container' id='dashboard-container' >
          <ChatListComponent history={this.props.history} 
            userEmail={this.state.email} 
            selectChatFn={this.selectChat} 
            chats={this.state.chats} 
            selectedChatIndex={this.state.selectedChat}
            newChatBtnFn={this.newChatBtnClicked}>
          </ChatListComponent>
          {
            this.state.newChatFormVisible ? null : <ChatViewComponent 
              user={this.state.email} 
              chat={this.state.chats[this.state.selectedChat]}
             >
            </ChatViewComponent>
          }
          { 
            this.state.selectedChat !== null && !this.state.newChatFormVisible ? 
            <ChatTextBoxComponent userClickedInputFn={this.messageRead} submitMessageFn={this.submitMessage} email={this.state.email}  submitImageFn={this.submitImage} submitStickerFn={this.submitSticker}>
            </ChatTextBoxComponent> :  this.state.newChatFormVisible ? null :<Info getStatusAbout={this.statusAbout} getStatusPic={this.statusPic}/>
          }
          
          {
            this.state.newChatFormVisible ? <NewChatComponent goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}></NewChatComponent> :null
          }
          {/* <Button onClick={this.signOut} className={classes.signOutBtn}>Sign Out</Button> */}
        </div>
      );
    } 
    else {
      return(<div className={classes.loading}>LOADING...</div>);
    }
  }
  statusAbout=(about,email)=>{
    this.setState({myabout:about,myemail:email})
    console.log(this.state.myabout)
    console.log(this.state.myemail)
  }
  statusPic=(pic)=>{
    this.setState({mypic:pic})
    console.log(this.state.mypic)
    this.updateProfile()
  }
  signOut = () => firebase.auth().signOut();
  submitSticker=(sticker)=>{
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat]
      .users
      .filter(_usr => _usr !== this.state.email)[0])
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          sticker: sticker,
          timestamp:  moment().valueOf().toString()
        }),
        receiverHasRead: false
      });
  }
  submitImage=(url)=>{
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat]
      .users
      .filter(_usr => _usr !== this.state.email)[0])
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          image: url,
          timestamp:  moment().valueOf().toString()
        }),
        receiverHasRead: false
      });
  }
  submitMessage = (msg) => {
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat]
      .users
      .filter(_usr => _usr !== this.state.email)[0])
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: msg,
          timestamp:  moment().valueOf().toString(),
        }),
        receiverHasRead: false
      });
  }

  // Always in alphabetical order:
  // 'user1:user2'
  buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });

  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await 
    firebase
    .firestore().collection('users').doc(chatObj.sendTo)
   .get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
        this.setState({about: doc.data().about,
        pic:doc.data().pic})
        console.log(doc.data())
        }
    })
    await 
    firebase
    .firestore().collection('users').doc(this.state.email)
   .get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
        this.setState({aboutS: doc.data().about,
        picS:doc.data().pic})
        console.log('My data',doc.data())
        }
    })
 
    await 
    console.log('Save Data')
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .set({
          messages: [{
            message: chatObj.message,
            sender: this.state.email,
            timestamp: Date.now(),
          }],
          user1:[{
             email:this.state.email,
             about:this.state.aboutS,
             pic:this.state.picS
          }],
         user2:[{
             email:chatObj.sendTo,
             about:this.state.about,
             pic:this.state.pic
          }],
          users: [this.state.email, chatObj.sendTo],
          receiverHasRead: false
        })
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);

  }
  find=async (_usr)=>{
    await 
    firebase
    .firestore().collection('users').doc(_usr)
   .get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
        this.setState({about: doc.data().about,
        pic:doc.data().pic})
        console.log(doc.data())
        }
    })
  }
  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  }

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(':');
    const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  }

  messageRead = () => {
    const chatIndex = this.state.selectedChat;
    const docKey = this.buildDocKey(this.state.chats[chatIndex].users.filter(_usr => _usr !== this.state.email)[0]);
    if(this.clickedMessageWhereNotSender(chatIndex)) {
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log('Clicked message where the user was the sender');
    }
  }

  //Get Notification when new msg recieved and get new msg
  clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;
  
  buildDocKeyStart =()=>{
    this.state.users.map((friend, _index) => {
      return (
        <div key={_index}>
          {/* { 
            console.log('Dockeys',[this.state.email, friend.email].sort().join(':'))
          } */}
          {
            firebase
            .firestore()
            .collection('chats')
            .where('users', 'array-contains', this.state.email)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.setState({docid:doc.id})
                console.log('DocId:',doc.id)
              })
            })
          }

        </div>
      )
  })
  }
  updateData=()=>{
    {this.state.user1?
      firebase
      .firestore()
      .collection('chats')
      .doc(this.state.docid)
      .update({
          user1:[{
          about:this.state.myabout,
          email:this.state.email,
          pic:this.state.mypic,
        }]
      }):
      firebase
      .firestore()
      .collection('chats')
      .doc(this.state.docid)
      .update({
          user2:[{
          about:this.state.myabout,
          email:this.state.email,
          pic:this.state.mypic,
        }]
      })
    }
    {this.state.user2?
      firebase
      .firestore()
      .collection('chats')
      .doc(this.state.docid)
      .update({
          user2:[{
          about:this.state.myabout,
          email:this.state.email,
          pic:this.state.mypic,
        }]
      })
     :
     firebase
     .firestore()
     .collection('chats')
     .doc(this.state.docid)
     .update({
         user1:[{
         about:this.state.myabout,
         email:this.state.email,
         pic:this.state.mypic,
       }]
     })
    }
    this.setState({user1:false,user2:false})
  }
  updateProfile=()=>{
  //  const docKey = this. buildDocKeyStart();
  firebase
  .firestore()
  .collection('chats')
  .where('users', 'array-contains', this.state.email)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      this.setState({docid:doc.id})
      console.log('DocId:',doc.id)
      console.log('user1:',doc.data().user1[0].email)
      console.log('user2 :',doc.data().user2[0].email)
      if(this.state.email[0].split('')[0]===doc.data().user1[0].email[0].split('')[0]){
        this.setState({user1:true})
        console.log('I m user1')
      } 
      else{
        this.setState({user2:true})
      }
      this. updateData()
      
    })
  })
  }
  componentDidUpdate=()=>{
    //this.updateProfile()
  }
  componentWillMount = () => {
      firebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr)
          this.props.history.push('/login');
        else {
          await firebase
            .firestore()
            .collection('chats')
            .where('users', 'array-contains', _usr.email)
            .onSnapshot(async res => {
              const chats = res.docs.map(_doc => _doc.data());
              await this.setState({
                email: _usr.email,
                chats: chats,
                friends: [],
              });
            })
            await firebase
            .firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
              querySnapshot.docs.forEach(doc => {
                this.state.users.push(doc.data());
            });
          });
          console.log('Users',this.state.users)
        }
    });
  }
}

export default withStyles(styles)(DashboardComponent);