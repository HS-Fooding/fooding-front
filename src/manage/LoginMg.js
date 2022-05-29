import Header from "./component/Header";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../Api";
import { useNavigate, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  box-sizing: border-box;

  /* margin: 100px 0px; */
`;

const Form = styled.form`
  height: auto;
  width: 800px;
  /* border: 1px solid gray; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px 0px;
`;

const Input = styled.input.attrs({ required: true })`
  height: 60px;
  width: 100%;
  padding: 0px 10px;
  &:focus {
    outline: none;
  }
  border: none;
  &:first-child {
    border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
  }
  margin-left: 20px;
  font-size: 16px;
`;

const InputBox = styled.div`
  width: 480px;
  /* border: 1px solid rgba(0, 0, 0, 0.45); */
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  margin-bottom: 50px;
  margin-top: 70px;

  svg {
    position: absolute;
    color: gray;
  }
`;

const SubmitBtn = styled.button`
  border: none;
  height: 50px;
  border-radius: 3px;
  font-size: 15px;
  cursor: pointer;
  width: 308px;
  margin: 3px;
`;

const LoginBtn = styled(SubmitBtn)`
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  font-weight: bold;
`;

const SignupBtn = styled(SubmitBtn)`
  background-color: ${(props) => props.theme.lightMainColor};
  //border: 1px solid ${(props) => props.theme.lightMainColor};
  color: ${(props) => props.theme.mainColor};
  font-weight: bold;
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.theme.mainColor};
`;

const LoginMg = () => {
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {},
  });

  const logInPost = (data) => {
    var data = JSON.stringify({
      id: data.Id,
      password: data.password,
    });

    var config = {
      method: "post",
      url: url + "/fooding/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("responseresponse", response);
        localStorage.setItem("managerToken", response.data.token.accessToken);
        if (response.data.restaurants) {
          localStorage.setItem("marketId", response.data.restaurants[0]);
        }

        navigate("/manager/currentTableState");
        console.log(response.data.restaurants[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onValid = (data) => {
    console.log(data);

    reset();
    logInPost(data);
  };

  // useEffect(() => {
  //   localStorage.setItem("marketId", -1);
  // }, []);

  return (
    <Container>
      <Header />
      <div>
        <Form onSubmit={handleSubmit(onValid)}>
          <Span>LOGIN </Span>
          <InputBox>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0px 20px",
              }}
            >
              <i class="fa-regular fa-user"></i>
              <Input
                {...register("Id", {
                  required: "아이디를 입력하세요.",
                })}
                placeholder="아이디를 입력해주세요."
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0px 20px",
              }}
            >
              <i class="fa-solid fa-lock"></i>
              <Input
                {...register("password", {
                  required: "비밀번호를 입력하세요.",
                })}
                placeholder="비밀번호를 입력해주세요."
                type="password"
              />
            </div>
          </InputBox>
          <LoginBtn>로그인</LoginBtn>
          <Link to="/manager/signup">
            <SignupBtn>회원가입</SignupBtn>
          </Link>
        </Form>
      </div>
    </Container>
  );
};

export default LoginMg;
