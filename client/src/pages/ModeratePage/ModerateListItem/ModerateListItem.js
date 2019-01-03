import React from 'react';
import PropTypes from 'prop-types';

import './ModerateListItem.scss';

const propTypes = {
  text: PropTypes.string.isRequired,
  // source:
  // id
  // moderateEvent
};

const ModerateListItem = ({ text, id, moderateEvent, source }) => {
  return (
    <div className="moderate-list-item">
      <h6>{source}</h6>
      <p dangerouslySetInnerHTML={{ __html: text }} />
      <button className="btn btn-success" onClick={() => moderateEvent(id, true)}>
        ok
      </button>
      <button className="btn btn-danger" onClick={() => moderateEvent(id, false)}>
        no
      </button>
    </div>
  );
};

ModerateListItem.propTypes = propTypes;

export default ModerateListItem;
