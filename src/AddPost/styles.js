const styles = theme => ({
    root: {
        maxWidth: 700,
        margin:'0 auto',
        '@media screen and (max-width: 1024px)': {
            width: '400px'
          }
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      avatar: {
        backgroundColor: 'red',
        textTransform:'capitalize'
      },
      colorR:{
        color:'red'
      },
      colorW:{
        color:'gray'
      },
      appBar: {
        position: 'relative',
        background:'#075E54',
        height:"84px"
      },
      add:{
        color: 'white',
        marginTop: '10px',
        cursor: 'pointer',
        fontSize: '30px',
      },
      title: {
        color:"white"
      },
  });
  
  export default styles;