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
      }
    },
    loading:{
      display:'flex',
      justifyContent:'center',
      fontSize:'40px',
      fontFamily:'Cambria',
      LetterSpacing:'7px',
      marginTop:'250px'
    }
  });
  
  export default styles;