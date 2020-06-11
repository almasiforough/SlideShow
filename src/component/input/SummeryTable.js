
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  table: {
    width: "auto",
  },
  root: {
    backgroundColor: "#e6f3ff",
    '&:hover': {
      backgroundColor: "#b7d4f3",
    }

  },
  container: {
    maxHeight: 300
  }
});

function createData(title, value, id) {
  return { title, value, id };
}

function findSelectedCheckboxes(answerArray) {
  let finalarray = answerArray.filter(element => element.selected === true);
  return finalarray.map(element => element.text)
}
function SummeryTable(props) {
  const classes = useStyles();
  const handleClick = (row) => {
    props.goToSlid(row)
    props.onResetCardIndex(row);
  }
  const rows = props.type.map((e, index) => {
    switch (e) {
      case "select": {
        return createData(props.abbreviation[index],
          <ButtonGroup variant="contained" key={index} >
            <Button className={classes.root} key={index}>
              {props.answer[index].text ? props.answer[index].text : 'Go to the form!'}
            </Button>
          </ButtonGroup>, index)
      }

      case "checkbox": {
        let selectElement = findSelectedCheckboxes(props.answer[index].text);
        if (selectElement.length > 0) {
          return createData(props.abbreviation[index], selectElement.map((element, index) =>
            <ButtonGroup variant="contained" key={index}>
              <Button className={classes.root} key={index}>{element}</Button>
            </ButtonGroup>), index)
        }
        else {
          return createData(props.abbreviation[index],
            <ButtonGroup variant="contained" key={index}>
              <Button className={classes.root} key={index}>Go to the Form!</Button>
            </ButtonGroup>, index)
        }
      }
      case "slider":
        return createData(props.abbreviation[index],
          <ButtonGroup variant="contained" key={index}>
            <Button className={classes.root} key={index}>
              {`between $${props.answer[index].text[0]} and $${props.answer[index].text[1]}`}
            </Button>
          </ButtonGroup>, index)

      case "text":
        return createData(props.abbreviation[index],
          <ButtonGroup variant="contained" key={index}>
            <Button key={index} className={classes.root}>{props.answer[index].text ? props.answer[index].text : 'Go to the form!'}
            </Button>
          </ButtonGroup>, index)
      default:
        break;
    }

  })

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table" >
        <TableHead>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.title}>
              <TableCell className="summaryTableCell" component="th" scope="row" hover="true" key={row.title}>
                < ButtonGroup disableElevation variant="contained" key={row.title}>
                  <Button style={{ backgroundColor: '#e6f3ff', minWidth: '20vh', cursor: "default" }} key={row.title}>{row.title}</Button>
                </ButtonGroup>
              </TableCell>
              <TableCell className={classes.underlinestyle} onClick={() => {
                handleClick(row.id)
              }} align="left" tabIndex={0}>
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    abbreviation: state.abbreviation,
    answer: state.answer,
    type: state.type,
    option: state.option
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onResetCardIndex: (index) => {
      dispatch({ type: 'RESET_CARDINDEX', payload: index })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SummeryTable)
