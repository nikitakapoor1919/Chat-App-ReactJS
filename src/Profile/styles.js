const styles = theme => ({
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },  
      pic: {
        color: '#fff',
        backgroundColor: '#4caf50',
        textTransform:'uppercase',
        width: '150px',
        height: '150px',
        fontSize: '70px',
      },
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
          width: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      margin: {
        margin: theme.spacing(1),
        marginTop:'20px'
      },
      edit:{
          marginTop:'5px',
          cursor:'pointer',
          color:'gray'
      } ,
      appBar: {
        position: 'relative',
        background:'#075E54'
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
      back:{
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bolder'
      },
  });
  
  export default styles;