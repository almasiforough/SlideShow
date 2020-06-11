const initialState = {
  lastCard: false,
  cardIndex: 0,
  isMainPage: true,
  abbreviation: [],
  question: [],
  answer: [],
  type: [],
  lable: [],
  minmax: []
}
const reducer = (state = initialState, action) => {
  const newState = {
    ...state
  };
  switch (action.type) {
    case 'INITIAL_QUESTIONS': {
      newState.question = action.payload
      break;
    }
    case 'INITIAL_OPTION': {
      newState.option = action.payload
      break;
    }
    case 'INITIAL_ANSWERS': {

      newState.answer = action.payload
      break;
    }
    case 'INITIAL_ABBREVATION': {
      newState.abbreviation = action.payload
      break;
    }
    case 'INITIAL_TYPE': {
      newState.type = action.payload
      break;
    }
    case 'INITIAL_LABLE': {
      newState.lable = action.payload
      break;
    }
    case 'INITIAL_MINMAX': {
      newState.minmax = action.payload
      break;
    }

    case 'CHANGE_LASTCARD': {

      newState.lastCard = action.payload
      break;
    }
    case 'CHANGE_CARDINDEX': {
      newState.cardIndex = newState.cardIndex + action.payload;
      break;
    }
    case 'CHANGE_ISMAINPAGE': {
      newState.isMainPage = action.payload;
      break;
    }
    case 'RESET_CARDINDEX': {
      newState.cardIndex = action.payload;
      break;
    }
    case 'CHANGE_TEXEFIELD': {
      newState.answer[action.index].text = action.payload;
      break;
    }
    case 'CHANGE_SLIDER': {
      return {
        ...state,
        answer: state.answer.map(
          (content, i) => i === action.index ? {
            ...content,
            text: action.payload
          } :
            content
        )
      }
    }
    case 'CHANGE_CHECKBOX': {
      return {
        ...state,
        answer: state.answer.map(
          (content, i) => i === action.index ? {
            ...content,
            text: content.text.map((contentinner, j) => j === action.index2 ? {
              ...contentinner,
              selected: action.payload
            } : contentinner)
          } :
            content
        )
      }
    }
    case 'CHANGE_SELECT': {
      newState.answer[action.index].text = action.payload;
      break;
    }
    default:
      break;
  }
  return newState;
}
export default reducer
