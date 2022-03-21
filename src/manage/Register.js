import Header from "./Header";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";

const Container = styled.div`
  margin-top: 200px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputFormDiv = styled.div`
  width: 700px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    height: 400px;
    width: 100%;
    margin-bottom: 40px;
    position: relative;

    button {
      border: none;
      margin-top: 5px;
      width: 100px;
      height: 35px;
      border-radius: 60px;
    }
    input {
      border: none;
      border-bottom: 1px solid white;
      width: 100%;
      height: 35px;
      font-size: 18px;
      padding-top: 10px;
      padding-bottom: 5px;

      box-sizing: border-box;
    }
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 15px;
      box-sizing: border-box;
      resize: none;
    }

    input:focus,
    textarea:focus {
      outline: none;
    }
  }
`;
const FirstTr = styled.tr`
  border-top: 1px solid;
`;
const Button = styled.button`
  position: absolute;
  right: 0;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid;
`;
const NameBox = styled.div`
  width: 140px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid;
`;
const SubBox = styled.div`
  width: 20%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  width: 345px;
  height: 94%;
  margin-left: 3px;
`;
const NumContainer = styled.div`
  width: 80%;
  height: 80px;
  .NumInputStyle {
    width: 80%;
    font-size: 15px;
    height: 25px;
    margin-left: 3px;
  }
  .InputNTitleContainer {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid;
    display: flex;
    align-items: center;
  }

  .TimeInput {
    width: 120px;
    font-size: 15px;
    height: 25px;

    margin-top: 1px;
    margin-left: 3px;
  }
`;
const SmallInput = styled.input``;

function Register() {
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const { register, watch, getValues } = useForm();
  const menuChange = (event) => setMenu(event.target.value);
  const priceChange = (event) => setPrice(event.target.value);
  console.log();
  return (
    <Container>
      <Header />
      <InputFormDiv>
        <form style={{ borderTop: "1px solid", height: "500px" }}>
          <div
            style={{
              width: "100%",
              height: "150px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "70%" }}>
              <InputContainer>
                <NameBox>
                  <p>상호명</p>
                </NameBox>
                <InputBox>
                  <input
                    {...register("businessName")}
                    placeholder="상호명을 입력하시오."
                  />
                </InputBox>
              </InputContainer>
              <InputContainer style={{ height: "120px" }}>
                <NameBox>
                  <p>상세설명</p>
                </NameBox>
                <InputBox>
                  <textarea
                    {...register("detail")}
                    style={{ fontFamily: "Roboto" }}
                    placeholder="상세설명을 입력하시오"
                  />
                </InputBox>
              </InputContainer>
            </div>
            <div style={{ width: "30%", height: "180px" }}>
              <InputContainer style={{ height: "100%" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "gray",
                  }}
                >
                  이미지
                </div>
              </InputContainer>
            </div>
          </div>
        </form>
        <form>
          {/* <div style={{ width: "100%", height: "100px",}}> */}
          <InputContainer
            style={{
              height: "80px",
              marginTop: "10px",
              borderTop: "1px solid ",
            }}
          >
            <NameBox>
              <p>번호</p>
            </NameBox>
            <NumContainer>
              <div className="InputNTitleContainer">
                <SubBox>사업자 번호</SubBox>
                <input
                  className="NumInputStyle"
                  {...register("businessNum")}
                  placeholder="번호를 입력하시오"
                  style={{ marginTop: "1px" }}
                />
              </div>
              <div className="InputNTitleContainer">
                <SubBox>개인 번호</SubBox>
                <input
                  className="NumInputStyle"
                  {...register("personalNum")}
                  placeholder="번호를 입력하시오"
                  style={{ alignItems: "center" }}
                />
              </div>
            </NumContainer>
          </InputContainer>
          {/* </div> */}
          {/* <div style={{ width: "100%", height: "400px", marginTop:"10px" }}> */}
          <InputContainer
            style={{
              height: "80px",
              borderTop: "1px solid",
              marginTop: "20px",
            }}
          >
            <NameBox>
              <p>시간</p>
            </NameBox>
            <NumContainer>
              <div className="InputNTitleContainer">
                <SubBox>평일 시간대</SubBox>
                <input
                  type="time"
                  className="TimeInput"
                  {...register("weekdayTimeStart")}
                />
                <p>부터</p>
                <input
                  type="time"
                  className="TimeInput"
                  {...register("weekdayTimeEnd")}
                />
                <p>까지</p>
              </div>
              <div className="InputNTitleContainer">
                <SubBox>주말 시간대</SubBox>
                <input
                  type="time"
                  className="TimeInput"
                  {...register("weekendTimeStart")}
                />
                <p>부터</p>
                <input
                  type="time"
                  className="TimeInput"
                  {...register("weekendTimeEnd")}
                />
                <p>까지</p>
              </div>
            </NumContainer>
          </InputContainer>

          {/* </div> */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              const values = getValues();
              console.log("values ", values);
            }}
          >
            등록
          </Button>
        </form>
      </InputFormDiv>
    </Container>
    // </div>
  );
}
export default Register;
