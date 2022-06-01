import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import { url } from "../../Api";
import axios from "axios";
import Footer from "../component/Footer";

const Container = styled.div`
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Reservations = styled.div`
  display: flex;
  flex-direction: column;
  height: 670px;

  padding: 37px 10px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Reservation = styled.div`
  width: 100%;
  height: 160px;

  display: flex;

  padding: 15px 10px;
  justify-content: space-between;
  /* border: 1px solid gray; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Info = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 80%;
  div {
    margin: 10px 7px;
  }
  .resName {
    font-weight: bold;
    font-size: 19px;
  }

  span {
    color: #808080;
  }
`;

const CancelBtnBox = styled.div`
  display: flex;
  align-items: center;

  button {
    background: none;
    border: none;
    /* border: 1px solid red; */
    color: ${(props) => props.theme.fontGrayColor};
    padding: 5px 6px;
    font-size: 19px;
    cursor: pointer;
  }

  svg {
    z-index: 5;
  }
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 410px;
  height: 770px;
  box-sizing: border-box;
  background: #00000080;
  z-index: 10;
`;

const Modal = styled.div`
  position: absolute;
  width: 330px;
  height: 200px;
  left: 8%;
  top: 30%;
  background: white;
  z-index: 11;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 16px;

  .closeBtn {
    display: flex;
    justify-content: right;

    /* span {
      float: right;
    } */
  }

  .message {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 57px 0px 40px 0px;
  }

  .btns {
    display: flex;
    justify-content: center;
    button {
      border: none;
      width: 88px;
      height: 40px;
      border-radius: 4px;
      margin: 3px;
      cursor: pointer;
    }

    button:first-child {
    }

    button:last-child {
      background: ${(props) => props.theme.mainColor};
      color: white;
    }
  }
`;
const Notice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.fontGrayColor};
  margin: 50px 0px;
`;

const ReservList = () => {
  const [reservations, setReservations] = useState();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  let navigate = useNavigate();

  const getToken = localStorage.getItem("guestToken");

  const getReservation = () => {
    var config = {
      method: "get",
      url: url + `/fooding/mypage/reservation`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setReservations(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  let statusId;
  useEffect(() => {
    getReservation();
  }, []);

  const clickDelete = () => {
    var config = {
      method: "delete",
      url: url + `/fooding/mypage/reservation/${deleteId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setShowModal(false);
        getReservation();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteReservation = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  return (
    <Container>
      <Header back="/guest/myPage" title={"예약내역"} />
      <Reservations>
        {reservations?.length == 0 ? (
          <Notice>예약이 존재하지 않습니다.</Notice>
        ) : null}
        {reservations?.map((r, index) => (
          <Reservation key={index}>
            <Info
              onClick={() => {
                navigate(`/guest/${r.restId}`);
              }}
            >
              <div className="resName">{r.restName}</div>
              <div>
                <span>{r.reserveDate}</span> <span>{r.reserveTime}</span>
              </div>
              <div>
                <span>{r.reserveCount}명</span> <span>/</span>{" "}
                {r.isCar ? <span>차량 있음</span> : <span>차량 없음</span>}
              </div>
            </Info>
            <CancelBtnBox>
              <button
                onClick={() => {
                  deleteReservation(r.reserveId);
                }}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </CancelBtnBox>
          </Reservation>
        ))}
      </Reservations>
      {showModal ? (
        <ModalContainer>
          <Modal>
            {/* <div className="closeBtn">
              <span onClick = {() => {setShowModal(false)}} >X</span>
            </div> */}
            <div className="message">예약을 취소하시겠습니까?</div>
            <div className="btns">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                닫기
              </button>
              <button onClick={clickDelete}>확인</button>
            </div>
          </Modal>
        </ModalContainer>
      ) : null}
      <Footer></Footer>
    </Container>
  );
};

export default ReservList;
