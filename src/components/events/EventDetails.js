/*global google:true*/
/*eslint no-undef: "error"*/

import React, { Component, PropTypes } from 'react';
import { reduxForm, FieldArray } from 'redux-form';
import { bindActionCreators } from 'redux';
import { updateEvent } from '../../actions/eventActions';

class EventDetail extends Component {
  componentWillMount() {
    const doStuff = () => console.log('clicked!!');
  }

  componentDidUpdate() {
    const SELECTED_LAT_LON = {
      lat: this.props.event.lat,
      lng: this.props.event.lon
    };

    this.map = new google.maps.Map(this.refs.map, {
      center: SELECTED_LAT_LON,
      zoom: 12
    });

    this.state = {
      event: Object.assign({}, this.props.event)
    };

  }

  handleFormSubmit({_id, eventName, eventDate, description, lat, lon, number, street, city, state, zipcode}) {
    const map = new google.maps.Map(document.getElementById('map'));
    const geocoder = new google.maps.Geocoder();

    let event = {_id,  eventName, eventDate, description, lat, lon, number, street, city, state, zipcode};

    this.props.updateEvent(event);
  }

  renderAlert() {
    if (this.props.errorMessage.error) {
      return (
        <div className="alert alert-danger">
          <strong>Crap!</strong> {this.props.errorMessage.error}
        </div>
      );
    }
  }

  render() {
    const mapStyle = {
      width: 500,
      height: 300,
      border: '1px solid black'
    };

    const { fields: {_id, eventName, eventDate, description, lat, lon, number, street, city, state, zipcode },
      handleSubmit,
      submitting
      } = this.props;


    if (!this.props.event) {
      return <div>Select an Event</div>;
    }

    return (
      <div>
      <form className="form-horizontal" >
        <div className="well well-sm">
          <legend>Event Info</legend>
          <div className="row">
            <div className="col-md-6">

              <div className="form-group">
                <label htmlFor="inputEventName" className="col-md-3 control-label">Event Name</label>
                <div className="col-md-6">
                  <input type="text" className="form-control" id="inputEventName" {...eventName} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputEventDate" className="col-md-3 control-label">Date</label>
                <div className="col-md-6">
                  <input type="text" className="form-control" id="inputEventName" {...eventDate} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputDescription" className="col-md-3 control-label">Description</label>
                <div className="col-md-6">
                  <textarea className="form-control" id="inputDescription" rows="4" {...description} />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div id="map" ref="map" style={mapStyle}>I should be a map!</div>
            </div>



          </div>

          <legend>Address</legend>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="inputNumber" className="col-md-3 control-label">Number</label>
                <div className="col-md-6">
                  <input type="text" className="form-control" id="inputNumber" {...number} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputStreet" className="col-md-3 control-label">Street</label>
                <div className="col-md-6">
                  <input type="text" className="form-control" id="inputStreet" {...street} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputCity" className="col-md-3 control-label">City</label>
                <div className="col-md-6">
                  <input type="text" className="form-control" id="inputCity" {...city} />
                </div>
              </div>

              {this.renderAlert()}
              <button type="button" className="btn btn-primary" onClick={handleSubmit(this.handleFormSubmit.bind(this))}>
                Save
              </button>

            </div>


            <div className="col-md-5">

              <div className="form-group">
                <label htmlFor="inputState" className="col-md-3 control-label">State</label>
                <div className="col-md-4">
                  <input type="text" className="form-control" id="inputState" {...state} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputZip" className="col-md-3 control-label">Zip Code</label>
                <div className="col-md-4">
                  <input type="text" className="form-control" id="inputZip" {...zipcode} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </form>

      </div>
    );
  }
}

EventDetail.propTypes = {
  fields: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    event: state.events,
    initialValues: state.events,
    errorMessage: state.events
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateEvent }, dispatch);
}

export default reduxForm({
  form: 'EventDetailForm',
  fields: ['_id', 'eventName', 'eventDate', 'description', 'lat', 'lon', 'number', 'street', 'city', 'state', 'zipcode' ]
}, mapStateToProps, mapDispatchToProps)(EventDetail);
