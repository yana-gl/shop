import React from "react";
import AppContext from "../context";

function Item({name, price, imageUrl, id, onPlus, onFavorite, fav=false, added=false}) {
    const {isItemAdded, isItemFavorite} = React.useContext(AppContext);

    const onClickPlus = () => {
        onPlus({name, price, imageUrl, id});
    }

    const onClickFavorite = () => {
        onFavorite({name, price, imageUrl, id});
    }

    return (
        <div
            className='
                card
                p-10
                mb-30
                mr-30
            '
        >
        {onFavorite && (
            <div
                className='
                    liked
                '
                onClick={onClickFavorite}
            >
                <img
                    alt='unliked_button'
                    src={
                            isItemFavorite(id) ? '/img/liked_button.svg'
                            : '/img/unliked_button.svg'
                    }
                />
            </div>
        )}
        <img
            alt='productPhoto'
            width={120}
            height={120}
            src={imageUrl}
            className='
                productPhoto
            '
        />
        <h4>
            {name}
        </h4>
        <div
            className='
                d-flex
                justify-between
                align-end
            '
        >
            <div
                className='
                    price
                '
            >
                {price} ₽
            </div>
            {onPlus && (
                <div
                    className='
                        card_button
                    '
                    onClick={ onClickPlus }
                >
                    <img
                        alt='plus'
                        src={
                            isItemAdded(id) ? '/img/added_button.svg'
                            : '/img/plus.svg'
                        }
                    />
                </div>
            )}
        </div>
    </div>
    );
}

export default Item;
