  const styles = theme => ({
    table: {
        minWidth: 650,
      },
      chatSection: {
        width: '100%',
        height: '100vh'
      },
      // content: {
      //   overflow: 'auto',
      //   boxSizing: 'border-box',
      //   overflowY: 'scroll',
      // },
      colorW:{
        color:'white'
      },
      heading:{
        textTransform:'uppercase',
        textAlign:'center',
        fontWeight:800,
        color:'white'
      },
      headBG: {
          backgroundColor: '#e0e0e0'
      },
      borderRight500: {
          borderRight: '1px solid #e0e0e0',
          background:'rgba(3, 42, 51, 0.72) none repeat scroll 0% 0%',
          '@media screen and (max-width: 1024px)': {
           display:'none'
           }
      },
      messageArea: {
        height: '82vh',
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