import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import BasicCheckbox from '../input/BasicCheckBox'
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth:"90vh",
    borderBlockEnd:0,
    padding:"10px"
  },
});

function CheckBoxCard(props) {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      variant="outlined">
      <CardContent>
        <Typography component="h4">
          {props.question[props.id]}
        </Typography>
        <BasicCheckbox id={props.id} />
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
const mapStateToProps = (state) => {
  return {
    lastCard: state.lastCard,
    cardIndex: state.cardIndex,
    question: state.question
  }
}
export default connect(mapStateToProps)(CheckBoxCard)