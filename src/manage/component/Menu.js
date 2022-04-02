import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";

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

const MainMenu = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 10px;
  color: red;
`;

const Menu = ({ marketId }) => {
  const [addMenu, setAddMenu] = useState(false);
  const [menu, setMenu] = useState("");
  const [menuImg, setMenuImg] = useState();
  const [file, setFile] = useState();
  const { register, handleSubmit, reset, watch, getValues } = useForm();

  const [menus, setMenus] = useState([]);

  const marketIdLS = localStorage.getItem("marketId");
  const getToken = localStorage.getItem("token");

  const getMenus = () => {
    var config = {
      method: "get",
      url: `http://13.124.207.219:8080/fooding/restaurant/${marketIdLS}/menu`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setMenus(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getMenus();
  }, [marketIdLS]);

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

  const menuPost = (postData) => {
    const content = {
      name: postData.menuName,
      description: postData.menuDesc,
      price: postData.menuPrice,
      isRepresentative: postData.menuMain,
    };

    let data = new FormData();
    data.append(
      "menu",
      new Blob([JSON.stringify(content)], { type: "application/json" })
    );
    data.append("image", menuImg);

    axios
      .post(
        `http://13.124.207.219:8080/fooding/admin/restaurant/${marketIdLS}/menu`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            //  "Content-Type": "application/json",
            Authorization: "Bearer " + getToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getMenus();
      })
      .catch((err) => {});
  };

  const onValid = (data) => {
    console.log(data);
    reset();
    menuPost(data);
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

          {menus.map((menu, index) => (
            <MenuItem key={index}>
              <MenuProp className="menuImg">
                <img src={menu.image} />
              </MenuProp>
              <MenuProp className="menuName" style={{ position: "relative" }}>
                <span>{menu.name}</span>
                {menu.representative ? <MainMenu>*대표</MainMenu> : null}
              </MenuProp>
              <MenuProp className="menuPrice">{menu.price}</MenuProp>
              <MenuProp className="menuDesc">{menu.description}</MenuProp>
              <MenuProp className="menuDel">
                <button>
                  {/* <i className="fa-solid fa-trash"></i> */}
                  삭제
                </button>
              </MenuProp>
            </MenuItem>
          ))}

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
