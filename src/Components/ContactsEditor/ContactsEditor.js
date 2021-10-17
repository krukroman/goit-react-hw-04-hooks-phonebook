import { Component } from 'react';
import { nanoid } from 'nanoid';

import s from './ContactsEditor.module.css';

export default class ContactsEditor extends Component {
  state = {
    name: '',
    number: '',
  };

  inputNameId = nanoid();
  inputNumberId = nanoid();

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset() {
    this.setState({
      name: '',
      number: '',
    });
  }

  render() {
    return (
      <div className={s.container}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <label className={s.label} htmlFor={this.inputNameId}>
            Name
            <input
              className={s.input}
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              id={this.inputNameId}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>
          <label className={s.label} htmlFor={this.inputNumberId}>
            Phone number
            <input
              className={s.input}
              type="tel"
              name="number"
              onChange={this.handleChange}
              value={this.state.number}
              id={this.inputNumberId}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </label>
          <button className={s.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
