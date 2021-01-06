import React, { Component, Fragment } from 'react';
import './filterSchool.css'

export default class Filters extends Component {
  constructor() {
    super();
    this.state = {
      language_classes: false,
      rating: 0,
      network: {
        Catholic_Network: false,
        Municipality_Schools: false,
        Private_schools: false,
        GO_Network: false
      },
      areas: {
        General: false,
        Technical: false,
        Vocational: false,
        Art_Secondary_Education: false,
      }
    };
  };


  render() {
   
    return (
      <Fragment>
        <div className="filterContainer">
            <h1>Filters</h1>
            {/* LANGUAGE */}
            <div className="filterItem">
              <input name="language_classes" type="radio" value="true"></input>
              <label for="language_classes">Language classes</label>
            </div>
            {/* RATING */}
            <div className="filterItem">
              <fieldset>
                <legend>Rating</legend>
                  <div className="starRating">
                    <input className="inputStar" id="r1" type="radio" name="rating" value="1"></input>
                    <label for="r1"><i className="far fa-star"></i></label>
                    <input className="inputStar" id="r2" type="radio" name="rating" value="2"></input>
                    <label for="r2"><i className="far fa-star"></i></label>
                    <input className="inputStar" id="r3" type="radio" name="rating" value="3"></input>
                    <label for="r3"><i className="far fa-star"></i></label>
                    <input className="inputStar" id="r4" type="radio" name="rating" value="4"></input>
                    <label for="r4"><i className="far fa-star"></i></label>
                    <input className="inputStar" id="r5" type="radio" name="rating" value="5"></input>
                    <label for="r5"><i className="far fa-star"></i></label>
                  </div>
              </fieldset>
            </div>
            {/* NETWORK */}
            <div className="filterItem">
              <fieldset>
                <legend>School Network</legend>
                <input name="network" type="radio" value="Catholic_Network"></input>
                <label for="network">Catholic Network</label><br></br>

                <input name="network" type="radio" value="Municipality_Schools"></input>
                <label for="network">Municipality Schools</label><br></br>

                <input name="network" type="radio" value="Private_schools"></input>
                <label for="network">Private schools</label><br></br>

                <input name="network" type="radio" value="GO_Network"></input>
                <label for="network">GO Network</label>
              </fieldset>
            </div>
            {/* AREAS */}
            <div className="filterItem">
              <fieldset>
                <legend>School Field</legend>
                <input name="areas" type="radio" value="General"></input>
                <label for="areas">General</label><br></br>

                <input name="areas" type="radio" value="Technical"></input>
                <label for="areas">Technical</label><br></br>

                <input name="areas" type="radio" value="Vocational"></input>
                <label for="areas">Vocational</label><br></br>

                <input name="areas" type="radio" value="Art_Secondary_Education"></input>
                <label for="areas">Art Secondary Education</label>
              </fieldset>
            </div>
        </div>
      </Fragment>
      
    )
  }
}



