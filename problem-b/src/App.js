import React, { Component } from 'react'; //import React Component
import _ from 'lodash';
import './style.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {pets: this.props.pets};
  }
  adopt = (name) => {
    this.setState((currentState) => {
      let correctPet = _.find(currentState.pets, {'name': name});
      correctPet.adopted = true; 
      return correctPet;
    })
  }
  render() {
    let petsObj = this.state.pets;
    let grouped = _.groupBy(petsObj, 'breed');
    let petsArray = Object.keys(grouped);
    return (
      <div>
        <header className="jumbotron jumbotron-fluid py-4">
        <div className="container">
          <h1>Adopt a Pet</h1>
        </div>
      </header>
      
      <main className="container">
        <div className="row">
          <div id="navs" className="col-3">
            <BreedNav breeds={petsArray}/>
            <AboutNav />
          </div>
          <div id="petList" className="col-9">
            <PetList pets={petsObj} adoptCallback={this.adopt}/>
          </div>
        </div>
      </main>

      <footer className="container">
        <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
      </footer>
    </div>
    );
  }
}

class AboutNav extends Component {
  render() {
    return(
      <nav id="aboutLinks">
        <h2>About</h2>
        <ul className="list-unstyled">
          <li><a href="#/">How to Adopt</a></li>
          <li><a href="#/">Volunteering</a></li>
          <li><a href="#/">Events</a></li>
          <li><a href="#/">Donate</a></li>
          <li><a href="#/">About Us</a></li>
        </ul>
      </nav>
    );
  }
}

class BreedNav extends Component {
  render() {
    let breeds = this.props.breeds;
    let breedArray = breeds.map((item) => {
      let listArray = <li key={item}><a href="">{item}</a></li>;
      return listArray;
    });
    return(
      <nav id="breedLinks">
        <h2>Pick a Breed</h2>
        <ul class="list-unstyled">
          {breedArray}
        </ul>            
      </nav>
    );
  }
}

class PetCard extends Component {
  handleClick = () => {
    this.props.adoptCallback(this.props.dogs.name);
  }
  render() {
    let petObject = this.props.dogs;
    let displayedName = petObject.name;
    if (petObject.adopted == true) {
      displayedName = displayedName + " (Adopted)";
    }
    let card = 
      (<div className="card" onClick={this.handleClick}>
        <img className="card-img-top" src={petObject.img} alt={petObject.name} />
          <div className="card-body">
            <h3 className="card-title">{displayedName}</h3>
            <p className="card-text">{petObject.sex} {petObject.breed}</p>
          </div>
      </div>);
    return card; 
  }
}

class PetList extends Component {
  render() {
    let petArrObj = this.props.pets;
    let callback = this.props.adoptCallback;
    let petCardArr = petArrObj.map((petObj) => {
      let cards = <PetCard dogs={petObj} adoptCallback={callback} />;
      return cards;
    });
    return(
      <div>
      <h2>Dogs for Adoption</h2>
      <div class="card-deck">
        {petCardArr}
      </div>
      </div>
    );
  }
}

export default App;
