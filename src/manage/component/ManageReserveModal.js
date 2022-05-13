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
  width: 350px;
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
  width: 320px;
  height: 500px;
  background-color: white;
  padding: 5px;
  
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
`;
const InputBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;

  input {
    width: 140px;
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
`;

// 테이블 번호
// 최대 인원
// 최소 인원
// 테이블 사이즈

const ManageReservModal = ({ parentCallback}) => {
  const [validation, setValidation] = useState([false, false, false]);
  const [isPassedValid, setIsPassedValid] = useState(false);
  const [modalTrigger, setModalTrigger] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  
  const [nickname,setNickname] = useState();
  const [name,setName] = useState();
  const [reservAt,setReservAt] = useState();
  const [tableNum,setTableNum] = useState();
  const [reservCount,setReservCount]=useState();
  const [isCar,setIsCar] = useState();
  const [phoneNum,setPhoneNum]= useState();
 
  const onChange = (event) => {
    const {
      target: { value, className },
    } = event;

    console.log(value);

    if (className=="nickname"){
        setNickname(value);
    }
    else if(className=="name"){
        setName(value);
    }
    else if(className=="reservAt"){
        setReservAt(value);
    }
    
    else if (className === "tableNum") {
      setTableNum(value);
    } 
    else if (className === "reservCount") {
        setReservCount(value);
    }
    else if (className === "isCar") {
        setIsCar(value);
    }
    else if (className === "phoneNum") {
        setPhoneNum(value);
    }          
   
    
  };
  

  const onKeyPress = (event) => {
    const { code } = event;
    if (code === "Enter") event.preventDefault();
  };

  const handleEditNSubmit = async () => {         
        setModalTrigger(false);
        const modal = false;
        const submit = false;
        const edit = true;
     
        parentCallback(
            nickname,
            name,
            reservAt,
            tableNum,
            reservCount,
            isCar,
            phoneNum
        );    
  };

  
  return (
    <>
      <Background visible={modalTrigger} />
      <Container>
        <Header>
          <span
            style={{
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.5)",
              fontSize: "16px",
            }}
          >
            예약 등록
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
                nickname,
                name,
                reservAt,
                tableNum,
                reservCount,
                isCar,
                phoneNum
              );
            }}
          >
            <i className="fa-solid fa-xmark closeIcon"></i>
          </button>
        </Header>
        <InnerBox>
         
            <InputBox>
              <div>닉네임</div>
              <input
                className="nickname"
                type="text"
                value={nickname}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>
            <InputBox>
              <div>이름</div>
              <input
                type="text"
                className="name"
                value={name}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>
            <InputBox>
              <div>예약 시간</div>
              <input
                type="text"
                className="reservAt"
                value={reservAt}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>

            <InputBox>
              <div>테이블 번호</div>
              <input
                type="text"
                className="tableNum"
                value={tableNum}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>
            <InputBox>
              <div>예약 번호</div>
              <input
                type="text"
                className="reservCount"
                value={reservCount}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>
            <InputBox>
              <div>차량 여부</div>
              <input
                type="text"
                className="isCar"
                value={isCar}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>
            <InputBox>
              <div>전화 번호</div>
              <input
                type="text"
                className="phoneNum"
                value={phoneNum}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </InputBox>

         
         
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
                nickname,
                name,
                reservAt,
                tableNum,
                reservCount,
                isCar,
                phoneNum,
                )
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
export default ManageReservModal;
