import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { url } from "../Api";

/*
{
	"userId" : "아이디",
	"userPassword" : "패스워드",
	"sex" : true,
	"userName": "정현승",
	"nickName": "별명",
	"email": "hansung@naver.com",
	"age" : 26,
	"role" : "ROLE_USER"
}
*/

const Container = styled.div`
  border: 1px solid black;
  width: 350px;
  height: 600px;
  position: relative;
  box-sizing: border-box;
`;

const Form = styled.form`
  margin-top: 60px;
  height: 500px;
  padding: 20px;
  position: relative;
`;

const Input = styled.input.attrs({ required: true })`
  margin-bottom: 20px;
  height: 30px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
  &:focus {
    outline: none;
  }
`;

const RadioBox = styled.div`
  padding: 0px 10px;
  font-size: 13px;
  /*display: inline-flex;
  align-items: center;*/
`;

const RadioButton = styled.input`
  cursor: pointer;
  appearance: none;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  background-color: white;
  border: 1px solid ${(props) => props.theme.mainColor};

  &:checked {
    background-color: ${(props) => props.theme.mainColor};
  }
`;

const Message = styled.span`
  color: ${(props) => props.theme.borderGrayColor};
  font-size: 12px;
  position: relative;
  bottom: 12px;
`;

const SubmitBtn = styled.button`
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  height: 50px;
  border-radius: 3px;
  font-size: 15px;
  cursor: pointer;
  width: 308px;
  position: absolute;
  bottom: 0;
`;

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      sex: "female",
    },
  });

  const signUpPost = (data) => {
    console.log(data);
    const userAge = 2022 - data.age.substring(0, 4) + 1; // 나이 계산
    console.log(userAge);

    var axios = require("axios");
    var data = JSON.stringify({
      userId: data.Id,
      userPassword: data.password,
      sex: data.sex == "male" ? true : false,
      userName: data.userName,
      nickName: data.nickName,
      age: userAge,
      role: "ROLE_USER",
    });

    var config = {
      method: "post",
      url: url + "/sample_project/join",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onValid = (data) => {
    // 데이터 전송시 작동, data는 입력된 값들
    /*
    Id: "asdfasdf"
    age: "20200202"
    password: "asdfasdf"
    password1: "asdfasdf"
    nickName"dd"
    sex: "male"
    userName: "asdf"
*/

    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "비밀번호가 맞지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      reset();
      signUpPost(data);
    }

    //setError("extraError", { message: "Server offline." });
  };

  return (
    <Container>
      <Link to={"/"}>
        <Header title={"회원가입"} />
      </Link>
      <Form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          {...register("Id", {
            required: "아이디를 입력하세요.",
            minLength: {
              value: 8,
              message: "최소 8자 이상 입력하세요.",
            },
          })}
          placeholder="아이디"
        />
        <Message>{errors?.Id?.message}</Message>
        <Input
          {...register("password", {
            required: "비밀번호를 입력하세요.",
            minLength: {
              value: 8,
              message: "최소 8자 이상 입력하세요.",
            },
          })}
          placeholder="비밀번호"
          type="password"
        />
        <Message>{errors?.password?.message}</Message>
        <Input
          {...register("password1", {
            required: "비밀번호 확인을 입력하세요.",
          })}
          placeholder="비밀번호 확인"
          type="password"
        />
        <Message>{errors?.password1?.message}</Message>
        <Input
          {...register("userName", {
            required: "이름을 입력하세요.",
            minLength: {
              value: 2,
              message: "최소 2자 이상 입력하세요.",
            },
          })}
          placeholder="이름 (실명 입력)"
        />
        <Message>{errors?.password?.message}</Message>
        <Input
          {...register("nickName", {
            required: "닉네임을 입력하세요.",
            minLength: {
              value: 2,
              message: "최소 2자 이상 입력하세요.",
            },
            validate: {
              /*noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,

              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
                */
            },
          })}
          placeholder="닉네임"
        />
        <Message>{errors?.nickName?.message}</Message>

        <div style={{ display: "flex", width: "100%" }}>
          <Input
            {...register("age", {
              required: "나이를 입력하세요.",
              minLength: {
                value: 8,
                message: "8자리를 입력하세요.",
              },
              pattern: { value: /[0-9]/g, message: "숫자만 입력해주세요." },
            })}
            placeholder="생년월일 (8자리 입력)"
          />

          <RadioBox>
            <RadioButton
              type="radio"
              name="sex"
              value="female"
              {...register("sex")}
              readOnly
            />
            <span>여성</span>
            <RadioButton
              type="radio"
              name="sex"
              value="male"
              style={{ marginLeft: 12 }}
              {...register("sex")}
              readOnly
            />
            <span>남성</span>
          </RadioBox>
        </div>
        <Message>{errors?.age?.message}</Message>
        <SubmitBtn>회원가입</SubmitBtn>
        <Message>{errors?.extraError?.message}</Message>
      </Form>
    </Container>
  );
}
export default SignUp;
