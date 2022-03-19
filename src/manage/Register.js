import Header from "./Header";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";

const Container = styled.div`
  //width: 100%;
  //height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;

  //align-items: center;
`;
const InputForm = styled.div`
  margin-top: 10px;
  width: 500px;
  height: 600px;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid;
  form {
    height: 240px;
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    table {
      box-sizing: border-box;

      th {
        width: 130px;
        background-color: rgba(0, 0, 0, 0.3);
      }
      /* th:first-child,td:first-child{
                border-top:1px solid black;
            } */
      th,
      td {
        border-bottom: 1px solid;
      }
    }
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
      height: 150px;
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
`;
function Register() {
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const { register, watch, getValues } = useForm();
  const menuChange = (event) => setMenu(event.target.value);
  const priceChange = (event) => setPrice(event.target.value);
  console.log();
  return (
    <div>
      {/* <div style={{}}> */}
      <Header />
      <Container>
        <InputForm>
          <form>
            <table style={{ width: "100%" }}>
              <FirstTr>
                <th>상호명 </th>
                <td>
                  <input
                    {...register("businessName")}
                    placeholder="상호명을 입력하시오."
                  />
                </td>
              </FirstTr>
              <tr style={{ height: "100px" }}>
                <th>상세설명</th>
                <td>
                  <textarea
                    {...register("detail")}
                    placeholder="상세설명을 입력하시오"
                  />
                </td>
              </tr>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  const values = getValues();
                  console.log("values ", values);
                }}
              >
                등록
              </Button>
            </table>
          </form>
          <form>
            <table style={{ width: "100%" }}>
              <FirstTr>
                <th>메뉴 이름</th>
                <td>
                  <input
                    value={menu}
                    onChange={menuChange}
                    type="text"
                    placeholder="메뉴를 입력하시오"
                  />
                </td>
              </FirstTr>
              <tr>
                <th>메뉴 가격</th>
                <td>
                  <input
                    value={price}
                    onChange={priceChange}
                    type="text"
                    placeholder="가격을 입력하시오"
                  />
                </td>
              </tr>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(menu, price);
                }}
              >
                메뉴 추가
              </Button>
            </table>
          </form>
          {/* <form>
                    상호명<input {...register("businessName")} placeholder="상호명을 입력하시오." />    
                    상세설명<textarea {...register("detail")}  placeholder="상세설명을 입력하시오" />
                      
                    <button onClick={(e)=>{
                            e.preventDefault();
                            const values=getValues();
                            console.log("values ",values);
                    }}>등록</button>

                    </form>
                    </table>     
                    <form>
                    메뉴 이름<input value={menu} onChange={menuChange} type="text" placeholder="메뉴를 입력하시오" />
                    메뉴 가격<input value={price} onChange={priceChange} type="text" placeholder="가격을 입력하시오" />
                    <button onClick={(e)=>{
                        e.preventDefault();
                        console.log(menu,price);
                    }}>메뉴 등록</button>
                    </form> */}
        </InputForm>
      </Container>
    </div>
  );
}
export default Register;
