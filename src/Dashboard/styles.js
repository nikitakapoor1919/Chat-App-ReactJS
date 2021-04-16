const styles = theme => ({
    signOutBtn: {
      position: 'absolute',
      bottom: '0px',
      left: '0px',
      width: '300px',
      borderRadius: '0px',
      backgroundColor: '#227092',
      height: '35px',
      boxShadow: '0px 0px 2px black',
      color: 'white',
      '&:hover':{
          opacity:'0.9',
          backgroundColor: '#227092',
      },
      '@media screen and (max-width: 1024px)': {
     //   width:'100%'
      }
    },
    menu:{
      display:"none",
      '@media screen and (max-width: 1024px)': {
        display:"block"
      }
    },
    chatHeader: {
      width: '100%',
      height: '84px',
      background:'#075E54',
      boxShadow:"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
    },
    loading:{
      display:'flex',
      justifyContent:'center',
      fontSize:'40px',
      fontFamily:'Cambria',
      position:'relative',
      LetterSpacing:'7px',
      top:'250px'
    },
    MenuIcon:{
      float: "right",
      margin: 15,
      fontSize: 30,
      color: "white"
    }
  });
  
  export default styles;