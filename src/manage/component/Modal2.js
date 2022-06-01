import { useEffect, useState } from "react";
// import { IoMdWarning } from "react-icons/io";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { BiUpload } from "react-icons/bi";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import "@fortawesome/fontawesome-free/js/all.js";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Container = styled.div`
  width: 700px;
  height: 500px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.15s ease-out;
  border-top: 5px solid ${(props) => props.theme.mainColor};
  z-index: 4;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .closeBtn {
    position: absolute;
    right: 20px;
    border: none;
    background: inherit;
    .closeIcon {
      cursor: pointer;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(222, 222, 222, 0.2);
  height: 80px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: right;

  button {
    width: 80px;
    height: 30px;
    border: 0;
    border-radius: 10px;
    outline: none;
    margin: 0px 7px;
    cursor: pointer;
  }

  .saveBtn {
    background-color: ${(props) => props.theme.mainColor};
    color: white;
  }
  .closeBtn {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: inherit;
  }
`;

const InnerBox = styled.div`
  width: 620px;
  height: 500px;
  background-color: white;
  padding: 5px;
  display: flex;
`;

const halfBox = styled.div`
  width: 50%;
  height: 320px;
  padding: 20px;
`;

const InputsBox = styled(halfBox)`
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  padding: 40px 0px;
`;
const InputBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;

  input {
    width: 40px;
    height: 30px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  input:focus {
    outline: none;
  }
  div {
    width: 140px;
    height: 30px;
    display: flex;
    align-items: center;
    font-weight: bold;
    color: ${(props) => props.theme.mainColor};
  }

  .tableTag {
    width: 34px;
    height: 30px;
    margin: 0px 4px;
    border-radius: 4px;
    font-weight: normal;
    border: none;
  }

  .resizeBtn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.mainColor};
    cursor: pointer;
    font-size: 20px;
    background-color: white;
    color: ${(props) => props.theme.mainColor};
    &:hover {
      background-color: ${(props) => props.theme.mainColor};
      color: white;
    }
  }
`;

const PreviewBox = styled(halfBox)``;

const Background = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;

  background-color: ${(props) =>
    props.visible ? "rgba(0, 0, 0, 0.6)" : "none"};
  z-index: 3;
`;

// 테이블 번호
// 최대 인원
// 최소 인원
// 테이블 사이즈

const Modal2 = ({ parentCallback, editModal, editTableObj }) => {
  const [signStatus, setSignStatus] = useState(true); // true: left

  const [tableNum, setTableNum] = useState(
    editModal ? editTableObj.tableNum : ""
  );
  const [minPeopleNum, setMinPeopleNum] = useState(
    editModal ? editTableObj.minPeople : ""
  );
  const [maxPeopleNum, setMaxPeopleNum] = useState(
    editModal ? editTableObj.maxPeople : ""
  );
  const [id, setId] = useState(editModal ? editTableObj.id : "");
  const [tableSize, setTableSize] = useState("");
  const [validation, setValidation] = useState([false, false, false]);
  const [isPassedValid, setIsPassedValid] = useState(false);
  const [modalTrigger, setModalTrigger] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [figureWidth, setFigureWidth] = useState(
    editModal ? editTableObj.width / 50 : 1
  );
  const [figureHeight, setFigureHeight] = useState(
    editModal ? editTableObj.height / 50 : 1
  );
  const [tableWidthPixel, setTableWidthPixel] = useState(figureHeight * 50);
  const [tableHeightPixel, setTableHeightPixel] = useState(figureHeight * 50);
  const onChange = (event) => {
    const {
      target: { value, className },
    } = event;

    console.log(value);

    if (className === "tableNum") {
      setTableNum(value);
    } else if (className === "minPeopleNum") {
      setMinPeopleNum(value);
    } else if (className === "maxPeopleNum") {
      setMaxPeopleNum(value);
    }
  };
  const onClick = () => {
    setSignStatus(!signStatus);
    console.log("tableNum:", tableNum);
    console.log("minpeopleNum:", minPeopleNum);
    console.log("maxpeopleNum:", maxPeopleNum);
    console.log("tableSize:", tableSize);
  };

  const onKeyPress = (event) => {
    const { code } = event;
    if (code === "Enter") event.preventDefault();
  };

  const handleEditNSubmit = async () => {
    if (isPassedValid) {
      console.log("isPassedValid");
      if (editModal) {
        // 수정
        setModalTrigger(false);
        const modal = false;
        const submit = false;
        const edit = true;
        parentCallback(
          id,
          tableNum,
          maxPeopleNum,
          minPeopleNum,
          tableWidthPixel,
          tableHeightPixel,
          modal,
          submit,
          edit
        );
      } else {
        // 기본 등록ff
        console.log("기본 등록");
        setModalTrigger(false);
        const modal = false;
        const submit = true;
        const edit = false;
        parentCallback(
          id,
          tableNum,
          maxPeopleNum,
          minPeopleNum,
          tableWidthPixel,
          tableHeightPixel,
          modal,
          submit,
          edit
        );
      }
    }
  };
  const tableWidthMinus = () => {
    if (figureWidth - 1 === 0) {
      setFigureWidth(1);
    } else {
      setFigureWidth(figureWidth - 1);
      let tableWidth = figureWidth - 1;
      setTableWidthPixel(tableWidth * 50);
    }
  };
  const tableWidthPlus = () => {
    if (figureWidth !== 5) {
      setFigureWidth(figureWidth + 1);
    }
    let tableWidth = figureWidth + 1;
    setTableWidthPixel(tableWidth * 50);
  };
  const tableHeightMinus = () => {
    if (figureHeight - 1 === 0) {
      setFigureHeight(1);
    } else {
      let tableHeight = figureHeight - 1;
      setFigureHeight(figureHeight - 1);
      setTableHeightPixel(tableHeight * 50);
    }
  };
  const tableHeightPlus = () => {
    if (figureHeight !== 5) {
      setFigureHeight(figureHeight + 1);
    }
    let tableHeight = figureHeight + 1;
    setTableHeightPixel(tableHeight * 50);
  };
  const changeWidthValue = (e) => {
    e.preventDefault();
  };
  const changeHeightValue = (e) => {
    e.preventDefault();
  };
  const handleValidation = () => {
    let tmp = [...validation];

    tmp[0] = tableNum === "" ? false : true;
    tmp[1] = minPeopleNum === "" ? false : true;
    tmp[2] = maxPeopleNum === "" ? false : true;

    console.log("tmp:", tmp);
    console.log(tableNum, minPeopleNum, maxPeopleNum);

    setValidation(tmp);
    tmp.includes(false) ? setIsPassedValid(false) : setIsPassedValid(true);
  };

  useEffect(() => {
    handleValidation();
  }, [tableNum, minPeopleNum, maxPeopleNum]);
  return (
    <>
      <Background visible={modalTrigger} />
      <Container>
        <Header>
          <span
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
            }}
          >
            테이블 등록
          </span>
          <button
            class="closeBtn"
            style={{ color: "rgba(0, 0, 0, 0.2)" }}
            onClick={() => {
              setModalTrigger(false);
              const modal = false;
              const submit = false;
              const edit = false;
              parentCallback(
                id,
                tableNum,
                maxPeopleNum,
                minPeopleNum,
                tableWidthPixel,
                tableHeightPixel,
                modal,
                submit,
                edit
              );
            }}
          >
            <i className="fa-solid fa-xmark closeIcon"></i>
          </button>
        </Header>
        <InnerBox>
          <InputsBox>
            <InputBox>
              <div>번호</div>
              <input
                className="tableNum"
                type="text"
                value={tableNum}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>
            <InputBox>
              <div>최소 인원</div>
              <input
                type="text"
                className="minPeopleNum"
                value={minPeopleNum}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>
            <InputBox>
              <div>최대 인원</div>
              <input
                type="text"
                className="maxPeopleNum"
                value={maxPeopleNum}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>

            <InputBox>
              <div>가로</div>
              <button className="resizeBtn" onClick={tableWidthMinus}>
                <p>-</p>
              </button>
              <div className="tableTag" style={{ color: "rgba(0,0,0,0.6)" }}>
                <p>{Math.floor(figureWidth)}</p>{" "}
              </div>

              <button className="resizeBtn" onClick={tableWidthPlus}>
                <p>+</p>
              </button>
            </InputBox>
            <InputBox>
              <div>세로</div>
              <button className="resizeBtn" onClick={tableHeightMinus}>
                <p>-</p>
              </button>
              <div className="tableTag" style={{ color: "rgba(0,0,0,0.6)" }}>
                <p>{Math.floor(figureHeight)}</p>{" "}
              </div>
              <button className="resizeBtn" onClick={tableHeightPlus}>
                <p>+</p>
              </button>
            </InputBox>
          </InputsBox>
          <PreviewBox>
            <Stage width={284} height={330}>
              <Layer>
                <Rect
                  x={144 - (figureWidth * 50) / 2}
                  y={145 - (figureHeight * 50) / 2}
                  width={figureWidth * 50}
                  height={figureHeight * 50}
                  fill="#FF7B54"
                  shadowBlur={0}
                />
              </Layer>
            </Stage>
          </PreviewBox>
        </InnerBox>
        <Footer>
          <button
            class="closeBtn"
            onClick={() => {
              setModalTrigger(false);
              const modal = false;
              const submit = false;
              const edit = false;
              parentCallback(
                id,
                tableNum,
                maxPeopleNum,
                minPeopleNum,
                tableWidthPixel,
                tableHeightPixel,
                modal,
                submit,
                edit
              );
            }}
          >
            닫기
          </button>
          <button className="saveBtn" onClick={handleEditNSubmit}>
            등록
          </button>
        </Footer>
      </Container>
    </>
  );
};
export default Modal2;
