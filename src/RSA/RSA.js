import React, {Component} from 'react'
import ReactEncrypt from 'react-encrypt'
import Renderer from './Renderer'

export default  class RSA extends Component {

  

  render() {
    
    const encryptKey="ewfWE@#%$rfdsefgdsf";

    return <div>
      <h1>react-encrypt demo</h1>
      
      <h3>Encrypt key: {encryptKey}</h3>

      <ReactEncrypt
        encryptKey={encryptKey}
      >
        <Renderer />
      </ReactEncrypt>

    </div>
  }
}