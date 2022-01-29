import {Link} from "react-router-dom";
import AppContext from "../context";
import React from "react";

function Header(props) {
    const { basketItems } = React.useContext(AppContext);
    const basketSum = basketItems.reduce(
        (sum, obj) => obj.price + sum,
        0
    );

    return (
        <header
            className="
                p-40
                d-flex
                justify-between
                align-center
            "
        >
            <Link
                to="/"
            >
                <div
                    className="
                        header_company
                        d-flex
                        align-center
                    "
                >
                    <img
                        alt="card"
                        width={42}
                        height={42}
                        src="/img/logo.svg"
                        className="mr-15"
                    />
                    <div
                        className="header_company-info"
                    >
                        <h3>VEG STORE</h3>
                        <p>Магазин веганских продуктов</p>
                    </div>
                </div>
            </Link>
            
            <ul
                className="
                    header_profile
                    d-flex
                    align-center
                "
            >
                <li
                    className="
                        d-flex
                        mr-30
                        align-center
                        cu-p
                    "
                    onClick={props.onBasket}
                >
                    <img
                        alt="basket"
                        width={20}
                        height={20}
                        src="/img/basket.svg"
                        className="
                            mr-10
                        "
                    />
                    <div>
                        {basketSum} ₽
                    </div>
                </li>
                <li>
                    <Link
                        to="/fav"
                    >
                        <img
                            alt="favorites"
                            width={20}
                            height={20}
                            src="/img/favorites.svg"
                            className="
                                mr-30
                                cu-p
                            "
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/profile"
                    >
                        <img
                            alt="profile"
                            width={20}
                            height={20}
                            src="/img/Union.svg"
                            className="
                                cu-p
                            "
                        />
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;