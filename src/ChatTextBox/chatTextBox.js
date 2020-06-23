import React from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {storage} from  '../index'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const firebase = require("firebase");
const tileData = [
  {
    img: require('../images/sticker1.png'),
    name:'sticker1.png'
  },
  {
      img:require('../images/sticker2.png'),
      name:'sticker2.png'
  },
  {
      img: require('../images/sticker3.jpg'),
      name:'sticker3.jpg'
  },
  {
      img:require('../images/sticker4.jpg'),
      name:'sticker4.jpg'
  },
  {
      img: require('../images/sticker5.jpg'),
      name:'sticker5.jpg'
  },
  {
      img:require('../images/sticker6.png'),
      name:'sticker6.png'
  },
  {
      img: require('../images/sticker7.jpg'),
      name:'sticker7.jpg'
  },
  {
      img: require('../images/sticker8.jpg'),
      name:'sticker8.jpg'
  },
  {
      img: require('../images/sticker9.jpg'),
      name:'sticker9.jpg'
  },
  {
      img: require('../images/sticker10.png'),
      name:'sticker10.png'
  },
  {
      img: require('../images/sticker11.jpg'),
      name:'sticker11.jpg'
  },
];
class ChatTextBoxComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      chatText: '',
      image:'',
      open:false,
      url:'',
      openSticker:false,
    };
  }

  render() {

    const { classes } = this.props;
    const { onClose, selectedValue, open } = this.props;

    return(
      <div className={classes.chatTextBoxContainer}>
         <Dialog    onClose={this.handleClosePic}  aria-labelledby="simple-dialog-title" open={this.state.open}>
            <Button onClick={this.handleUpload} color="primary" autoFocus>
            Send
            </Button>
         </Dialog >
        {this.state.openSticker ? 
        <div className={classes.listSticker}>
            <Button onClick={this.handleCloseSticker}  style={{textAlign:'right'}} color="primary" autoFocus>
              X
            </Button>
            <div>
            <GridList className={classes.gridList} cols={4.5}>
              {tileData.map((tile) => (
                <GridListTile key={tile.img}>
                  <span onClick={()=>this.handleUploadSicker(tile.name)} >
                  <img src={tile.img} className={classes.stickers}/>
                  </span>
                </GridListTile>
              ))}
            </GridList>
            </div>
        </div>
        :null}
        <TextField
          placeholder='Type your message...' 
          onKeyUp={(e) => this.userTyping(e)}
          id='chattextbox' 
          className={classes.chatTextBox}
          onFocus={this.userClickedInput}>
        </TextField>
        <span onClick={this.renderStickers}>
             <img  className={classes.sticker} src='https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_sticker-512.png'></img>
        </span>
        <input
            type="file"
            id='file'
            style={{ display: "none"}}
            ref={(ref) => this.upload = ref}
            onChange={this.handleChangeImage}
        />
        <AttachFileIcon
        onClick={()=>{this.upload.click()}}
        style={{marginRight:'20px',cursor:'pointer',position:'relative',top:'-5px'}}
        > 
        </AttachFileIcon>
        <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>
      </div>
    );
  }
  handleClosePic=()=>{
    this.setState({open:false})
  }
  handleUpload=()=>{
    const {image}=this.state
    console.log(image.name)
    const uploadTask=storage.ref(`${this.props.email}/${image.name}`).put(image)
    uploadTask.on('state_changed',
    (snapshot)=>{
      //progress fn
    },
    (error)=>{
      console.log(error)
    },
    ()=>{
      storage.ref(`${this.props.email}`).child(image.name).getDownloadURL().then(url=>{
          console.log(url)
           this.setState({url:url})
           this.props.submitImageFn(this.state.url);
      })
    })
    this.setState({open:false})
}
handleChangeImage=e=>{
    if(e.target.files[0]){
        const image=e.target.files[0]
        this.setState({image:e.target.files[0],open:true})
        console.log(image)
    } 
}

  userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value });
  messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
  userClickedInput = () => this.props.userClickedInputFn();
  submitMessage = () => {
    if(this.messageValid(this.state.chatText)) {
      this.props.submitMessageFn(this.state.chatText);
      document.getElementById('chattextbox').value = '';
    }
  }
  renderStickers=()=>{
    this.setState({openSticker:true})
  }
  handleCloseSticker=()=>{
    this.setState({openSticker:false})
  }
  handleUploadSicker=(image)=>{
    console.log(image)
    this.props.submitStickerFn(image);
    console.log('Send to Dashboard')
    this.setState({openSticker:false})
}
}

export default withStyles(styles)(ChatTextBoxComponent);