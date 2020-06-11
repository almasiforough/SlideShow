import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "auto",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function NativeSelects(props) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel >{props.lable[props.id]}</InputLabel>
      <Select
        native
        defaultValue={props.answer[props.id].text}
        inputProps={{
          name: props.lable[props.id],
          id: 'uncontrolled1-native',
        }}
        onChange={(e) => { props.onChengSelect(e, props.id) }}
      >
        <option aria-label="None" value="" />
        {props.option[props.id].map((element, index) => {
          return <option value={element} key={index}>{element}</option>
        })}
      </Select>
    </FormControl>

  );
}
const mapStateToProps = (state) => {
  return {
    answer: state.answer,
    type: state.type,
    option: state.option,
    lable:state.lable
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChengSelect: (e, index) => {
      dispatch({ type: 'CHANGE_SELECT', payload: e.target.value, index: index })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NativeSelects)