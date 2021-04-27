const styles = theme => ({
    root: {
      backgroundColor: '#e3eae5',
       height:'100%',
      position: 'absolute',
      left: '0',
      top:'0',
      width: '250px',
      boxShadow: '0px 0px 2px black',
      '@media screen and (max-width: 1024px)': {
        // width:'100px'
        display:"none"
      }
    },
    dot: {
      height: 12,
      width: 12,
      backgroundColor: "#bbb",
      borderRadius: "50%",
      display: "inline-block",
    },
    onlineDot: {
      height: 12,
      width: 12,
      backgroundColor: "#008000",
      borderRadius: "50%",
      display: "inline-block",
    },
    rootDrawer: {
      backgroundColor: '#e3eae5',
       height:'100%',
      position: 'absolute',
      left: '0',
      // top:'0',
      width: '250px',
      boxShadow: '0px 0px 2px black',
    },
    rootT: {
      backgroundColor: '#e3eae5',
       height:'100%',
      position: 'absolute',
      left: '0',
      zIndex:99,
      width: '300px',
      boxShadow: '0px 0px 2px black',
      // '@media screen and (max-width: 1024px)': {
      //   width:'300px'
      // }
    },
    listItem: {
      cursor: 'pointer',
      // '@media screen and (max-width: 1024px)':{
      //   height:'100px'
      // }
    },
    shift:{
      // '@media screen and (max-width: 1024px)':{
      //   marginLeft:100
      // }
    },
    newChatBtn: {
      borderRadius: '0px'
    },
    unreadMessage: {
      color: '#075E54',
      position: 'absolute',
      top: '0',
      right: '5px'
    },
    header:{
      background:'#075E54',
      padding:'24px'
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
      backgroundColor: '#128C7E',
      borderRadius: '50%',
      bottom: '50px',
      right: 'calc(100% - 250px)',
    },
    green: {
      color: '#fff',
      backgroundColor: '#4caf50'
    },
   
    searchIcon: {
      position: 'absolute',
      top: '33px',
      zIndex: '99',
      left: '190px',
      color: 'white',
    },
    inputRoot: {
      color: 'white',
      padding: '6px',
      border: 'none',
      fontSize: '17px',
      background: '#096A5F',
      borderRadius: '12px',
      width: '200px',
      height: '35px',
    },
    back:{
      textDecoration: 'none',
      color: 'white',
      fontWeight: 'bolder'
    },
    name:{
      // '@media screen and (max-width: 1024px)':{
      //  position:'relative',
      //  top:'40px',
      //  left:'-70px',
      // }
    },
    text:{
      // '@media screen and (max-width: 1024px)':{
      //  display:'none'
      //  }
    },
    
    time:{
      float:"right",
      fontSize:'13px',
    },
    mail:{
      whiteSpace: "nowrap",
      width: 150,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    img:{
      height:32
    }
  });
  
  export default styles;