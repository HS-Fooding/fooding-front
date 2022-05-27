import React, { useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const ShowHow = () => {
    const [activeMenu, setActiveMenu] = useState(0);

    const handleLeftChev = () => {
        if (activeMenu === 0) return;
        setActiveMenu(activeMenu - 1);
    };
    const handleRightChev = () => {
        if (activeMenu === 4) return;
        setActiveMenu(activeMenu + 1);
    };

    return (
        <>
            <div className="carousel">
                <div className="carousel-contents">
                    <button className="carousel__button carousel__button-left">
                        <BsChevronLeft
                            className="workspace__showHow__container__chevron"
                            onClick={handleLeftChev}
                        />
                    </button>

                    <div className="carousel__track-container">
                        <ul className="carousel__track">
                            <li
                                className={
                                    activeMenu === 0 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        1. Take a picture of your note.
                                    </h4>
                                    <p className="carousel__slide__info__content">
                                        The result can be diffrent depends on the resolution.
                                    </p>
                                </div>
                                <img
                                    className="carousel__slide__img"
                                    src="/phone_camera2.jpg"
                                    alt="camera with a phone"
                                />
                            </li>
                            <li
                                className={
                                    activeMenu === 1 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        2. Crop your image if you need.
                                    </h4>
                                    <p className="carousel__slide__info__content">
                                        Please make sure to includes the first and last notes.
                                    </p>
                                </div>
                                <img
                                    className="carousel__slide__img object-contain"
                                    src="/show_how.png"
                                    alt="camera with a phone"
                                />
                            </li>
                            <li
                                className={
                                    activeMenu === 2 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        3. Click play button.
                                    </h4>
                                    <p className="carousel__slide__info__content">
                                        It won&apost take a long time to get result. I promise...!
                                    </p>
                                </div>
                                <img
                                    className="carousel__slide__img object-contain"
                                    src="/click_playBtn.png"
                                    alt="camera with a phone"
                                />
                            </li>
                            <li
                                className={
                                    activeMenu === 3 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        4. Check out the result.
                                    </h4>
                                    <p className="carousel__slide__info__content">
                                        You can remove it. And also you can add multiple music.
                                    </p>
                                </div>
                                <img
                                    className="carousel__slide__img object-contain"
                                    src="/play.png"
                                    alt="camera with a phone"
                                />
                            </li>
                            <li
                                className={
                                    activeMenu === 4 ? "carousel__slide active" : "carousel__slide"
                                }
                            >
                                <div className="carousel__slide__info">
                                    <h4 className="carousel__slide__info__title">
                                        5. Share your work!
                                    </h4>
                                    <p className="carousel__slide__info__content">
                                        If you satisfied with your work, make your work public!!
                                    </p>
                                </div>
                                <img
                                    className="carousel__slide__img"
                                    src="/upload.png"
                                    alt="camera with a phone"
                                />
                            </li>
                        </ul>
                    </div>

                    <button className="carousel__button carousel__button-right">
                        <BsChevronRight
                            className="workspace__showHow__container__chevron"
                            onClick={handleRightChev}
                        />
                    </button>

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
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowHow;
