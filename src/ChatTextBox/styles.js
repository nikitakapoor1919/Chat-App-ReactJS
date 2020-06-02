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
        width: 'calc(100% - 50px)',
        left:'10px'
      }
    },
  
    chatTextBox: {
      width: 'calc(100% - 25px)'
    }
  
  });
  
  export default styles;