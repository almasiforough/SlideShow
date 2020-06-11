import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    marginTop: "30px",
    '& .MuiTextField-root': {
      margin: "10px",
      width: '20ch',
    },
  },
  margin: {
    height: "30px",
  }
}));

function BasicSlider(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Slider
        onChange={(e, newValue) => props.onSliderChange(newValue, props.id)}
        valueLabelDisplay="auto"
        min={props.minmax[props.id][0]}
        max={props.minmax[props.id][1]}
        getAriaLabel={index =>
          index === 0 ? "Minimum price" : "Maximum price"
        }
        value={props.answer[props.id].text}
      />
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            disabled
            id="filled-disabled"
            label={`Minimum ${props.lable[props.id]}`}
            variant="filled"
            value={`${props.answer[props.id].text[0]}$`}
          />
          <TextField
            disabled
            id="filled-disabled"
            label={`Maximum ${props.lable[props.id]}`}
            variant="filled"
            value={`${props.answer[props.id].text[1]}$`}
          />
        </div>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    answer: state.answer,
    type: state.type,
    lable: state.lable,
    minmax: state.minmax
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSliderChange: (newValue, index) => {
      dispatch({ type: 'CHANGE_SLIDER', payload: newValue, index: index })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BasicSlider)


