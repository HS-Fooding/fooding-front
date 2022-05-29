import React from "react";
import styled from "styled-components";
import { useNavigate, Link, useMatch } from "react-router-dom";
import { AiOutlineHome, AiOutlineStar, AiOutlineUser } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";

const FooterContainer = styled.div`
  width: 410px;
  height: 60px;
  background-color: white;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.borderGrayColor};
  padding: 0px 10px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  z-index: 5;
`;

const FooterButton = styled.div`
  width: 80px;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  //color: ${(props) => props.theme.fontGrayColor};
  color: ${(props) => (props.match ? "black" : "rgba(0, 0, 0, 0.4)")};
  cursor: pointer;
  font-weight: ${(props) => (props.match ? "bold" : "normal")};

  svg {
    font-size: 23px;
    margin-bottom: 8px;
    // color: ${(props) => props.theme.fontGrayColor};
    color: ${(props) => (props.match ? "black" : "rgba(0, 0, 0, 0.4)")};
    font-weight: ${(props) => (props.match ? "bold" : "normal")};
  }
`;

const Footer = () => {
  let navigate = useNavigate();

  const reservListMatch = useMatch("/guest/myPage/reservList");
  const favorListMatch = useMatch("/guest/myPage/favorList");
  const homeMatch = useMatch("/guest/restaurantList");
  const myPageMatch = useMatch("/guest/myPage");

  return (
    <FooterContainer>
      <FooterButton
        match={homeMatch}
        onClick={() => {
          navigate("/guest/restaurantList");
        }}
      >
        <AiOutlineHome style={{ fontSize: "23px" }}></AiOutlineHome>
        <span>맛집찾기</span>
      </FooterButton>
      <FooterButton
        match={reservListMatch}
        onClick={() => {
          navigate("/guest/myPage/reservList");
        }}
      >
        <BiNotepad></BiNotepad>
        <span>예약내역</span>
      </FooterButton>
      <FooterButton
        match={favorListMatch}
        onClick={() => {
          navigate("/guest/myPage/favorList");
        }}
      >
        <AiOutlineStar></AiOutlineStar>
        <span>즐겨찾기</span>
      </FooterButton>
      <FooterButton
        match={myPageMatch}
        onClick={() => {
          navigate("/guest/myPage");
        }}
      >
        <AiOutlineUser></AiOutlineUser>
        <span>마이페이지</span>
      </FooterButton>
    </FooterContainer>
  );
};

export default Footer;
