import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentDidMount() {
    //this.props.fetchMessage();
    this.props.fetchEvents();
  }

  renderEvents() {

    if (this.props.events !== undefined) {
      return this.props.events.map((event) => {
        return (
            <tr
              key={event.id}>
              <td>{event.eventName}</td>
              <td>{event.eventDate}</td>
              <td>{event.description}</td>
            </tr>
        );
      });
    }

  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEvents()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    events: state.auth.events
  };
}

export default connect(mapStateToProps, actions)(Feature);
