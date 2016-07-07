import React, { Component } from 'react';
import EventList from './EventList';
import EventDetail from './EventDetails';


class EventsPage extends Component {
  render() {
    return (
      <div>
        <EventList />
        <EventDetail />
      </div>
    );
  }
}

export default EventsPage;
