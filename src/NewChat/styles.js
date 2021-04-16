const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing() * 3,
      marginRight: theme.spacing() * 3,
      [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      position:'absolute',
      top:'150px',
      left:'400px',
      filter: 'drop-shadow(5px 5px 5px #514e4e)',
      margin:"0 auto",
      height:"auto",
      background:'#e3eae5',
      width:"50%",
      padding:'20px',
      '@media screen and (max-width: 1024px)': {
        width:"90%",
        left:20,
      }
    },
    input: {
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(),
    },
    submit: {
      marginTop: theme.spacing() * 3
    },
    errorText: {
      color: 'red',
      textAlign: 'center'
    }
  });
  
  export default styles;