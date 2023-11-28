import React, { useState } from "react";
import Box from "./Box";
import BoxArrayOfDefaultObjects from "./BoxArrayOfDefaultObjects";
// import "./styles.css";

const App = () => {

  // define data
  let boxArrayOfObjects = localStorage.getItem('boxArrayOfObjectsUnique') ? JSON.parse(localStorage.getItem('boxArrayOfObjectsUnique')) : BoxArrayOfDefaultObjects;
  // console.log(boxArrayOfObjects);
  // get data
  async function readData() {
    boxArrayOfObjects = localStorage.getItem('boxArrayOfObjectsUnique') ? JSON.parse(localStorage.getItem('boxArrayOfObjectsUnique')) : boxArrayOfObjects;
  }
  // set data
  readData().then(() => {
    localStorage.setItem('boxArrayOfObjectsUnique', JSON.stringify(boxArrayOfObjects));
  })

  const [dragId, setDragId] = useState();
  const [boxes, setBoxes] = useState(boxArrayOfObjects);

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    const dragBox = boxes.find((box) => box.id === dragId);
    const dropBox = boxes.find((box) => box.id === ev.currentTarget.id);

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newBoxState = boxes.map((box) => {
      if (box.id === dragId) {
        box.order = dropBoxOrder;
      }
      if (box.id === ev.currentTarget.id) {
        box.order = dragBoxOrder;
      }
      return box;
    });
    boxArrayOfObjects = newBoxState;
    localStorage.setItem('boxArrayOfObjectsUnique', JSON.stringify(boxArrayOfObjects));
    setBoxes(newBoxState);

    console.log('newBoxState: ' + JSON.stringify(newBoxState));
    // console.log('boxArrayOfObjects: ' + JSON.stringify(boxArrayOfObjects));
  };

  return (
    <div className="App">
      {boxes
        .sort((a, b) => a.order - b.order)
        .map((box) => (
          <Box
            key={box.id}
            boxColor={box.color}
            boxNumber={box.id}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        ))}
    </div>
  );
};

export default App;
