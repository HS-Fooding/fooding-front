import Header from "../component/Header";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../Api";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  margin: 30px;
  height: auto;
  padding: 20px;
  position: relative;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-top: 40px;
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
  //width: 308px;
  width: 370px;
  /* position: absolute;
  bottom: -137px; */
  margin-top: 50px;
`;
const SelectBox = styled.div`
  select {
    width: auto;
    margin-left: 20px;
  }

  div {
    margin: 18px 0px;
  }

  .CategoryTags {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 400px;
    height: 45px;

    .EachCategoryTag {
      display: flex;
      align-items: center;
      font-size: 12px;
      /* width:85px;         */
      height: 22px;
      color: gray;
      padding-right: 8px;
      border-radius: 5px;
      background-color: ${(props) => props.theme.fillGrayColor};
      background-color: ${(props) => props.theme.mainColor};
      color: white;
      margin-right: 6px;
      margin-bottom: 7px;
      .EachCategoryButton {
        display: flex;
        justify-content: center;
        align-items: center;
        /* border:0.5px solid gray; */
        border-radius: 3px;
        width: 15px;
        height: 14px;
        margin-left: 5px;
        margin-right: 7px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

function SignUpMg() {
  const [categoryValueSelected, setCategoryValueSelected] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);

  let navigate = useNavigate();

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

  const handleSelect = (e) => {
    if (!categoryValueSelected.includes(e.target.value)) {
      setCategoryValueSelected((currentArray) => [
        // 영어
        ...currentArray,
        e.target.value,
      ]);
      console.log("valueList", categoryValueSelected);
    }
    if (
      !categorySelected.includes(e.target.options[e.target.selectedIndex].text)
    ) {
      setCategorySelected((currentArray) => [
        // 한글
        ...currentArray,
        e.target.options[e.target.selectedIndex].text,
      ]);
      console.log("list", categorySelected);
    }
  };

  const categoryButtonClick = (index) => {
    setCategorySelected(
      categorySelected.filter((item, categoryIndex) => index !== categoryIndex)
    );
    setCategoryValueSelected(
      categoryValueSelected.filter(
        (item, categoryIndex) => index !== categoryIndex
      )
    );
    console.log("list", categorySelected);
    console.log("value list", categoryValueSelected);
  };

  const signUpPost = (data) => {
    console.log(data);
    const userAge = 2022 - data.age.substring(0, 4) + 1; // 나이 계산

    //   {
    //     "id" : "testAdmin",
    //     "password" : "testAdminpw",
    //      "name" : "testAdmin",
    //     "nickName" : "testAdmin",
    //      "sex" : true,
    //     "age" : 10,
    //      "favor" : ["KOREAN"],
    //     "role" : ["ROLE_ADMIN"],
    //      "job" : "STUDENT"
    //  }

    var axios = require("axios");
    var data = JSON.stringify({
      id: data.Id,
      password: data.password,
      sex: data.sex == "male" ? true : false,
      name: data.userName,
      nickName: data.nickName,
      age: userAge,
      role: ["ROLE_ADMIN"],
      job: data.job,
      favor: categoryValueSelected,
    });

    var config = {
      method: "post",
      url: url + "/fooding/join",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        navigate("/manager/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onValid = (data) => {
    // 데이터 전송시 작동, data는 입력된 값들

    console.log(data);

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
  };

  return (
    <Container>
      <Header back={"/"} title={"회원가입"} />

      <Title>SIGN UP</Title>
      <Form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          {...register("Id", {
            required: "아이디를 입력하세요.",
            minLength: {
              value: 1,
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
              value: 1,
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
        <SelectBox>
          <div>
            직업
            <select {...register("job")}>
              <option>STUDENT</option>
              <option>UNIV_STUDENT</option>
              <option>WORKER</option>
              <option>FREELANCER</option>
              <option>HOUSEWIVES</option>
              <option>NONE</option>
            </select>
          </div>
          <div>
            선호 음식
            <select
              onChange={handleSelect}
              value={categorySelected}
              // {...register("favor")}
            >
              <option>KOREAN</option>
              <option>JAPANESE</option>
              <option>CHINESE</option>
              <option>WESTERN</option>
              <option>SNACK</option>
              <option>NOODLE</option>
              <option>SOUP</option>
              <option>BBQ</option>
              <option>PORK</option>
              <option>BEEF</option>
              <option>CHICKEN</option>
              <option>LAMB</option>
              <option>CAFE</option>
            </select>
          </div>
          <ul className="CategoryTags">
            {categorySelected.map((value, index) => {
              return (
                <div style={{ display: "inlineBlock" }}>
                  <li key={index} className="EachCategoryTag">
                    <div
                      className="EachCategoryButton"
                      onClick={() => categoryButtonClick(index)}
                    >
                      X
                    </div>
                    <p>{value}</p>
                  </li>
                </div>
              );
            })}
          </ul>
        </SelectBox>
        <div>
          <SubmitBtn>회원가입</SubmitBtn>
        </div>
        <Message>{errors?.extraError?.message}</Message>
      </Form>
    </Container>
  );
}
export default SignUpMg;
