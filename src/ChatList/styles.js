const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0px 0px 2px black',
      '@media screen and (max-width: 1024px)': {
        width:'100%'
      }
    },
    listItem: {
      cursor: 'pointer'
    },
    newChatBtn: {
      borderRadius: '0px'
    },
    unreadMessage: {
      color: 'red',
      position: 'absolute',
      top: '0',
      right: '5px'
    },
    header:{
      background:'#1e4a9df2',
      padding:'25px'
    },
    menu:{
      position: 'absolute',
      top: '5px',
      right: '5px',
      cursor:'pointer',
      color:'white'
    },
    add:{
      color: 'white',
      marginTop: '10px',
      cursor: 'pointer',
      fontSize: '30px',
    },
    circle:{
      position: 'fixed',
      height: '50px',
      width: '50px',
      backgroundColor: '#1d4593',
      borderRadius: '50%',
      bottom: '50px',
     // left: '240px'
    right: 'calc(100% - 298px)',
    '@media screen and (max-width: 1024px)':{
      right:'2px'
    }
    },
    green: {
      color: '#fff',
      backgroundColor: '#4caf50'
    },
  });
  
  export default styles;