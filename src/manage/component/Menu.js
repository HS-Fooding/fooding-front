import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../../Api";

const Button = styled.button`
  border: none;
  margin-top: 5px;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
  background-color: ${(props) => props.theme.mainColor};
  color: white;

  .submit {
    position: absolute;
    left: 0;
  }
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  width: 900px;
  /* border: ${(props) => props.theme.menuBorderColor}; */

  margin-bottom: 20px;
  margin-top: 150px;
  border-top: ${(props) => props.theme.menuBorderColor};
  border-left: ${(props) => props.theme.menuBorderColor};
`;

const MenuHeader = styled.div`
  height: 40px;
  width: 100%;
  background-color: ${(props) => props.theme.menuOrangeColor};
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
    img {
      border: none;
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
    line-height: 23px;
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

  .menuImg {
    border: none;
    img {
      border: none;
    }
  }

  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    position: absolute;
    display: inline-block;
    content: "";
    // border-style: hidden;
    //border: 0px;
    // border-width: 0px;
    // border: none;
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

  .menuImg {
    img {
      border: none;
    }
  }
  .menuDel {
    //trash
    button {
      color: ${(props) => props.theme.mainColor};
      border: 1px solid ${(props) => props.theme.mainColor};
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
  const [addMenu, setAddMenu] = useState(true);
  const [menu, setMenu] = useState("");
  const [menuImg, setMenuImg] = useState([]);
  const [file, setFile] = useState();
  const { register, handleSubmit, reset, watch, getValues } = useForm();

  const [menus, setMenus] = useState([]);

  const marketIdLS = localStorage.getItem("marketId");
  const getToken = localStorage.getItem("managerToken");

  const getMenus = () => {
    var config = {
      method: "get",
      //url: url + `/fooding/restaurant/${marketIdLS}/menu`,
      url: url + `/fooding/restaurant/${marketIdLS}/menu`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
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

    setMenuImg([img]);

    const prevFile = URL.createObjectURL(e.target.files[0]);
    setFile(prevFile);

    e.target.value = "";
  };
  function len_chk() {
    var frm = document.inserFrm.detail;
    if (frm.value.length > 30) {
      alert("글자수는 30자로 제한됩니다.");
      frm.value = frm.value.sbustring(0, 30);
      frm.focus();
    }
  }
  const menuPost = (postData) => {
    const content = {
      name: postData.menuName,
      description: postData.menuDesc,
      price: postData.menuPrice,
      isRepresentative: postData.menuMain,
    };
    console.log();

    let data = new FormData();
    data.append(
      "menu",
      new Blob([JSON.stringify(content)], { type: "application/json" })
    );

    // if (menuImg === []) {
    //   console.log("menuImg 없음");
    //   //data.append("image", menuImg);
    // } else {
    //   data.append("image", menuImg);
    // }f

    // if(menuImg !== []){
    //   menuImg.map((img) => {
    //     data.append("image", img);
    //   });
    // }c
    console.log(menuImg);

    // menuImg.map((img) => {
    //   data.append("image", img);
    // });

    data.append("image", menuImg[0]);

    console.log(menuImg);

    // ${marketIdLS}

    axios
      .post(url + `/fooding/admin/restaurant/${marketIdLS}/menu`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          //  "Content-Type": "application/json",
          Authorization: "Bearer " + getToken,
        },
      })
      .then((res) => {
        console.log(res);
        getMenus();
      })
      .catch((err) => {});
  };

  const onValid = (data) => {
    console.log("onvalid 함수");
    const values = getValues();
    console.log(data);
    setMenuImg("");
    setFile(undefined);
    reset();
    menuPost(values);
  };

  const deleteMenu = (id) => {
    console.log(id);
    var config = {
      method: "delete",
      url: url + `/fooding/admin/restaurant/${marketIdLS}/menu/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
      //data : data
    };

    axios(config)
      .then(function (response) {
        getMenus();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
                <img src={menu.image} class="menuImgTag" />
              </MenuProp>
              <MenuProp className="menuName" style={{ position: "relative" }}>
                <span>{menu.name}</span>
                {menu.representative ? <MainMenu>*대표</MainMenu> : null}
              </MenuProp>
              <MenuProp className="menuPrice">{menu.price}</MenuProp>
              <MenuProp className="menuDesc">{menu.description}</MenuProp>
              <MenuProp className="menuDel">
                <button onClick={() => deleteMenu(menu.id)}>
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
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "100px",
        }}
      >
        {addMenu ? (
          <Button onClick={addMenuFunc}>닫기</Button>
        ) : (
          <Button onClick={addMenuFunc}>추가</Button>
        )}
        {addMenu ? (
          <Button onClick={onValid} class="submitBtn">
            등록
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
