import Header from "./component/Header";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../Api";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 200px 0px;
`;

const Form = styled.form`
  height: 400px;
  width: 800px;
  /* border: 1px solid gray; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const InputBox = styled.div`
  width: 480px;
  border: 1px solid rgba(0, 0, 0, 0.45);
  margin-bottom: 50px;
  margin-top: 70px;
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
  background-color: black;
  color: white;
`;

const SignupBtn = styled(SubmitBtn)`
  background-color: gray;
  color: white;
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

const LoginMg = () => {
  let navigate = useNavigate();

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
        console.log(response);
        navigate("/register");
        localStorage.setItem("token", response.data.accessToken);
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

  return (
    <Container>
      <Header />

      <Form onSubmit={handleSubmit(onValid)}>
        <Span>LOGIN</Span>
        <InputBox>
          <Input
            {...register("Id", {
              required: "아이디를 입력하세요.",
            })}
            placeholder="아이디를 입력해주세요."
          />
          <Input
            {...register("password", {
              required: "비밀번호를 입력하세요.",
            })}
            placeholder="비밀번호를 입력해주세요."
            type="password"
          />
        </InputBox>
        <LoginBtn>로그인</LoginBtn>
        <SignupBtn>회원가입</SignupBtn>
      </Form>
    </Container>
  );
};

export default LoginMg;
