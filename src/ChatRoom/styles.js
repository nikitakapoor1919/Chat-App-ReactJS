  const styles = theme => ({
    table: {
        minWidth: 650,
      },
      chatSection: {
        width: '100%',
        height: '100vh'
      },
      colorW:{
        color:'white'
      },
      sendBtn: {
        color: '#075E54',
        cursor: 'pointer',
        '&:hover': {
          color: '#4caf50'
        }
      },
      chatHeader: {
        position:"fixed",
        width: '100%',
        height: '84px',
        background:'#075E54',
        boxShadow:"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
      },
      heading:{
        textTransform:'uppercase',
        textAlign:'center',
        fontWeight:800,
      },
      headBG: {
          backgroundColor: '#e0e0e0'
      },
      borderRight500: {
          borderRight: '1px solid #e0e0e0',
          background:'#e3eae5',
          '@media screen and (max-width: 1024px)': {
           display:'none'
           }
      },
      messageArea: {
        height: '75vh',
        overflowY: 'auto'
      },
      userSent: {
          marginRight:30,
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
         width: '250px',
        }
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color:"white"
      },
      back:{
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bolder'
      },
       chat:{
        '@media screen and (max-width: 1024px)': {
          flexBasis:'100%',maxWidth:'100%'
        }

       },  
      friendSent: {
        marginLeft:30,
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
          width: '250px',
        }
        
      },
  });
  
  export default styles; 