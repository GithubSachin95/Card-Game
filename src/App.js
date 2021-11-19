import React from "react";
import Stack from "./components/Stack/Stack";
import "./App.css";

class App extends React.Component {

  constructor() {
    super();
    this.state = ({
      cards1: [],
      cards2: [],
      uniqueCards: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      stacks: [1, 2],
      stackScore1: 0,
      stackScore2: 0,
      firstCard: null,
      secondCard: null,
      isGameStarted: false
    })
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    this.resetStacks();
  }

  //function for handle click
  handleCardClick = (cardVal, stackNum) => {
    if (!this.state.isGameStarted) {
          alert("Please click on 'start game' button to play");
          return;
    }
    if (this.state.firstCard == null && stackNum == 2) {
          alert("Please first select from the 1st stack!");
          return;
    }

    stackNum == 1 ? this.setState({ firstCard: cardVal })
                  : this.setState({ secondCard: cardVal }, () => {this.compareCards();});
  }

  // starts the game
  gameStart = () => {
    this.setState({
                     isGameStarted: true,
    })
  }

  //fucntion to compare the cards
  compareCards = () => {
    let firstCard = this.state.firstCard;
    let secondCard = this.state.secondCard;

    switch (true) {
      case (firstCard > secondCard):
        this.setState({
          stackScore1: this.state.stackScore1 + 1,
        })
        break;
      case (firstCard < secondCard):
        this.setState({
          stackScore2: this.state.stackScore2 + 1,
        })
        break;
      case (firstCard === secondCard):
        //no score update as both cards are same
        break;
      default:
        break;
    }
    setTimeout(() => { this.resetSelection() }, 1000);
  }

  //logic to swap array elements
  swap = (array, i, j) => {
                            const temp = array[i];
                            array[i] = array[j];
                            array[j] = temp;
                          }

  //shuffle the whole array 
  shuffleArray = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            const temp = array[i];
                            array[i] = array[j];
                            array[j] = temp;
                            this.swap(array, i - 1, j)
                      }
    return array;
  }

  //resets the selection made by user
  resetSelection = () => {
    this.setState({
                    cards1: this.state.cards1.filter(value => value != this.state.firstCard),
                    cards2: this.state.cards2.filter(value => value != this.state.secondCard),
                    firstCard: null,
                    secondCard: null
                  })

    if (this.state.cards1.length == 0 && this.state.cards2.length == 0) {

        let score1 = this.state.stackScore1;
        let score2 = this.state.stackScore2;

      score1 > score2 ? alert("Stack 1 player won!!!")
                      : score1 == score2
                      ? alert("It's Draw!!!")
                      : alert("Stack 2 player won!!!");
      setTimeout(() => { this.resetStacks() }, 500);
    }
  }

  //resets everything including scores, cards
  resetStacks = () => {
    let cards1 = this.shuffleArray([...this.state.uniqueCards]);
    let cards2 = this.shuffleArray([...this.state.uniqueCards]);

    this.setState({
                      cards1: cards1,
                      cards2: cards2,
                      stackScore1: 0,
                      stackScore2: 0,
                      isGameStarted: false
                  })

  }

  render() {
    return (
      <div className="App container-fluid">
        <h2>Card Game</h2>

        <div className="selectedCards">
          {this.state.firstCard != null && this.state.isGameStarted ? <h4>First Card  {this.state.firstCard}</h4> : <h4>Make selection from Stack 1</h4>}
          {this.state.secondCard != null && this.state.isGameStarted ? <h4>Second Card   {this.state.secondCard}</h4> : <h4>Make selection from Stack 2</h4>}
        </div>
        <div className="row">
          <div className="col">
            {!this.state.isGameStarted ? <button type="button" className="btn btn-success" onClick={this.gameStart}>Start game!</button> : <h3>Game in progress!</h3>}

          </div>
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={this.resetStacks}>Reset stacks</button>
          </div>
        </div>



        <div className="row">
          {this.state.stacks.map(value => {
            return (<Stack
              number={value}
              cards={value == 1 ? this.state.cards1 : this.state.cards2}
              handleCardClick={this.handleCardClick}
              score={value == 1 ? this.state.stackScore1 : this.state.stackScore2}
            />)
          })}
        </div>
      </div>

    );
  }
}

export default App;
