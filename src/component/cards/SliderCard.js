import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CustomizedSlider from '../input/Slider'
import 'fontsource-roboto';
import {connect} from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth:"90vh",
    borderBlockEnd:0,
    padding:"10px"
  },
});

 function SliderCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}  variant="outlined">
      <CardContent>
      <Typography  component="h4">
      {props.question[props.id]}
        </Typography>
       <CustomizedSlider id={props.id}/>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
const mapStateToProps=(state)=>{
  return{
    lastCard:state.lastCard,
    cardIndex:state.cardIndex,
    question:state.question
  }
}
export default connect(mapStateToProps) (SliderCard)
