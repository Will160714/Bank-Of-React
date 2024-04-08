/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  async componentDidMount(){
    // Await for promise (completion) returned from API call for Credit Card information
    try{  // Accept success response as array of JSON objects (credit card info)
      let response = await axios.get("https://johnnylaicode.github.io/api/credits.json");
      this.setState({creditList: response.data}); //Storing received data into state's creditList
    }

    catch(error){ // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
      }    
    }

    // Await for promise (completion) returned from API call for Debit Card information
    try{ // Accept success response as array of JSON objects (debit card info)
      let response = await axios.get("https://johnnylaicode.github.io/api/debits.json");
      this.setState({debitList: response.data}); //Storing received data into state's debitList
    }

    catch(error){ // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
      }    
    }
  }

  // add a Credit from form to the creditList
  addCredit = (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const description = formData.get('description'); 
    const amount = formData.get('amount'); 
    const id = this.state.creditList.length+1
    
    const submissionDate = new Date();
    const year = submissionDate.getFullYear();
    const day = String(submissionDate.getDate()).padStart(2,'0');
    const month = String(submissionDate.getMonth() + 1).padStart(2,'0');

    const date = year + "-" + month + "-" + day;

    const newCredit = {id, description, amount, date}
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit]
    }));
    event.target.reset();
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;