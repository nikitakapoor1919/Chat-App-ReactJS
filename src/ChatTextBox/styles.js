const styles = theme => ({

    sendBtn: {
      color: 'blue',
      cursor: 'pointer',
      '&:hover': {
        color: 'gray'
      }
    },
  
    chatTextBoxContainer: {
      position: 'absolute',
      bottom: '15px',
      left: '315px',
      boxSizing: 'border-box',
      overflow: 'auto',
      width: 'calc(100% - 300px - 50px)',
      '@media screen and (max-width: 1024px)': {
        left: '105px',
        width: 'calc(100% - 60px - 50px)'
      }
    },
  
    chatTextBox: {
      width: 'calc(100% - 100px)'
    },
    sticker:{
      height:'30px',
      cursor:'pointer'
    },
    listSticker:{
      position: 'fixed',
      bottom: '50px',
      zIndex: '99',
      width: '100%',
      height: '150px',
      background:'white'
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
     stickers:{
      height:'100px',
      width:'200px',
      position:'relative',
      top:'0px',
      cursor:'pointer',
      '@media screen and (max-width: 1024px)': {
        width:'100px',
      }
     }
  });
  
  export default styles;