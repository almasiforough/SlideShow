import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '25ch',
    }
  },
}));

function BasicTextFields(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic"
        onChange={(e) => props.onTextChange(e, props.id)}
        defaultValue={props.answer[props.id].text}
      />
    </form>
  );
}
const mapStateToProps = (state) => {
  return {
    age: state.age,
    lastCard: state.lastCard,
    answer: state.answer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTextChange: (e, index) => {
      dispatch({ type: 'CHANGE_LASTCARD', payload: true })
      dispatch({ type: 'CHANGE_TEXEFIELD', payload: e.target.value, index: index })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BasicTextFields)