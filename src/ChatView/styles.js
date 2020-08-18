const styles = theme => ({

    content: {
      height: 'calc(100vh - 100px)',
      overflow: 'auto',
      padding: '25px',
      marginLeft: '300px',
      boxSizing: 'border-box',
      overflowY: 'scroll',
      top: '50px',
      width: 'calc(100% - 300px)',
      position: 'absolute',
      '@media screen and (max-width: 1024px)': {
        width: 'calc(100% - 100px)',
        marginLeft: '100px',
      }
    },
    contentNS: {
      height: 'calc(100vh - 100px)',
      overflow: 'auto',
      padding: '25px',
      marginLeft: '300px',
      boxSizing: 'border-box',
      top: '50px',
      width: 'calc(100% - 300px)',
      position: 'absolute',
      '@media screen and (max-width: 1024px)': {
        width: 'calc(100% - 100px)',
        marginLeft: '100px',
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
      width: '300px',
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
      width: '300px',
      borderRadius: '10px',
      '@media screen and (max-width: 1024px)': {
        width: '140px',
      }
      
    },
  
    chatHeader: {
      width: 'calc(100% - 300px)',
      height: '84px',
      background:'#075E54',
      position: 'fixed',
      marginLeft: '300px',
      fontSize: '18px',
      textAlign: 'center',
      color: 'white',
      paddingTop: '10px',
      boxSizing: 'border-box',
      zIndex:'99',
      '@media screen and (max-width: 1024px)': {
        width: 'calc(100% - 100px)',
        marginLeft: '100px',
      }
      
    },
    green: {
      color: '#fff',
      backgroundColor: '#4caf50'
    },
   list:{
    position: 'absolute',
    top: '10px',
    left: '100px',
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