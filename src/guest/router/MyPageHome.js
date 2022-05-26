import React from "react";
import styled from "styled-components";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/js/all.js";

const Container = styled.div`
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-items: center;
  margin-top: 140px;
  border-top: 1px solid ${(props) => props.theme.borderGrayColor};
  margin-left: 10px;
  margin-right: 10px;
`;

const Button = styled.div`
  width: 100%;
  padding: 50px 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  div {
    svg {
      color: ${(props) => props.theme.fontGrayColor};
      margin-right: 7px;
    }
  }

  .icon {
    color: ${(props) => props.theme.borderGrayColor};
  }
`;

const MyPageHome = () => {
  const logoutFun = () => {
    localStorage.clear("guestToken");
  };

  return (
    <Container>
      <Header back="/guest/restaurantList" title={"마이 페이지"} />
      <Buttons>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/guest/myPage/reservList"}
        >
          <Button>
            <div>
              <i className="fa-solid fa-list leftIcon"></i>
              예약 리스트
            </div>
            <FontAwesomeIcon icon={faAngleRight} className="icon" size="lg" />
          </Button>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/guest/myPage/favorList"}
        >
          <Button>
            <div>
              <i className="fa-regular fa-star leftIcon"></i>
              즐겨찾기
            </div>
            <FontAwesomeIcon icon={faAngleRight} className="icon" size="lg" />
          </Button>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/guest/login"}
        >
          <Button onClick={logoutFun}>로그아웃</Button>
        </Link>
      </Buttons>
    </Container>
  );
};

export default MyPageHome;
