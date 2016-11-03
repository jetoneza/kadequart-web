import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      type: '',
      amount: '',
      hasTransaction: false,
    }

    this.state = this.defaultState;
  }

  componentDidMount() {
    const { transaction } = this.props;
    if(transaction) {
      this.setState({
        type: transaction.type,
        amount: transaction.amount,
        hasTransaction: true,
      });
    } else {
      this.setState(this.defaultState);
    }

    this.props.getTransactionTypes();
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleTypeChange = (e, { value }) => {
    this.setState({type: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { type, amount } = this.state;

    const data = {
      type,
      amount,
    }

    if(this.state.hasTransaction) {
      data['id'] = this.props.transaction.id;
    }

    // TODO: handle submit
    console.log(data)

    this.props.closeModal();
  }

  render() {
    const { type, amount } = this.state;
    const { transactionTypes, fetchingTransactionTypes } = this.props.transactions;

    let typesOption = [];

    typesOption = transactionTypes.map(type => {
      return {text: type.name, value: type.id};
    });

    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Type</label>
          <Dropdown placeholder='Select Friend' loading={fetchingTransactionTypes} fluid selection options={typesOption} onChange={this.handleTypeChange} />
        </div>
        <div className="field">
          <label>Amount</label>
          <input type="number" name="amount" placeholder="0.00" value={amount} onChange={this.handleChange} />
        </div>
        <button className="ui blue button" type="submit">Submit</button>
      </form>
    );
  }
}

export default TransactionForm;
