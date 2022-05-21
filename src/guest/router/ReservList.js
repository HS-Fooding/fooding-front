import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import { url } from "../../Api";
import axios from "axios";

const Container = styled.div`
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Reservations = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  padding: 50px 10px;
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
  display: flex;
  flex-direction: column;
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
`;

const ReservList = () => {
  const [reservations, setReservations] = useState();
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

  const deleteReservation = (id) => {
    console.log(id);
    var config = {
      method: "delete",
      url: url + `/fooding/mypage/reservation/${id}`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        getReservation();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container>
      <Header back="/guest/myPage" title={"예약 리스트"} />
      <Reservations>
        {reservations?.map((r, index) => (
          <Reservation key={index}>
            <Info>
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
    </Container>
  );
};

export default ReservList;
