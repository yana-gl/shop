import React from "react";
import { Link } from "react-router-dom";

function Info({ title, image, description, onButtonClick, link }) {
    return (
        <div
            className="
                infoBlock
                d-flex
                align-center
                justify-center
                flex-column
                flex"
        >
            <img
                className="mb-20"
                width="120px"
                src={image}
                alt="Empty"
            />
            <div>
                <h2>
                    {title}
                </h2>
            </div>
            <div
                className="infoDescription"
            >
                {description}
            </div>
            <Link
                to={link}
            >
                <button
                    onClick={onButtonClick}
                    className="greenButton"
                >
                    <img
                        src="img/arrow.svg"
                        alt="Arrow"
                    />
                    Вернуться назад
                </button>
            </Link>
      </div>
    )
}

export default Info;