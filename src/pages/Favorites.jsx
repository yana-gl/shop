import React from 'react';
import Item from '../components/Item';
import AppContext from '../context';
import Info from '../components/Info';

function Favorites() {
    const {favoriteItems, onAddToFavorites, onAddToBasket} = React.useContext(AppContext);

    return (
        (favoriteItems.length>0) ?
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
            </div> :
            <div
                    className='information'
            >
                <Info
                    title={'У вас нет закладок'}
                    description={'Добавьте хотя бы один товар в закладки'}
                    image={'/img/empty-cart.jpeg'}
                    link={"/"}
                />
            </div>
    );
}

export default Favorites;