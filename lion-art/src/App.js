//import logo from './logo.svg';
import React from 'react';
import './App.css';

export const IphoneComponent = () => {
  return (
    <div className="iphone-component">
      <div className="div">
        <div className="rectangle-2" />
        <div className="overlap-group">
          <img className="image" alt="Search icon" src="search.png" />
          <div className="text-wrapper-2">search</div>
        </div>
        <div className="overlap-2">
          <img className="ellipse" alt="Ellipse" src="painting.png" />
          <div className="text-wrapper-3">painting</div>
        </div>
        <div className="overlap-3">
          <img className="ellipse" alt="Ellipse" src="sculpture.png" />
          <div className="text-wrapper-4">sculpture</div>
        </div>
        <div className="overlap-group-2">
          <img className="ellipse" alt="Ellipse" src="ceramics.png" />
          <div className="text-wrapper-4">ceramics</div>
        </div>
        <div className="overlap-4">
          <img className="ellipse" alt="Ellipse" src="street_art.png" />
          <div className="text-wrapper-5">street art</div>
        </div>
        <div className="overlap-5">
          <img className="ellipse" alt="Ellipse" src="photography.png" />
          <div className="text-wrapper-6">photography</div>
        </div>
        <div className="overlap-6">
          <img className="rectangle-3" alt="Rectangle" src="john_art.png" />
          <div className="rectangle-4" />
          <img className="ellipse-2" alt="Ellipse" src="john_pic.png" />
          <div className="text-wrapper-7">Motion in Manhattan</div>
          <div className="text-wrapper-8">John Smith</div>
          <div className="text-wrapper-9">Street photographer. CC ‘25.</div>
        </div>
      </div>
    </div>
  );
};

export default IphoneComponent;
