import React from "react";
import Header from "./Header";
import Canvas from "./Canvas";
function Reservation() {
  return (
    <div>
      <Header />
      <h1 style={{ marginBottom: "100px" }}>Reservation</h1>
      <Canvas style={{ marginTop: "200px;" }}></Canvas>
    </div>
  );
}
export default Reservation;
