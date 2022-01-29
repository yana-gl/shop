import React from 'react';
import Item from '../components/Item';
import AppContext from '../context';

function Favorites() {
    const {favoriteItems, onAddToFavorites, onAddToBasket} = React.useContext(AppContext);

    return (
        <div
            className="
                content
                p-40
            "
        >
            <div
                className="
                    d-flex
                    justify-between
                    mb-40
                    align-end
                "    
            >
                <h1>
                    Мои закладки
                </h1>
            </div>
            <div
                className="
                    d-flex
                    flex-wrap
                "    
            >
                {
                    favoriteItems
                    .map((val) => (
                        <Item
                            id={val.id}
                            key={val.id}
                            name={val.name}
                            price={val.price}
                            imageUrl={val.imageUrl}
                            onPlus={(obj)=>onAddToBasket(obj)}
                            onFavorite={(obj)=>onAddToFavorites(obj)}
                            fav={true}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Favorites;