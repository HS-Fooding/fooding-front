import { useEffect, useState } from "react";
// import { IoMdWarning } from "react-icons/io";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { BiUpload } from "react-icons/bi";
import axios from "axios";

const Modal = ({ parentCallback, modal }) => {
  const API_URL = "http://127.0.0.1:8000/add_music";

  const [signStatus, setSignStatus] = useState(true); // true: left
  const [tableNum, setTableNum] = useState("");
  const [peopleNum, setPeopleNum] = useState("");
  const [tableSize, setTableSize] = useState("");
  const [validation, setValidation] = useState([false, false, false]);
  const [isPassedValid, setIsPassedValid] = useState(false);
  const [modalTrigger, setModalTrigger] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (event) => {
    const {
      target: { value, className },
    } = event;

    if (className === "leftForm__content__title") {
      setTableNum(value);
    } else if (className === "leftForm__content__description") {
      setPeopleNum(value);
    } else if (className === "leftForm__content__name") {
      setTableSize(value);
    }
  };

  const onClick = () => {
    setSignStatus(!signStatus);
    console.log("tableNum:", tableNum);
    console.log("peopleNum:", peopleNum);
    console.log("tableSize:", tableSize);
  };

  const onKeyPress = (event) => {
    const { code } = event;
    if (code === "Enter") event.preventDefault();
  };

  const handleSubmit = async () => {
    setModalTrigger(false);
    const modal = false;
    parentCallback(tableNum, peopleNum, tableSize, modal);

    console.log("Completed!!!!");
    //console.log(props.imageList);
    //console.log(props.imageList[0]);
    console.log("tableNum:", tableNum);
    console.log("peopleNum:", peopleNum);
    console.log("tableSize:", tableSize);

    /*
    try {
      // const result = await axios.post(API_URL, {
      //   tableNum: tableNum,
      //   user_name: name,
      //   description: description,
      //   created_at: "2021-09-09 01:01:01",
      //   image_files: props.imageList,
      // });
      //const result = await axios.post(API_URL, {
      // tableNum: tableNum,
      //user_name: name,
      // description: description,
      // created_at: "2021-09-09 01:01:01",
      // image_files: props.imageList,
      //});
     // console.log(result);
    } catch (error) {
      //console.log(error);
    }
    */

    // need to redirect
  };

  const handleValidation = () => {
    let tmp = [...validation];

    tmp[0] = tableNum.length >= 1 ? true : false;
    tmp[1] = peopleNum.length >= 1 ? true : false;
    tmp[2] = tableSize.length >= 1 ? true : false;

    setValidation(tmp);
    tmp.includes(false) ? setIsPassedValid(false) : setIsPassedValid(true);
  };

  useEffect(() => {
    handleValidation();
  }, [tableNum, peopleNum, tableSize]);

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
                      <span>{peopleNum}</span>
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
                  {isPassedValid ? "Go Next Step!" : "Fill in the blanks!"}
                </h2>
                <button
                  className={isPassedValid ? "box__btn valid" : "box__btn"}
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
                    placeholder="Title.."
                    value={tableNum}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                  />
                </div>
                <div className="leftForm__content leftForm__description">
                  <span>
                    최대, 최소 인원
                    {validation[1] ? (
                      // <AiOutlineCheckCircle className="validation-icon check" />
                      <span>😅</span>
                    ) : (
                      // <IoMdWarning className="validation-icon warning" />
                      <span>😡</span>
                    )}
                  </span>
                  <textarea
                    className="leftForm__content__description"
                    type="text"
                    placeholder="Description.."
                    value={peopleNum}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                  />
                </div>
                <div className="leftForm__content leftForm__name">
                  <span>
                    테이블 사이즈
                    {validation[2] ? (
                      // <AiOutlineCheckCircle className="validation-icon check" />
                      <span>😅</span>
                    ) : (
                      // <IoMdWarning className="validation-icon warning" />
                      <span>😡</span>
                    )}
                  </span>
                  <input
                    className="leftForm__content__name"
                    type="text"
                    placeholder="Name.."
                    value={tableSize}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                  />
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
                    onClick={handleSubmit}
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
