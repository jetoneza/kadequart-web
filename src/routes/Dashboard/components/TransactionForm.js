import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      type: '',
      amount: '',
      notes: '',
      hasTransaction: false,
      errors: {},
      isSubmitting: false,
    }

    this.state = this.defaultState;
  }

  componentDidMount() {
    const { transaction } = this.props;
    if(transaction) {
      this.setState({
        type: transaction.type.id,
        amount: transaction.amount,
        notes: transaction.notes,
        hasTransaction: true,
      });
    } else {
      this.setState(this.defaultState);
    }

    this.props.getTransactionTypes();
  }

  componentWillReceiveProps(newProps, oldProps) {
    const { createSuccess, updateSuccess } = newProps.transactions;
    const { isSubmitting } = this.state;

    if(isSubmitting) {
      if(updateSuccess || createSuccess) {
        this.setState({isSubmitting: false});
        this.props.closeModal();
      }
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleTypeChange = (e, { value }) => {
    this.setState({type: value});
  }

  isDataValid = () => {
    const { type, amount } = this.state;

    let errors = {};
    let isValid = true;

    if(!type) {
      errors.type = 'Type is required!';
      isValid = false;
    }

    if(!amount) {
      errors.amount = 'Amount is required!';
      isValid = false;
    }

    this.setState({errors});

    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { type, amount, notes } = this.state;

    const data = {
      typeId: type,
      amount: parseFloat(amount),
      notes,
    }

    if(this.state.hasTransaction) {
      data['id'] = this.props.transaction.id;
    }

    if(this.isDataValid()) {
      this.setState({isSubmitting: true});
      if(this.state.hasTransaction) {
        this.props.updateTransaction(data);
      } else {
        this.props.createTransaction(data);
      }
    }
  }

  render() {
    const { type, amount, notes, errors } = this.state;
    const { transactionTypes, fetchingTransactionTypes, creating, createErrors, updateErrors } = this.props.transactions;

    let typesOption = [];

    typesOption = transactionTypes.map(type => {
      return {text: type.name, value: type.id};
    });

    const formErrors = createErrors.length != 0 ?  createErrors : updateErrors;

    return (
      <form className={`ui small form ${creating ? 'loading' : ''} ${formErrors.length != 0 ? 'error' : ''}`} onSubmit={this.handleSubmit}>
        <div className="ui error message">
          <div className="header">Something is wrong!</div>
          <ul className="list">
            {formErrors.map((error, key) => {
              return <li key={key}>{error.message}</li>
            })}
          </ul>
        </div>
        <div className={`field ${errors.type ? 'error' : ''}`}>
          <label>{errors.type ? errors.type : 'Type'}</label>
          <Dropdown placeholder='Select Type' value={type} loading={fetchingTransactionTypes} fluid selection options={typesOption} onChange={this.handleTypeChange} />
        </div>
        <div className={`field ${errors.amount ? 'error' : ''}`}>
          <label>{errors.amount ? errors.amount : 'Amount'}</label>
          <input type="number" name="amount" placeholder="0.00" value={amount} onChange={this.handleChange} />
        </div>
        <div className={`field ${errors.notes ? 'error' : ''}`}>
          <label>{errors.notes ? errors.notes : 'Notes'}</label>
          <textarea name="notes" placeholder="(Optional)" value={notes} onChange={this.handleChange}></textarea>
        </div>
        <button className="ui blue button" type="submit">Submit</button>
      </form>
    );
  }
}

export default TransactionForm;
