import React from "react";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import styled from "styled-components";

const Container = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 80%;
    display: flex;
    align-items: center;
    margin: 5em;
`;

const Button1 = styled.button`
    position: absolute;
    padding: 0;
    margin: 0;
    top: 10%;
    right: 5%;
    border: none;
    width: 100px;
    height: 35px;
    border-radius: 26px;
    cursor: pointer;
    z-index: 2;
`;

const Button2 = styled.button`
    position: absolute;
    padding: 0;
    margin: 0;
    top: 50%;
    right: 5%;
    border: none;
    width: 100px;
    height: 35px;
    border-radius: 26px;
    cursor: pointer;
    z-index: 2;
`;

const MyRectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Rect
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                        rotation: node.rotation(),
                    });
                    console.log("Rotation!!!! : " + e.target.rotation());
                }}
            />

            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

const MyCircle = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Circle
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

const initialRectangles = [
    {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: "red",
        rotation: 0,
        id: "rect1",
    },
    {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: "green",
        rotation: 0,
        id: "rect2",
    },
];

const initialCircles = [
    {
        x: 200,
        y: 100,
        radius: 50,
        fill: "blue",
    },
];

const MyCanvas = () => {
    const [rectangles, setRectangles] = React.useState(initialRectangles);
    const [circles, setCircles] = React.useState(initialCircles);
    const [selectedId, selectShape] = React.useState(null);
    const [rectClickCnt, setRectClickCnt] = React.useState(1);
    const [circClickCnt, setCircClickCnt] = React.useState(1);

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    const newRect = () => {
        const rect = {
            x: 100 + rectClickCnt * 20,
            y: 100 + rectClickCnt * 20,
            width: 100,
            height: 100,
            fill: "green",
            rotation: 20,
            id: "rect" + rectClickCnt,
        };
        setRectClickCnt(rectClickCnt + 1);
        // setRectangles(rectangles.push(rect));
        console.log(rectangles.push(rect));
    };

    const newCirc = () => {
        const circ = {
            x: 200 + circClickCnt * 20,
            y: 200 + circClickCnt * 20,
            radius: 50,
            fill: "blue",
            id: "circ" + circClickCnt,
        };
        setCircClickCnt(circClickCnt + 1);
        // setRectangles(rectangles.push(rect));
        console.log(circles.push(circ));
    };

    return (
        <Container>
            <Button1 onClick={newRect}>New Rect</Button1>
            <Button2 onClick={newCirc}>New Circ</Button2>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
            >
                <Layer>
                    {rectangles.map((rect, i) => {
                        return (
                            <MyRectangle
                                key={i}
                                shapeProps={rect}
                                isSelected={rect.id === selectedId}
                                onSelect={() => {
                                    selectShape(rect.id);
                                }}
                                onChange={(newAttrs) => {
                                    const rects = rectangles.slice();
                                    rects[i] = newAttrs;
                                    setRectangles(rects);
                                }}
                            />
                        );
                    })}

                    {circles.map((circle, i) => {
                        return (
                            <MyCircle
                                key={i}
                                shapeProps={circle}
                                isSelected={circle.id === selectedId}
                                onSelect={() => {
                                    selectShape(circle.id);
                                }}
                                onChange={(newAttrs) => {
                                    const circs = circles.slice();
                                    circs[i] = newAttrs;
                                    setCircles(circs);
                                }}
                            />
                        );
                    })}
                </Layer>
            </Stage>
        </Container>
    );
};

export default MyCanvas;
