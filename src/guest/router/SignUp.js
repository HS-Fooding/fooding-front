import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../component/Header";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { url } from "../../Api";

const Container = styled.div`
  /* width: 350px;
  height: 600px; */
  width: 410px;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

const Form = styled.form`
  margin-top: 90px;
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
  height: 60px;
  border-radius: 3px;
  font-size: 15px;
  cursor: pointer;
  //width: 308px;
  width: 370px;
  position: absolute;
  bottom: -137px;
`;
const SelectBox = styled.div`
  select {
    width: auto;
    margin-left: 20px;
    color: gray;
  }

  div {
    margin: 24px 8px;

    span {
      color: gray;
      font-size: 14px;
    }
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

function SignUp() {
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
        // ??????
        ...currentArray,
        e.target.value,
      ]);
      console.log("valueList", categoryValueSelected);
    }
    if (
      !categorySelected.includes(e.target.options[e.target.selectedIndex].text)
    ) {
      setCategorySelected((currentArray) => [
        // ??????
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
    const userAge = 2022 - data.age.substring(0, 4) + 1; // ?????? ??????

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
      role: ["ROLE_USER"],
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
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onValid = (data) => {
    // ????????? ????????? ??????, data??? ????????? ??????

    console.log(data);

    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "??????????????? ?????? ????????????." },
        { shouldFocus: true }
      );
    } else {
      navigate("/guest/login");
      reset();
      signUpPost(data);
    }
  };

  return (
    <Container>
      <Header back={"/"} title={"????????????"} />

      <Form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          {...register("Id", {
            required: "???????????? ???????????????.",
            minLength: {
              value: 1,
              message: "?????? 8??? ?????? ???????????????.",
            },
          })}
          placeholder="?????????"
        />
        <Message>{errors?.Id?.message}</Message>
        <Input
          {...register("password", {
            required: "??????????????? ???????????????.",
            minLength: {
              value: 1,
              message: "?????? 8??? ?????? ???????????????.",
            },
          })}
          placeholder="????????????"
          type="password"
        />
        <Message>{errors?.password?.message}</Message>
        <Input
          {...register("password1", {
            required: "???????????? ????????? ???????????????.",
          })}
          placeholder="???????????? ??????"
          type="password"
        />
        <Message>{errors?.password1?.message}</Message>
        <Input
          {...register("userName", {
            required: "????????? ???????????????.",
            minLength: {
              value: 2,
              message: "?????? 2??? ?????? ???????????????.",
            },
          })}
          placeholder="?????? (?????? ??????)"
        />
        <Message>{errors?.password?.message}</Message>
        <Input
          {...register("nickName", {
            required: "???????????? ???????????????.",
            minLength: {
              value: 2,
              message: "?????? 2??? ?????? ???????????????.",
            },
            validate: {
              /*noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
                */
            },
          })}
          placeholder="?????????"
        />
        <Message>{errors?.nickName?.message}</Message>

        <div style={{ display: "flex", width: "100%" }}>
          <Input
            {...register("age", {
              required: "????????? ???????????????.",
              minLength: {
                value: 8,
                message: "8????????? ???????????????.",
              },
              pattern: { value: /[0-9]/g, message: "????????? ??????????????????." },
            })}
            placeholder="???????????? (8?????? ??????)"
          />

          <RadioBox>
            <RadioButton
              type="radio"
              name="sex"
              value="female"
              {...register("sex")}
              readOnly
            />
            <span>??????</span>
            <RadioButton
              type="radio"
              name="sex"
              value="male"
              style={{ marginLeft: 12 }}
              {...register("sex")}
              readOnly
            />
            <span>??????</span>
          </RadioBox>
        </div>
        <Message>{errors?.age?.message}</Message>
        <SelectBox>
          <div>
            <span>??????</span>
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
            <span>?????? ??????</span>
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
        <SubmitBtn>????????????</SubmitBtn>
        <Message>{errors?.extraError?.message}</Message>
      </Form>
    </Container>
  );
}
export default SignUp;
