import React from "react";
import Header from "./Header";
import Canvas from "./Canvas";
import SimpleSlider from "./SimpleSlider";
function Reservation() {
  return (
    <div>
      <Header />
      <h1 style={{ marginBottom: "100px" }}>Reservation</h1>
      {/* <Canvas style={{ marginTop: "200px;" }}></Canvas> */}
      <SimpleSlider />
    </div>
  );
}
export default Reservation;
