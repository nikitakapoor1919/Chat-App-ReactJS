import React, { Component } from 'react'
import AppBar from './AppBar'
import Card from './Card'

const firebase = require("firebase");

export class post extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            about:'',
            email:'',
            name:'',
            url:''
        }
    }
    
    render() {
        return (
            <div style={{background:'url(https://i.pinimg.com/originals/45/ce/c7/45cec757faf8d07318cc829dcf21c697.jpg)'}}>
                <AppBar email={this.state.email} name={this.state.name} url={this.state.url}/>
                <br/><br/><br/><br/>
                <Card email={this.state.email} name={this.state.name} url={this.state.url} />
                <br/><br/>
            </div>
        )
    }
    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
          if(!_usr)
           this.props.history.push('/login');
         else {
              {this.setState({email:_usr.email})}
            firebase
            .firestore().collection('users').doc(_usr.email)
           .get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                    this.setState({
                        about:doc.data().about,
                        value:doc.data().about,
                        email:doc.data().email,
                        name:doc.data().name,
                        url:doc.data().pic
                    })
                console.log('Document data:', doc.data());
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
          }
      });
    }
}

export default post
