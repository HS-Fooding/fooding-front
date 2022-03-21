import Header from "./Header";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import Canvas from "./Canvas";

const Container = styled.div`
  margin-top: 200px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputFormDiv = styled.div`
  width: 80%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    height: 400px;
    width: 100%;
    margin-bottom: 10px;
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
      padding-top: 15px;
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
  height: 50px;
  border-bottom: 1px solid;
`;
const NameBox = styled.div`
  background-color: red;
  width: 20%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  width: 80%;
  height: 100%;
`;

const SmallInput = styled.input``;

const MenuForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
  width: 700px;
  border: 1px solid gray;
  height: 120px;
  margin-bottom: 20px;

  .ImgAndInput {
    padding: 10px 40px 10px 20px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .menuImg {
    width: 90px;
    height: 90px;

    background-color: aliceblue;
  }
  .menuInputs {
    display: flex;
    flex-direction: column;
    input {
      width: 500px;
      height: 30px;
      border: none;
      border-bottom: 1px solid gray;
      &:focus {
        outline: none;
      }
    }
  }
`;

const AddMenuBtn = styled.button`
  width: 100px;
  position: absolute;
`;

function Register() {
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const { register, watch, getValues } = useForm();

  const menuChange = (event) => setMenu(event.target.value);
  const priceChange = (event) => setPrice(event.target.value);

  const [countList, setCountList] = useState([0]);

  const addMenu = () => {
    let countArr = [...countList];
    console.log(countArr);
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter);
    setCountList(countArr);
  };
  console.log();
  return (
    <>
      <Container>
        <Header />
        <InputFormDiv>
          <form style={{ borderTop: "1px solid" }}>
            <div style={{ width: "50%", height: "210px" }}>
              <InputContainer>
                <NameBox>
                  <p>상호명</p>
                </NameBox>
                <InputBox>
                  <input
                    {...register("businessName")}
                    placeholder=" 상호명을 입력하시오."
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
                    placeholder=" 상세설명을 입력하시오"
                  />
                </InputBox>
              </InputContainer>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  const values = getValues();
                  console.log("values ", values);
                }}
              >
                등록
              </Button>
            </div>
          </form>
          <form style={{ borderBottom: "1px solid" }}>
            <div style={{ width: "50%", height: "400px" }}>
              <InputContainer style={{ borderTop: "1px solid " }}>
                <div></div>
                <NameBox>
                  <p>번호</p>
                </NameBox>
                <InputBox style={{ flexDirection: "column" }}>
                  <SmallInput type="text" placeholer="사업자 번호" />
                  <SmallInput
                    value={menu}
                    onChange={menuChange}
                    type="text"
                    placeholder=" 메뉴를 입력하시오"
                  />
                </InputBox>
              </InputContainer>
              <InputContainer>
                <NameBox>
                  <p>메뉴 가격</p>
                </NameBox>
                <InputBox>
                  <input
                    value={price}
                    onChange={priceChange}
                    type="text"
                    placeholder=" 가격을 입력하시오"
                  />
                </InputBox>
              </InputContainer>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(menu, price);
                }}
              >
                메뉴 추가
              </Button>
            </div>
          </form>
          <MenuForm>
            {countList.map((item, i) => (
              <MenuContainer key={i}>
                <div className="ImgAndInput">
                  <div className="menuImg"></div>
                  <div className="menuInputs">
                    <input type="text" placeholder="메뉴 이름" />
                    <input type="text" placeholder="메뉴 가격" />
                    <input type="text" placeholder="메뉴 설명 " />
                  </div>
                </div>
              </MenuContainer>
            ))}

            <div>
              <AddMenuBtn onClick={addMenu}>메뉴 추가</AddMenuBtn>
            </div>
          </MenuForm>
        </InputFormDiv>
      </Container>
    </>
    // </div>
  );
}
export default Register;
