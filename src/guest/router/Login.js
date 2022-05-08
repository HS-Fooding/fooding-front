import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

import { useNavigate, Link } from "react-router-dom";

import { url } from "../../Api";
// src\Api.js
//src\guest\component\Login.js
import { motion, AnimatePresence } from "framer-motion";
// border: 1px solid black;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  margin-top: 90px;
  width: 350px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: ${(props) => props.theme.fontGrayColor};
    margin-top: 50px;
  }
  & input {
    width: 80%;
    padding-bottom: 10px;
    font-size: 15px;
    outline: none;
    border: none;
    border-bottom: solid 1px ${(props) => props.theme.borderGrayColor};
    margin-bottom: 30px;
  }
  & input:focus,
  :hover {
    outline: none;
  }
`;
const Icon = styled.div`
  font-size: 80px;
  width: 110px;
  height: 90px;
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-size: 10px;
`;
const LoginBut = styled.button`
  width: 80%;
  height: 35px;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => props.theme.mainColor};
  font-weight: bold;
  &:focus,
  :hover {
    cursor: pointer;
  }
`;
const SignUpBut = styled.button`
  width: 280px;
  height: 35px;
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.mainColor};
  border-radius: 10px;
  font-weight: bold;
  color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.subColor};
  &:focus,
  :hover {
    cursor: pointer;
  }
`;
const appearDisappear = keyframes`
    0%{
      opacity:0;
    }
    50%{
      opacity:1.0;
    }
    100%{
      opacity:0;
      
    }
`;
const Modal = styled.div`
  z-index: 1;
  position: absolute;
  width: 90%;
  margin-top: 60%;
  height: 50px;
  background-color: gray;
  color: white;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  opacity: 0;
  animation: ${appearDisappear} 2s ease-in-out;
`;
// const modalAnimation ={
//   entry:{
//     opacity:0,
//     scale:0,
//   },
//   center:{
//     opacity:1,
//     transition: {
//       duration: 0.3,
//     },
//     scale:1,
//   },
//   exit:{
//     opacity:0,
//     transition: {
//       duration: 0.3,

//     },
//     scale:0,
//   },
// }
const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  color: black;
  padding: 5px 15px;
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  /* /* position: absolute; */
  position: sticky;
  top: 0;
  font-weight: bold;
  z-index: 3;
  .icon {
    display: flex;
    width: 20px;
    margin-right: 150px;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.manColor};
    }
    color: ${(props) => props.theme.mainColor};
  }
`;
const Login = () => {
  const [id, setId] = useState();
  const [ps, setPs] = useState();
  const changeId = (e) => setId(e.target.value);
  const changePs = (e) => setPs(e.target.value);
  const [modal, setModal] = useState(false);
  const [tempModal, setTempModal] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    console.log("documentcookie", document.cookie);
    // console.log("modal",modal);
    //modal이 true로 바뀌면
  }, [modal]);

  const check = () => {
    console.log("checkModal", modal);
  };
  const submitLogin = (e) => {
    e.preventDefault();

    // loginUser();
    var axios = require("axios");

    // let content = {
    //   id: id,
    //   password: ps,
    // };

    var data = JSON.stringify({
      id: id,
      password: ps,
    });

    var config = {
      method: "post",
      url: url + "/fooding/login",
      headers: {
        //crossDomain: true,
        "Content-Type": "application/json",
      },
      data: data,

      //ithCredentials: true,
    };
    axios(config)
      .then(function (response) {
        navigate("/guest/restaurantList");
        console.log("response ", response);

        console.log("token", response.data.token.accessToken);

        localStorage.setItem("token", response.data.token.accessToken);
        console.log(response.status);
      })
      .catch(function (error) {
        //console.log(error);
        //에러가 떴으면 모달창 띄우기
        setModal(true);

        setTempModal(true);
        //   console.log("modal1",modal);
        //modal div를 아예 지우기

        // console.log("modal2",modal);
        modalSet();
        //check();
      });
  };
  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  async function modalSet() {
    await delay();
    setModal(false);
  }
  return (
    <Container>
      <Header>
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="icon" size="lg" />
        </div>
        <p>로그인</p>
      </Header>
      {/* 2초뒤에 없애기 */}
      <>
        <AnimatePresence>
          {modal ? (
            <Modal>이메일 주소 혹은 비밀번호를 다시 확인하세요.</Modal>
          ) : null}
        </AnimatePresence>
      </>
      <FormContainer>
        <Icon>🍮</Icon>

        <form>
          {/* <Title>Id</Title> */}
          <input type="text" onChange={changeId} placeholder="ID" />
          {/* <Title>Password</Title> */}
          <input type="password" onChange={changePs} placeholder="Password" />
          <LoginBut onClick={submitLogin}>LOGIN</LoginBut>
          <br />
          <span style={{ fontSize: "14px" }}>OR</span> <br />
          <Link to="/guest/sign">
            <SignUpBut>SIGN IN</SignUpBut>
          </Link>
        </form>
      </FormContainer>
    </Container>
  );
};
export default Login;
