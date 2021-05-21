import React, {Component} from 'react'
import {render} from 'react-dom'

import PropTypes from 'prop-types';

import ReactEncrypt from 'react-encrypt'

class Renderer extends Component{
  
  static contextTypes = {
    encrypt: PropTypes.func.isRequired,
    decrypt: PropTypes.func.isRequired,
  }
  
  
  state = {
    pureText: this.props.text,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.pureText !==this.props.text) {
      this.setState({pureText: this.props.text})
      let encryptData=this.context.encrypt(this.state.pureText)
      // this.props.onStepChange(encryptData)
      this.props.onStepChange(this.context.decrypt(encryptData))
    }
  }
  onChange = event => {
    
    const {
      name,
      value,
    } = event.target;
    
    this.setState({
      [name]: value,
    });
  
  }
  
  render(props){
    
    
    const {
      pureText,
    } = this.state;
    
    
    const {
      encrypt,
      decrypt,
    } = this.context;
    
    
    let encryptedText
    let decryptedText
    
    
    encryptedText = encrypt(pureText);
    decryptedText = decrypt(encryptedText);
    
    
    return <div>
      {/* {this.props.onStepChange(encryptedText)} */}
      <div>
        
        <h3>
          Pure text
        </h3>
        
        <textarea
          style={{
            width: "100%",
            height: 100,
          }}
          name="pureText"
          value={pureText}
          onChange={this.onChange}
        />
      
      </div>

      <div>

        <h3>
          Encrypted text
        </h3>
        
        <textarea
          style={{
            width: "100%",
            height: 100,
          }}
          value={encryptedText || ""}
          disabled
        />
       {/* {this.props.onStepChange(encryptedText)} */}
      </div>

      <div>

        <h3>
          Decrypted text
        </h3>

        <textarea
          style={{
            width: "100%",
            height: 100,
          }}
          value={decryptedText || ""}
          disabled
        />

      </div>
 

    </div>

  }
}
export default Renderer