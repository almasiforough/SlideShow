
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextCard from './cards/TextCard'
import SelectCard from './cards/SelectCard';
import CheckBoxCard from './cards/CheckBoxCard'
import SliderCard from './cards/SliderCard';
import SummeryCard from '../component/cards/SummeryCard';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}
let jsonObj=[];
class SimpleSlider extends Component {
  state = {
    buttonFlag: true,
    cardNumbers: this.props.question.length
  }
  makeJson = () => {
    this.props.type.map((element, index)=> { 
      switch (element) {
        case "select":
          jsonObj[index]={
            "question": this.props.question[index],
            "answer": {"text":this.props.answer[index].text} ,
            "type":this.props.type[index],
            "abbreviation":this.props.abbreviation[index],
            "optin":this.props.option[index],
            "lable":this.props.lable[index]
          }
          break;
        case "checkbox":
          jsonObj[index]={
            "question": this.props.question[index],
             "answer": {"text":[this.props.answer[index].text.map((item,innerIndex)=>{
               return{
                "selected":this.props.answer[index].text[innerIndex].selected,
                "text":this.props.answer[index].text[innerIndex].text
                }
              }
             )]
            } ,
            "type":this.props.type[index],
            "abbreviation":this.props.abbreviation[index],
          }
          break;
        case "slider":
          jsonObj[index]={
            "question": this.props.question[index],
            "answer": {"text":this.props.answer[index].text} ,
            "type":this.props.type[index],
            "abbreviation":this.props.abbreviation[index],
            "lable":this.props.lable[index]
          }
          break;
        case "text":
          jsonObj[index]={
            "question": this.props.question[index],
            "answer": {"text":this.props.answer[index].text} ,
            "type":this.props.type[index],
            "abbreviation":this.props.abbreviation
            
          }
          break;
        default:
          break;
      }
    })
    
  }
  handler = () => {
    this.setState({
      buttonFlag: false
    })
    this.slider.slickNext();
    this.props.handlerChange();
    setTimeout(() => { this.setState({ buttonFlag: true }) }, 600);
  }
  goToSlid = (index) => {
    this.slider.slickGoTo(index)
  }
  finalClick=()=>{
    this.makeJson();
    this.props.onClose();
    console.log('jsonObj',JSON.stringify(jsonObj));
  }
  render() {  
      
    const settings = {
      dots: false,
      swipe: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SamplePrevArrow />,
      prevArrow: <SamplePrevArrow />,
    }
    return (
      <div>
        <h5 style={{ color: "rgba(175,213,191)" }}> Online Assistant</h5>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          {
            this.props.type.map((e, i) => {
              switch (e) {
                case "select":
                  return <div key={i}><SelectCard id={i} key={i} /></div>
                case "checkbox":
                  return <div key={i}><CheckBoxCard id={i} key={i} /></div>
                case "slider":
                  return <div key={i}><SliderCard id={i} key={i} /></div>
                case "text":
                  return <div key={i}><TextCard id={i} key={i} /></div>
                default:
                  break;
              }
            })
          }
          <div>
            <SummeryCard goToSlid={this.goToSlid} />
          </div>
        </Slider>

        <Button 
          style={{
          maxWidth: '500px',
          maxHeight: '40px',
          width: '120px',
          height:'40px',
          marginBottom: '10px',
          marginTop: '-25px',
          backgroundColor: "#00994d",
          color:"white"
        }}
          disabled={this.state.buttonFlag ? false : true}
          onClick={this.props.cardIndex === this.state.cardNumbers ? 
          this.finalClick: 
          this.handler}>
          {(this.props.cardIndex === (this.state.cardNumbers)) ? "Finish" : "Next"}
        </Button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cardIndex: state.cardIndex,
    question: state.question,
    answer: state.answer,
    type: state.type,
    abbreviation:state.abbreviation,
    lable: state.lable,
    option: state.option
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlerChange: () => {
      return dispatch({ type: 'CHANGE_CARDINDEX', payload: 1 })

    },
    onClose: () => {
      dispatch({ type: 'CHANGE_ISMAINPAGE', payload: true })
      dispatch({ type: 'RESET_CARDINDEX', payload: 0 })
      
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SimpleSlider)
