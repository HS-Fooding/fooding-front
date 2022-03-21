import Header from "./Header";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 200px 0px;
`;
const InputFormDiv = styled.div`
  width: 700px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .NameForm {
    height: 500px;
    .BorderTop {
      border-top: ${(props) => props.theme.menuBorderColor};
    }
  }
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
  border-bottom: ${(props) => props.theme.menuBorderColor};
`;
const InfoForm = styled.form`
  .NumberContainer {
    height: 80px;
    margin-top: 10px;
  }
  .BorderTop {
    border-top: ${(props) => props.theme.menuBorderColor};
  }
  .Time {
    height: 80px;
    margin-top: 20px;
  }
`;
const NameBox = styled.div`
  width: 140px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: ${(props) => props.theme.menuBorderColor};
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
    &:nth-child(1),
    &:nth-child(3) {
      border-bottom: ${(props) => props.theme.menuBorderColor};
    }
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

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  width: 700px;
  //border: ${(props) => props.theme.menuBorderColor};

  margin-bottom: 20px;
  margin-top: 50px;
  border-top: ${(props) => props.theme.menuBorderColor};
  border-left: ${(props) => props.theme.menuBorderColor};
`;

const MenuHeader = styled.div`
  height: 40px;
  width: 100%;
  background-color: rgb(237, 237, 237);
  display: flex;
  justify-content: center;
  align-items: center;
  //border-bottom: ${(props) => props.theme.menuBorderColor};
  border-bottom: ${(props) => props.theme.menuBorderColor};
  //border-top: ${(props) => props.theme.menuBorderColor};
  .menuImg {
    width: 20%;
  }
  .menuName {
    width: 20%;
  }
  .menuPrice {
    width: 20%;
  }
  .menuDes {
    width: 40%;
  }
`;

const MenuProp = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-right: ${(props) => props.theme.menuBorderColor};

  padding: 9px;

  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
  }
  input {
    width: 100%;
    height: 30px;
  }
  textarea {
    width: 100%;
    height: 70px;
    resize: none;
  }

  input:focus,
  textarea:focus {
    outline: none;
  }
`;

const MenuItem = styled(MenuHeader)`
  background-color: white;
  height: 100px;
`;

const MenuInput = styled(MenuHeader)`
  background-color: white;
  height: 100px;
`;

const AddMenuBtn = styled.button`
  width: 100px;
`;

function Register() {
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const { register, watch, getValues } = useForm();
  const menuChange = (event) => setMenu(event.target.value);
  const priceChange = (event) => setPrice(event.target.value);
  const [addMenu, setAddMenu] = useState(false);

  const addMenuFunc = () => setAddMenu((current) => !current);
  return (
    <Container>
      <Header />
      <InputFormDiv>
        <form className="NameForm">
          <div
            style={{
              width: "100%",
              height: "150px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "70%" }}>
              <InputContainer className="BorderTop">
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
        <InfoForm>
          {/* <div style={{ width: "100%", height: "100px",}}> */}
          <InputContainer className="NumberContainer BorderTop">
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
          <InputContainer className="Time BorderTop">
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
        </InfoForm>
      </InputFormDiv>
      <MenuList>
        <MenuHeader>
          <MenuProp className="menuImg">이미지</MenuProp>
          <MenuProp className="menuName">메뉴명</MenuProp>
          <MenuProp className="menuPrice">가격</MenuProp>
          <MenuProp className="menuDes">상세설명</MenuProp>
        </MenuHeader>
        <MenuItem>
          <MenuProp className="menuImg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTKPDx1O2bYkd2XpUCoufgO03ERC5JzdxdIl9GFVXNf9q5j9kov4AInChkSy8Q0girIxM&usqp=CAU" />
          </MenuProp>
          <MenuProp className="menuName">불닭볶음면</MenuProp>
          <MenuProp className="menuPrice">1300</MenuProp>
          <MenuProp className="menuDes">너무 맵고 맛있다.</MenuProp>
        </MenuItem>
        {addMenu ? (
          <MenuInput>
            <MenuProp className="menuImg"></MenuProp>
            <MenuProp className="menuName">
              <input placeholder="메뉴명" />
            </MenuProp>
            <MenuProp className="menuPrice">
              <input placeholder="가격" />
            </MenuProp>
            <MenuProp className="menuDes">
              <textarea placeholder="상세설명" />
            </MenuProp>
          </MenuInput>
        ) : null}
      </MenuList>
      {addMenu ? (
        <AddMenuBtn onClick={addMenuFunc}>등록</AddMenuBtn>
      ) : (
        <AddMenuBtn onClick={addMenuFunc}>추가</AddMenuBtn>
      )}
    </Container>
    // </div>
  );
}
export default Register;
