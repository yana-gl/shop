import React from "react";
import axios from 'axios';
import Info from "./Info";
import AppContext from "../context";

function SidebarBasket({onCancelItem, onCancel, items = [], opened}) {
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
    const {basketItems, setBasketItems} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const basketSum = basketItems.reduce(
        (sum, obj) => obj.price + sum,
        0
    );

    const onClickOrder = async () => {
        try {
            const { data } = await axios.post('https://61f53c3462f1e300173c4066.mockapi.io/Orders', {items: basketItems});
            setOrderId(data.id);
            setIsOrderCompleted(true);
            setBasketItems([]);
    
            for (let i = 0; i < basketItems.length; i++) {
                const item = basketItems[i];
                await axios.delete('https://61f53c3462f1e300173c4066.mockapi.io/BasketItems/' + item.basketId);
                //await delay(1000);
            }
        } catch (error) {
          alert('Ошибка при создании заказа :(');
        }
    };

    return (
        <div
            className="
                side-card
            "
        >
            <div
                className="
                    side-card_block
                    p-30
                    d-flex
                    flex-column
                    justify-between
                "
            >
                {items.length > 0 ? (
                    <>
                        <div>
                            <div
                                className="
                                    mb-30
                                    justify-between
                                    d-flex
                                    align-center
                                "
                            >
                                <h2>
                                    Корзина
                                </h2>
                                <div
                                    className="
                                        card_button
                                    "
                                    onClick={onCancel}
                                >
                                    <img
                                        alt="cancel"
                                        src="/img/cancel_button.svg"
                                    />
                                </div>
                            </div>
                            <div
                                className="
                                    items
                                "
                            >
                                {items.map((val) => (
                                    <div
                                        className="
                                            basket-Item
                                            d-flex
                                            justify-between
                                            align-center
                                            p-20
                                        "
                                        key={val.id}
                                    >
                                        <img
                                            alt="product"
                                            width={70}
                                            height={70}
                                            src={val.imageUrl}
                                        />
                                        <div>
                                            <p>
                                                {val.name}
                                            </p>
                                            <div
                                                className="
                                                    price
                                                "
                                            >
                                                {val.price} ₽
                                            </div>
                                        </div>
                                        <div
                                            className="
                                                card_button
                                            "
                                            onClick={() => {onCancelItem(val.id)}}
                                        >
                                            <img
                                                alt="cancel"
                                                src="/img/cancel_button.svg"

                                            />
                                        </div>
                                    </div> ))
                                }
                            </div>
                        </div>  
                        <div
                            className="
                                total-basket
                                flex-column
                            "
                        >
                            <ul
                                className="
                                    mb-25
                                "
                            >
                                <li
                                    className="
                                        d-flex
                                        align-end
                                    "
                                >
                                    <span>
                                        Итого:
                                    </span>
                                    <div
                                        className="
                                            dashes
                                            d-flex
                                        "
                                    ></div>
                                    <div
                                        className="
                                            price
                                        "
                                    >
                                        {basketSum} ₽
                                    </div>
                                    
                                </li>
                            </ul>
                            <button
                                className="
                                    d-flex
                                    align-center
                                    justify-center
                                "
                                onClick={onClickOrder}
                            >
                                <div
                                    className="
                                        d-flex
                                        align-center
                                    "
                                >
                                    <span
                                        className="
                                            mr-10
                                        "
                                    >
                                        Оформить заказ
                                    </span>
                                    <img
                                        alt="arrow"
                                        width={14}
                                        height={12}
                                        src="/img/arrow.svg"
                                    />
                                </div>
                            </button>
                        </div>
                    </>
                ) : (<Info
                        title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
                        description={
                            isOrderCompleted
                            ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                            : 'Добавьте хотя бы один товар, чтобы сделать заказ.'
                        }
                        image={isOrderCompleted ? '/img/complete-order.jpeg' : '/img/empty-cart.jpeg'}
                        onButtonClick={onCancel}
                    />)     
                }    
            </div>
        </div>
    );
}

export default SidebarBasket;
