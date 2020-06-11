import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SldeView from './Slideview'
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: '90vw',
      maxWidth: '520px',
      maxHeight: '80vh',
      minHeight:'500px'
    },
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    width: "40px",
    height: "40px"
  },
}));
function QuestionPaper(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={10}>
        <Fab color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={props.onClickHandler}>
          <CloseIcon />
        </Fab>
        <SldeView />
      </Paper>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isMainPage: state.isMainPage,
    cardIndex: state.cardIndex
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onClickHandler: () => {
      dispatch({ type: 'CHANGE_ISMAINPAGE', payload: true })
      dispatch({ type: 'RESET_CARDINDEX', payload: 0 })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPaper)
