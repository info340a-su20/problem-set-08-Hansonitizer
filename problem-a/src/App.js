import React, { Component } from 'react'; //import React Component

const EXAMPLE_SENATORS = [  
  { id: 'C000127',  name: 'Maria Cantwell', state: 'WA',  party: 'Democrat', phone: '202-224-3441', twitter: 'SenatorCantwell' },
  { id: 'M001111', name: 'Patty Murray', state: 'WA', party: 'Democrat', phone: '202-224-2621', twitter: 'PattyMurray' }
];

/* Your code goes here */

export class App extends Component {
  render() {
    let senatorArray = this.props.senators;
    let divs = (<div className="container">
      <h1>US Senators 2019</h1>
      <SenatorTable senators={senatorArray}/>
      </div>);
    return divs;
  }
}

export class SenatorTable extends Component {
  render() {
    let colArray = ['Name', 'State', 'Phone', 'Twitter'];
    let senatorsArray = this.props.senators;
    let exSen = senatorsArray.map((rowObj) => {
      let senRowArray = <SenatorRow key={rowObj.id.toString()} senator={rowObj} />;
      return senRowArray;
    });
    let table = (<table className="table table-bordered">
      <TableHeader cols={colArray} />
      <tbody>{exSen}</tbody>
      </table>);
    return table;
  }
}

export class TableHeader extends Component {
  render() {
    let columns = this.props.cols;
    let columnArray = columns.map((item) => {
      let transformed = <th key={item}>{item}</th>;
      return transformed;
    });
    let tablehead = <thead><tr>
      {columnArray}
      </tr></thead>;
    return tablehead;
  }
}

export class SenatorRow extends Component {
  render() {
    let senators = this.props.senator; // Senator object
    let senName = <td key={senators.name}>{senators.name}</td>;
    let senSP = <td key={senators.state}>{senators.party.substring(0, 1)} - {senators.state}</td>;
    let phoneRef = 'tel:' + senators.phone;
    let senPhone = <td key={senators.phone}><a href={phoneRef}>{senators.phone}</a></td>;
    let twitLink = 'https://twitter.com/' + senators.twitter;
    let senTwitt = <td key={senators.twitter}><a href={twitLink}>@{senators.twitter}</a></td>
    let tableContent = (<tr>
      {senName}
      {senSP}
      {senPhone}
      {senTwitt}
      </tr>);
    return tableContent;
  }
}