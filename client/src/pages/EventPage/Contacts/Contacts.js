import React from 'react';
import PropTypes from 'prop-types';
import './Contacts.scss';

const propTypes = {
  contacts: PropTypes.object.isRequired,
};

const Contacts = ({ contacts }) => {
  const dict = {
    phone: 'Телефон',
    email: 'Эл. почта',
    link: 'Ссылка',
  };

  return (
    <div className="contacts">
      <span className="contacts__title">Контакты:</span>
      <ul className="contacts__list">
        {Object.keys(contacts).map(item => {
          return <li key={item}>{`${dict[item]}: ${contacts[item]}`}</li>;
        })}
      </ul>
    </div>
  );
};

Contacts.propTypes = propTypes;

export default Contacts;
