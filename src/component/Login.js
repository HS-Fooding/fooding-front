import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import { Cookies } from "react-cookie";
import { url } from "../Api";
import { motion, AnimatePresence } from "framer-motion";
// border: 1px solid black;

const Container = styled.div`
  width: 350px;
  height: 600px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
const Login = () => {
  const [id, setId] = useState();
  const [ps, setPs] = useState();
  const changeId = (e) => setId(e.target.value);
  const changePs = (e) => setPs(e.target.value);
  const [modal, setModal] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    console.log("documentcookie", document.cookie);
  });
  // const getCookie=(name)=>{
  //   return cookies.get(name);
  // }
  // useEffect(()=>{
  //   //setCookie("JSESSIONID","");
  //   document.cookie="SameSite=None;Secure";
  // },[]);

  var getCookie = function (name) {
    var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    console.log("value", value);
    return value ? value[2] : null;
  };
  let setCookie = (cookie_name, value, exdays) => {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    let c_value =
      escape(value) +
      (exdays == null ? "" : ";expires=" + exdate.toUTCString());
    document.cookie = cookie_name + "=" + value;
  };

  const submitLogin = (e) => {
    e.preventDefault();

    // loginUser();
    var axios = require("axios");

    let content = {
      userId: id,
      userPassword: ps,
    };
    var config = {
      method: "post",
      url: url + "/login",
      headers: {
        crossDomain: true,
        "Content-Type": "application/json",
      },
      data: content,

      withCredentials: true,
    };
    axios(config)
      .then(function (response) {
        navigate("/");
        console.log("response ", response);
        console.log("response.data.name", response.data.name);

        localStorage.setItem("token", response.data.accessToken);
        console.log(response.status);
      })
      .catch(function (error) {
        //console.log(error);
        //에러가 떴으면 모달창 띄우기
        setModal(true);
      });
  };

  return (
    <Container>
      <Header back={"/"} title={"로그인"} />

      <AnimatePresence>
        {modal ? (
          <Modal>이메일 주소 혹은 비밀번호를 다시 확인하세요.</Modal>
        ) : null}
      </AnimatePresence>

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
          <Link to="/sign">
            <SignUpBut>SIGN IN</SignUpBut>
          </Link>
        </form>
      </FormContainer>
    </Container>
  );
};
export default Login;
