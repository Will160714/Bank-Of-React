/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import "./Home.css"

class Home extends Component {
  render() {
    return (
      <div>
        <div class = "banner">
          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>

        <div class = "body">
          <div class = "container">
            <h1>Credit</h1>
            <Link to="/credits" class = "button">Add Credits</Link>
          </div>

          <div class = "container">
            <h1>Debit</h1>
            <Link to="/debits" class = "button">Add Debits</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;