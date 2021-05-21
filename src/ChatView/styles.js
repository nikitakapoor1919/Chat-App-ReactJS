const styles = theme => ({

    content: {
      height: 'calc(100vh - 120px)',
      overflow: 'auto',
      padding: '25px',
      marginLeft: '250px',
      boxSizing: 'border-box',
      overflowY: 'scroll',
      top: '50px',
      width: 'calc(100% - 250px)',
      position: 'absolute',
      '@media screen and (max-width: 1024px)': {
        width: 'calc(100%)',
        marginLeft: '0px',
        top:"84px",
        height: 'calc(100vh - 140px)',
      }
    },
    contentNS: {
      height: 'calc(100vh - 100px)',
      overflow: 'auto',
      padding: '25px',
      marginLeft: '250px',
      boxSizing: 'border-box',
      top: '50px',
      width: 'calc(100% - 250px)',
      position: 'absolute',
      '@media screen and (max-width: 1024px)': {
        width: 'calc(100%)',
        marginLeft: '0px',
      }
    },
    userSent: {
      float: 'right',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '20px',
      backgroundColor: '#128C7E',
      color: 'white',
      width: '250px',
      borderRadius: '10px',
      opacity:'0.8',
      marginBottom:'20px',
      '@media screen and (max-width: 1024px)': {
       width: '140px',
      }
    },
  
    friendSent: {
      marginBottom:'20px',
      float: 'left',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '20px',
      backgroundColor: '#6D6E73CC',
      color: 'white',
      width: '250px',
      borderRadius: '10px',
      '@media screen and (max-width: 1024px)': {
        width: '140px',
      }
      
    },
  
    chatHeader: {
      width: 'calc(100% - 250px)',
      height: '84px',
      background:'#075E54',
      position: 'fixed',
      marginLeft: '250px',
      fontSize: '18px',
      top:'0',
      // textAlign: 'center',
      color: 'white',
      paddingTop: '10px',
      boxSizing: 'border-box',
      zIndex:'99',
      '@media screen and (max-width: 1024px)': {
        // width: 'calc(100%)',
        marginLeft: '100px',
      }
      
    },
    green: {
      color: '#fff',
      backgroundColor: '#4caf50'
    },
   list:{
    marginLeft:50
   },
   image:{
     height:'300px',
     width:'250px',
     '@media screen and (max-width: 1024px)': {
      width: '170px',
     marginLeft: '-30px',
     }
 
   },
  });
  
  export default styles;