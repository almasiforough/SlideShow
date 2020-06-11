import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SummeryTable from '../input/SummeryTable'
import 'fontsource-roboto';
import { connect } from 'react-redux'
const useStyles = makeStyles({
  root: {
    maxWidth: "90vh",
    borderBlockEnd: 0,
    padding: "10px"
  },
});

function SummeryCard(props) {
  const classes = useStyles();

  const goToSlide = (index) => {
    props.onResetCardIndex();
    props.goToSlid(index);
  }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className="summaryContainer">
        <Typography component="h4">
          Summary Of Your Answers
        </Typography>
        <SummeryTable goToSlid={goToSlide} />
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
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
    onResetCardIndex: () => {
      dispatch({ type: 'RESET_CARDINDEX', payload: 2 });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummeryCard)
