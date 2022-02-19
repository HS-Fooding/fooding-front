import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  margin-top: 40px;
  height: 500px;
  padding: 20px;
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

const SubmitBtn = styled.button`
  position: absolute;
  bottom: 0;
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  height: 50px;
  border-radius: 3px;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
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

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = (data) => {
    // 데이터 전송시 작동, data는 입력된 값들
    console.log(data);
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "비밀번호가 맞지 않습니다." },
        { shouldFocus: true }
      );
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
        />
        <Message>{errors?.password?.message}</Message>
        <Input
          {...register("password1", {
            required: "비밀번호 확인을 입력하세요.",
            minLength: {
              value: 8,
              message: "최소 8자 이상 입력하세요.",
            },
          })}
          placeholder="비밀번호 확인"
        />
        <Message>{errors?.password1?.message}</Message>
        <Input
          {...register("email", {
            required: "이메일을 입력하세요.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed.",
            },
          })}
          placeholder="Email"
        />

        <Message>{errors?.email?.message}</Message>

        <Input
          {...register("userName", {
            required: "닉네임을 입력하세요.",
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
        <Message>{errors?.userName?.message}</Message>

        <div style={{ display: "flex", width: "100%" }}>
          <Input {...register("age")} placeholder="나이" />
          <Message>{errors?.age?.message}</Message>
          <RadioBox>
            <RadioButton
              type="radio"
              name="sex"
              value="female"
              checked="checked"
            />
            <span>여성</span>
            <RadioButton
              type="radio"
              name="sex"
              value="male"
              style={{ marginLeft: 12 }}
              {...register("sex", {
                required: "성별을 입력하세요.",
              })}
            />
            <span>남성</span>
          </RadioBox>
        </div>
        <SubmitBtn>회원가입</SubmitBtn>
        <Message>{errors?.extraError?.message}</Message>
      </Form>
    </Container>
  );
}
export default SignUp;
