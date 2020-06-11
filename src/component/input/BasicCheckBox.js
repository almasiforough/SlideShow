import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontSize: 6,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
  formControl: {
    margin: theme.spacing(4, 2),
  },
}));
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      fontSize="6"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
}

function BasicCheckbox(props) {
  // slicing option array in two part
  let option = props.answer[props.id].text;
  let halfIndex = Math.round(option.length / 2);
  let option1 = option.slice(0, halfIndex);
  let option2 = option.slice(halfIndex)


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      fontSize: 6,
      justifyContent: 'center'
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));
  let arrayIndex = props.id
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* first column of checkboxes */}
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {option1.map((element, index) => {
            return <FormControlLabel key={index}
              control={<StyledCheckbox key={index} name={element.text} />}
              label={element.text}
              checked={props.answer[arrayIndex].text[index].selected}
              onChange={(e) => props.onCheckBoxChange(e, arrayIndex, index)
              }

            ></FormControlLabel>
          })}
        </FormGroup>
      </FormControl>
      {/* secon column of checkboxes */}
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {option2.map((element, index) => {
            return <FormControlLabel key={index}
              control={<StyledCheckbox key={index} name={element.text} />}
              label={element.text}
              checked={props.answer[arrayIndex].text[index + halfIndex].selected}
              onChange={(e) => props.onCheckBoxChange(e, arrayIndex, (index + halfIndex))
              }

            ></FormControlLabel>
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    answer: state.answer,
    type: state.type
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckBoxChange: (e, index, index2) => {
      dispatch({ type: 'CHANGE_CHECKBOX', payload: e.target.checked, index: index, index2: index2 })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicCheckbox)