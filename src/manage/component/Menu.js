import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

const Button = styled.button`
  border: none;
  margin-top: 5px;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  width: 700px;
  /* border: ${(props) => props.theme.menuBorderColor}; */

  margin-bottom: 20px;
  margin-top: 150px;
  border-top: ${(props) => props.theme.menuBorderColor};
  border-left: ${(props) => props.theme.menuBorderColor};
`;

const MenuHeader = styled.div`
  height: 40px;
  width: 100%;
  background-color: ${(props) => props.theme.fillGrayColor};
  display: flex;
  justify-content: center;
  align-items: center;
  //border-bottom: ${(props) => props.theme.menuBorderColor};
  border-bottom: ${(props) => props.theme.menuBorderColor};
  //border-top: ${(props) => props.theme.menuBorderColor};
  .menuImg {
    width: 15%;
    input {
      display: none;
    }
    position: relative;
  }
  .menuName {
    width: 20%;
  }
  .menuPrice {
    width: 15%;
  }
  .menuDesc {
    width: 40%;
  }
  .menuDel {
    width: 10%;
    input[type="checkbox"] {
      display: none;
    }
    input[type="checkbox"] + label {
      display: inline-block;
      width: 17px;
      height: 17px;
      border: 1px solid #707070;
      position: relative;
    }
    input[id="check1"]:checked + label::after {
      content: "✔";
      font-size: 15px;
      width: 15px;
      height: 15px;
      text-align: center;
      position: absolute;
      left: 0;
      top: 0;
    }
    span {
      margin-left: 4px;
      font-size: 12px;
    }
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
    position: absolute;
    display: inline-block;
    content: "";
    border-style: hidden;
    border: 0px;
    border-width: 0px;
  }
  input {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: ${(props) => props.theme.menuBorderColor};
  }
  textarea {
    width: 100%;
    height: 70px;
    resize: none;
    border-radius: 5px;
    border: ${(props) => props.theme.menuBorderColor};
  }

  input:focus,
  textarea:focus {
    outline: none;
  }
`;

const MenuItem = styled(MenuHeader)`
  background-color: white;
  height: 100px;

  .menuDel {
    //trash
    button {
      color: red;
      border: 1px solid red;
      background-color: white;
      border-radius: 2px;
      cursor: pointer;
    }
  }
`;

const MenuInput = styled(MenuHeader)`
  background-color: white;
  height: 100px;
`;

const FileIcon = styled.label`
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: none;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddMenuBtn = styled(Button)`
  width: 100px;
`;

const Menu = () => {
  const [addMenu, setAddMenu] = useState(false);
  const [menu, setMenu] = useState("");
  const [menuImg, setMenuImg] = useState();
  const [file, setFile] = useState();
  const { register, handleSubmit, reset, watch, getValues } = useForm();

  const menuChange = (event) => setMenu(event.target.value);
  //const priceChange = (event) => setPrice(event.target.value);

  const addMenuFunc = () => setAddMenu((current) => !current);

  const onChangeImage = (e) => {
    e.preventDefault();
    const img = e.target.files[0];

    setMenuImg(img);

    const prevFile = URL.createObjectURL(e.target.files[0]);
    setFile(prevFile);

    e.target.value = "";
  };

  const menuPost = () => {};

  const onValid = (data) => {
    console.log(data);
    reset();
    menuPost();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <MenuList>
          <MenuHeader>
            <MenuProp className="menuImg">이미지</MenuProp>
            <MenuProp className="menuName">메뉴명</MenuProp>
            <MenuProp className="menuPrice">가격</MenuProp>
            <MenuProp className="menuDesc">상세설명</MenuProp>
            <MenuProp className="menuDel"></MenuProp>
          </MenuHeader>
          <MenuItem>
            <MenuProp className="menuImg">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTKPDx1O2bYkd2XpUCoufgO03ERC5JzdxdIl9GFVXNf9q5j9kov4AInChkSy8Q0girIxM&usqp=CAU" />
            </MenuProp>
            <MenuProp className="menuName">불닭볶음면</MenuProp>
            <MenuProp className="menuPrice">1300</MenuProp>
            <MenuProp className="menuDesc">너무 맵고 맛있다.</MenuProp>
            <MenuProp className="menuDel">
              <button>
                {/* <i className="fa-solid fa-trash"></i> */}
                삭제
              </button>
            </MenuProp>
          </MenuItem>
          {addMenu ? (
            <MenuInput>
              <MenuProp className="menuImg">
                <input
                  {...register("menuImg", {
                    required: "아이디를 입력하세요.",
                  })}
                  id="image_input"
                  type="file"
                  accept="image/jpg,image/png,image/jpeg,image/gif"
                  name="photo"
                  onChange={onChangeImage}
                />
                <FileIcon htmlFor="image_input">
                  {file === undefined ? (
                    <FontAwesomeIcon
                      style={{
                        color: "rgba(200, 200, 200, 0.5)",
                        fontSize: "30px",
                      }}
                      icon={faCamera}
                    />
                  ) : null}
                </FileIcon>
                {file !== undefined ? (
                  <img src={file} style={{ border: "0" }} />
                ) : null}
              </MenuProp>
              <MenuProp className="menuName">
                <input {...register("menuName", {})} placeholder="메뉴명" />
              </MenuProp>
              <MenuProp className="menuPrice">
                <input {...register("menuPrice", {})} placeholder="가격" />
              </MenuProp>
              <MenuProp className="menuDesc">
                <textarea
                  {...register("menuDesc", {})}
                  placeholder="상세설명"
                />
              </MenuProp>
              <MenuProp className="menuDel">
                <input
                  {...register("menuMain", {})}
                  type="checkbox"
                  id="check1"
                />
                <label htmlFor="check1"></label>
                <span>대표</span>
              </MenuProp>
            </MenuInput>
          ) : null}
        </MenuList>
        {addMenu ? (
          <Button onClick={addMenuFunc}>등록</Button>
        ) : (
          <Button onClick={addMenuFunc}>추가</Button>
        )}
      </form>
    </div>
  );
};

export default Menu;
