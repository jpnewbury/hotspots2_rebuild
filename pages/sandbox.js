import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    navigator.geolocation.watchPosition(function (position) {
      localStorage.setItem("Latitude", position.coords.latitude);
      localStorage.setItem("Longitude", position.coords.longitude);
      const Latitude = localStorage.getItem("Latitude");
      const Longitude = localStorage.getItem("Longitude");
    });
  }
  static defaultProps = {
    center: {
      Lat: localStorage.getItem("Latitude"),
      Lon: localStorage.getItem("Longitude"),
    },
    zoom: 11,
  };
  render(props) {
    return (
      <>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAlyGuJnGCv2mbLl4DPvef7EjaZQQgas4I",
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          ></GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Map;
