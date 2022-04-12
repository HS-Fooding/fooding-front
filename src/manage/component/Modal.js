import { useEffect, useState } from "react";
// import { IoMdWarning } from "react-icons/io";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { BiUpload } from "react-icons/bi";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
import axios from "axios";

const Modal = ({ parentCallback ,editModal, editTableObj}) => {
  const [signStatus, setSignStatus] = useState(true); // true: left
 
  const [tableNum, setTableNum] = useState(editModal ? editTableObj.tableNum : "");
  const [minPeopleNum, setMinPeopleNum] = useState(editModal ? editTableObj.minPeople: "");
  const [maxPeopleNum, setMaxPeopleNum] = useState(editModal ? editTableObj.maxPeople : "");
  const [id,setId]=useState(editModal ? editTableObj.id : "");
  const [tableSize, setTableSize] = useState("");
  const [validation, setValidation] = useState([true, true, true, true]);
  const [isPassedValid, setIsPassedValid] = useState(false);
  const [modalTrigger, setModalTrigger] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [figureWidth, setFigureWidth] = useState(editModal ? editTableObj.width/50: 1);
  const [figureHeight, setFigureHeight] = useState(editModal ? editTableObj.height/50:1);
  const [tableWidthPixel, setTableWidthPixel] = useState(figureHeight*50);
  const [tableHeightPixel, setTableHeightPixel] = useState(figureHeight*50);
  const onChange = (event) => {
    const {
      target: { value, className },
    } = event;

    if (className === "leftForm__content__title") {
      setTableNum(value);
    } else if (className === "leftForm__content__minPeople") {
      setMinPeopleNum(value);
    } else if (className === "leftForm__content__maxPeople") {
      setMaxPeopleNum(value);
    } else if (className === "leftForm__content__name") {
      setTableSize(value);
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
    if(editModal){
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
    }
    else{
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
    );}
  };
  const tableWidthMinus = () => {
    if (figureWidth - 1 === 0) {
      setFigureWidth(1);
    } else {
      setFigureWidth(figureWidth - 1);
      let tableWidth = figureWidth - 1;
      setTableWidthPixel(tableWidth * 100);
    }
  };
  const tableWidthPlus = () => {
    setFigureWidth(figureWidth + 1);
    let tableWidth = figureWidth + 1;
    setTableWidthPixel(tableWidth * 100);
  };
  const tableHeightMinus = () => {
    if (figureHeight - 1 === 0) {
      setFigureHeight(1);
    } else {
      let tableHeight = figureHeight - 1;
      setFigureHeight(figureHeight - 1);
      setTableHeightPixel(tableHeight * 100);
    }
  };
  const tableHeightPlus = () => {
    setFigureHeight(figureHeight + 1);
    let tableHeight = figureHeight + 1;
    setTableHeightPixel(tableHeight * 100);
  };
  const changeWidthValue = (e) => {
    e.preventDefault();
  };
  const changeHeightValue = (e) => {
    e.preventDefault();
  };
  const handleValidation = () => {
    let tmp = [...validation];

    tmp[0] = tableNum === null ? false : true;
    tmp[1] = minPeopleNum === null ? false : true;
    tmp[2] = maxPeopleNum === null ? false : true;
    tmp[3] = true;
    // tmp[4] = true;
    setValidation(tmp);
    tmp.includes(false) ? setIsPassedValid(false) : setIsPassedValid(true);
  };

  useEffect(() => {
    handleValidation();
    
    console.log(
      "tableNum",
      tableNum,
      "minPeopleNum",
      minPeopleNum,
      "maxPeopleNum",
      maxPeopleNum,
      "tablewidthSize",
      figureWidth,
      "figureHeight",
      figureHeight
    );
  }, [tableNum, minPeopleNum, maxPeopleNum, figureWidth]);
  return (
    <>
      <div
        className={modalTrigger ? "modal-trigger active" : "modal-trigger"}
        // onClick={() => setModalTrigger((prev) => !prev)}
      >
        {/* <BiUpload /> */}
        <span>😀</span>
      </div>

      <div className={modalTrigger ? "modal-toggle active" : "modal-toggle"}>
        <div className={signStatus ? "modal-screen" : "modal-screen active"}>
          <div className="modal-container">
            <div className="container__bg">
              <div className="container__box leftBox">
                <div className="leftBox__content">
                  <div className="leftBox__title">
                    <h3>테이블 번호</h3>
                    <p className="leftBox__title__content">
                      <span>{tableNum}</span>
                    </p>
                  </div>
                </div>
                <div className="leftBox__content">
                  <div className="leftBox__description">
                    <h3>최대, 최소 인원</h3>
                    <p className="leftBox__description__content">
                      <span>{minPeopleNum}</span>
                    </p>
                  </div>
                </div>
                <div className="leftBox__content">
                  <div className="leftBox__name">
                    <h3>테이블 사이즈</h3>
                    <p className="leftBox__name__content">
                      <span>{tableSize}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="container__box rightBox">
                <h2 className={isPassedValid ? "box__msg valid" : "box__msg"}>
                  {/* {isPassedValid ? "Go Next Step!" : "Fill in the blanks!"} */}
                </h2>
                <Stage width={400} height={380}>
                  <Layer>
                    <Rect
                      x={200 - figureWidth*100 / 2}
                      y={200 - figureHeight*100 / 2}
                      width={figureWidth*100}
                      height={figureHeight*100}
                      fill="red"
                      shadowBlur={5}
                    />
                  </Layer>
                </Stage>
                <button
                  className="box__btn valid"
                  onClick={onClick}
                  disabled={!isPassedValid}
                >
                  Next
                </button>
              </div>
            </div>
            <button
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
            <div
              className={
                signStatus
                  ? "container__formBox leftForm"
                  : "container__formBox leftForm active rightForm"
              }
            >
              <div className="leftForm__contents">
                <div className="leftForm__content leftForm__title">
                  <span>
                    테이블 번호
                    {validation[0] ? (
                      // <AiOutlineCheckCircle className="validation-icon check" />
                      <span>😅</span>
                    ) : (
                      // <IoMdWarning className="validation-icon warning" />
                      <span>😡</span>
                    )}
                  </span>
                  <input
                    className="leftForm__content__title"
                    type="text"
                    placeholder="테이블 번호"
                    value={tableNum}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                  />
                </div>

                <div className="leftForm__content leftForm__description">
                  <span>
                    최대, 최소 인원
                    {true && true ? (
                      // <AiOutlineCheckCircle className="validation-icon check" />
                      <span>😅</span>
                    ) : (
                      // <IoMdWarning className="validation-icon warning" />
                      <span>😡</span>
                    )}
                  </span>
                  <input
                    className="leftForm__content__minPeople"
                    type="text"
                    placeholder="최소인원"
                    value={minPeopleNum}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                  />
                  <input
                    className="leftForm__content__maxPeople"
                    type="text"
                    placeholder="최대인원"
                    value={maxPeopleNum}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                  />
                </div>
                <div className="leftForm__content leftForm__name">
                  <span>
                    테이블 사이즈
                    {true ? (
                      // <AiOutlineCheckCircle className="validation-icon check" />
                      <span>😅</span>
                    ) : (
                      // <IoMdWarning className="validation-icon warning" />
                      <span>😡</span>
                    )}
                  </span>
                  {/* <input
                    className="leftForm__content__name"
                    type="text"
                    placeholder="Name.."
                    value={tableSize}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                  /> */}
                  <div className="inputFigureNumber">
                    <div className="inputTableWidth">
                      <p>가로</p>
                      <button onClick={tableWidthMinus}>
                        <p>-</p>
                      </button>
                      <div className="tableTag">
                        <p>{figureWidth}</p>{" "}
                      </div>
                      <button onClick={tableWidthPlus}>
                        <p>+</p>
                      </button>
                    </div>
                    <div>
                      <div className="inputTableHeight">
                        <p>세로</p>
                        <button onClick={tableHeightMinus}>
                          <p>-</p>
                        </button>
                        <div className="tableTag">
                          <p>{figureHeight}</p>{" "}
                        </div>
                        <button onClick={tableHeightPlus}>
                          <p>+</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rightForm__contents">
                <div className="rightForm__content rightForm__notice">
                  Notice!!
                </div>
                <p className="rightForm__content rightForm__info">
                  Your work will be uploaded on dashboard. Make sure it is okay
                  to be public.
                </p>

                <div className="rightForm__content rightForm__btns">
                  <button
                    className="rightForm__btn go-back-btn"
                    onClick={onClick}
                  >
                    Go back
                  </button>
             
                     <button
                     className="rightForm__btn submit-btn"
                     onClick={handleEditNSubmit}
                   >
                     Next
                   </button>                    
              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
