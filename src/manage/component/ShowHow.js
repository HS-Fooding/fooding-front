import React, { useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const ShowHow = (props) => {
    const [activeMenu, setActiveMenu] = useState(0);

    const handleLeftChev = () => {
        if (activeMenu === 0) return;
        setActiveMenu(activeMenu - 1);
    };
    const handleRightChev = () => {
        if (activeMenu === 5) return;
        setActiveMenu(activeMenu + 1);
    };

    return (
        <>
            <div className="carousel">
                <div className="carousel-contents">
                    <div className="carousel__track-container">
                        <button className="carousel__button carousel__button-left">
                            <BsChevronLeft
                                className="workspace__showHow__container__chevron"
                                onClick={handleLeftChev}
                            />
                        </button>

                        <ImCross className="carousel-x" onClick={() => props.myClick(false)} />
                        <ul className="carousel__track">
                            <li
                                className={
                                    activeMenu === 0 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        매장 구조를 생성하세요
                                    </h4>
                                    <div className="carousel__slide__info__subtitle">
                                        자신의 매장에 맞게 구조도를 생성할 수 있습니다.
                                    </div>
                                    <div className="carousel__slide__info__imgContainer">
                                        <img
                                            className="carousel__slide__info__imgContainer__img object-contain"
                                            // src="src/img/makingStructure.png"
                                            src={require("../../img/makingStructure.png")}
                                            alt="?!?!"
                                        />
                                    </div>
                                </div>
                            </li>
                            <li
                                className={
                                    activeMenu === 1 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        1. 테이블을 생성하세요
                                    </h4>
                                    <div className="carousel__slide__info__subtitle">
                                        테이블 버튼을 눌러 각 테이블에 대한 정보를 입력할 수
                                        있습니다.
                                    </div>
                                    <div className="carousel__slide__info__imgContainer">
                                        <img
                                            className="carousel__slide__info__imgContainer__img object-contain"
                                            src="/phone_camera2.jpg"
                                            alt="camera with a phone"
                                        />
                                    </div>
                                </div>
                            </li>
                            <li
                                className={
                                    activeMenu === 2 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        2. 좌석, 벽, 창문, 출입구를 생성하세요
                                    </h4>
                                    <div className="carousel__slide__info__subtitle">
                                        각 버튼을 눌러 좌석, 벽, 창문, 출입구를 생성할 수 있습니다.
                                    </div>
                                    <div className="carousel__slide__info__imgContainer">
                                        <img
                                            className="carousel__slide__info__imgContainer__img object-contain"
                                            src="/phone_camera2.jpg"
                                            alt="camera with a phone"
                                        />
                                    </div>
                                </div>
                            </li>
                            <li
                                className={
                                    activeMenu === 3 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        3. 위치를 조정하세요
                                    </h4>
                                    <div className="carousel__slide__info__subtitle">
                                        도형을 드래그, 드롭 하여 위치를 조정할 수 있습니다.
                                    </div>
                                    <div className="carousel__slide__info__imgContainer">
                                        <img
                                            className="carousel__slide__info__imgContainer__img object-contain"
                                            src="/phone_camera2.jpg"
                                            alt="camera with a phone"
                                        />
                                    </div>
                                </div>
                            </li>
                            <li
                                className={
                                    activeMenu === 4 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        4. 수정 버튼을 눌러 테이블에 대한 정보를 수정하세요
                                    </h4>
                                    <div className="carousel__slide__info__subtitle">
                                        수정할 테이블을 선택 후 테이블 수정 버튼을 누르면 해당
                                        테이블의 정보를 수정할 수 있습니다.
                                    </div>
                                    <div className="carousel__slide__info__imgContainer">
                                        <img
                                            className="carousel__slide__info__imgContainer__img object-contain"
                                            src="/phone_camera2.jpg"
                                            alt="camera with a phone"
                                        />
                                    </div>
                                </div>
                            </li>
                            <li
                                className={
                                    activeMenu === 5 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        5. 도형을 휴지통으로 드래그하여 삭제하세요
                                    </h4>
                                    <div className="carousel__slide__info__subtitle">
                                        삭제할 도형을 드래그하여 휴지통으로 드롭하면 해당 도형을
                                        삭제할 수 있습니다.
                                    </div>
                                    <div className="carousel__slide__info__imgContainer">
                                        <img
                                            className="carousel__slide__info__imgContainer__img object-contain"
                                            src="/phone_camera2.jpg"
                                            alt="camera with a phone"
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className="carousel__button carousel__button-right">
                            <BsChevronRight
                                className="workspace__showHow__container__chevron"
                                onClick={handleRightChev}
                            />
                        </button>
                    </div>
                    <div className="carousel__nav">
                        <button
                            className={
                                activeMenu === 0
                                    ? "carousel__indicator current-slide"
                                    : "carousel__indicator"
                            }
                            onClick={() => setActiveMenu(0)}
                        ></button>
                        <button
                            className={
                                activeMenu === 1
                                    ? "carousel__indicator current-slide"
                                    : "carousel__indicator"
                            }
                            onClick={() => setActiveMenu(1)}
                        ></button>
                        <button
                            className={
                                activeMenu === 2
                                    ? "carousel__indicator current-slide"
                                    : "carousel__indicator"
                            }
                            onClick={() => setActiveMenu(2)}
                        ></button>
                        <button
                            className={
                                activeMenu === 3
                                    ? "carousel__indicator current-slide"
                                    : "carousel__indicator"
                            }
                            onClick={() => setActiveMenu(3)}
                        ></button>
                        <button
                            className={
                                activeMenu === 4
                                    ? "carousel__indicator current-slide"
                                    : "carousel__indicator"
                            }
                            onClick={() => setActiveMenu(4)}
                        ></button>
                        <button
                            className={
                                activeMenu === 5
                                    ? "carousel__indicator current-slide"
                                    : "carousel__indicator"
                            }
                            onClick={() => setActiveMenu(5)}
                        ></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowHow;
