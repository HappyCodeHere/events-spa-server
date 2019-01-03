import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loader } from 'components/common';

import axios from 'axios';

import Moderate from './Moderate';

import './ModerateContainer.scss';

const propTypes = {};

class ModerateContainer extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      totalCount: null,
    };

    this.moderateEvent = this.moderateEvent.bind(this);
  }

  componentDidMount() {
    this.loadModerateEvents();
  }

  loadModerateEvents() {
    // ?? байнд
    axios
      .get(`/moderate`)
      .then(data => {
        // const { events, totalCount } = data.data;
        this.setState({
          events: data.data,
          // totalCount: totalCount,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  moderateEvent(id, moderate) {
    axios
      .put(`/moderate?id=${id}&moderate=${moderate}`)
      .then(data => {
        // const { events, totalCount } = data.data;
        this.loadModerateEvents();
        // this.setState({
        //   events: data.data,
        //   // totalCount: totalCount,
        // })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.events);
    return (
      <div className="">
        {this.state.events.length === 0 ? (
          <Loader />
        ) : (
          <Moderate events={this.state.events} moderateEvent={this.moderateEvent} />
        )}
      </div>
    );
  }
}

ModerateContainer.propTypes = propTypes;

export default ModerateContainer;
