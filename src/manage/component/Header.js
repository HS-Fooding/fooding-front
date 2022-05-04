import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useLocation } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  background-color: #21201e;
  color: white;
  box-sizing: border-box;
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: right;
`;

const Items = styled.ul`
  display: flex;
  .small {
    font-size: 13px;
  }
`;

const Item = styled.li`
  margin-left: 20px;
  align-self: flex-end;
  position: relative;
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.mainColor};
    }
  }
  &:hover {
    color: ${(props) => props.theme.mainColor};
  }
`;

const MainMenu = styled.div`
  display: flex;
`;

const Logo = styled.span`
  font-size: 25px;
  margin-right: 20px;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.mainColor};
`;
const HeaderArea = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
`;

const HeaderWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100px;
    transition: 0.4s ease;
    background-color: #f00;
    &.hide {
        transform: translateY(-100px);
    }
`;

const throttle = function (callback, waitTime) {
  let timerId = null;
  return (e) => {
      if (timerId) return;
      timerId = setTimeout(() => {
          callback.call(this, e);
          timerId = null;
      }, waitTime);
  };
};

const Header = () => {
  const reservationMatch = useMatch("/reservation");
  const registerMatch = useMatch("/register");
  const currentTableMatch = useMatch("/currentTableState");
  const userDataMatch = useMatch("/userData");
  let location = useLocation();

  let [isToken, setIsToken] = useState(false);

  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);
  
  useEffect(() => {
    //window.location.reload(); // 새로고침
    const token = localStorage.getItem("token");
    if (token == undefined) {
      setIsToken(false);
    } else {
      setIsToken(true);
    }
    console.log("useEffect");
  }, []);
 
  const handleScroll = () =>{
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && pageYOffset >= 100; //&& deltaY >= 0 맨위 좌표가 아니면 
    setHide(hide);
    setPageY(pageYOffset);
  }
  const throttleScroll = throttle(handleScroll, 70);

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
}, [pageY]);

  const logOut = () => {
    localStorage.clear();
    setIsToken(false);
  };
  return (
    <HeaderArea>
      <HeaderWrap className={registerMatch ? (hide && 'hide'):null}>
    <Nav style={{ zIndex: 3 }}>
      <TopMenu>
        <Items>
          {isToken == false ? (
            <Item className="small">
              <Link to="/manager/login">로그인</Link>
            </Item>
          ) : (
            <Item onClick={logOut} className="small">
              로그아웃
            </Item>
          )}
          <Item className="small">
            <Link to="/manager/signup">회원가입</Link>
          </Item>
        </Items>
      </TopMenu>
      <MainMenu>
        <Items>
          <Logo>FOODING</Logo>
          <Item>
            <Link to="/reservation">
              예약 관리{reservationMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>

          <Item>
            <Link to="/register">
              매장 등록{registerMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item><Link to="/currentTableState">
            테이블 현황{currentTableMatch && <Circle layoutId="circle" />}
            </Link></Item>
          <Item><Link to="/userData">사용자 데이터{userDataMatch && <Circle layoutId="circle" />}</Link></Item>
        </Items>
      </MainMenu>
    </Nav>
    </HeaderWrap>
    </HeaderArea>
  );
};

export default Header;
