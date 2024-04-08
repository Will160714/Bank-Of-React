/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { useState } from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addDebit(description, amount);
    setDescription('');
    setAmount('');
  }

  const updateDescription = (event) => {
    setDescription(event.target.value);
  }

  const updateAmount = (event) => {
    setAmount(event.target.value);
  }

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      <h1><AccountBalance accountBalance={props.balance}/></h1>
      {debitsView()}

      <form onSubmit={handleSubmit}>
        <input type="text" name="description" value = {description} placeholder="Description" onChange = {updateDescription}/>
        <input type="text" name="amount" value = {amount} placeholder="Amount" onChange = {updateAmount}/>
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;