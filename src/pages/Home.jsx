import React from 'react';
import Item from '../components/Item';
import Search from '../components/Search';


function Home({
    favoriteItems,
    items,
    searchValue,
    onChangeSearchInput,
    onAddToBasket,
    onAddToFavorites
}) {
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
                    {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все товары'}
                </h1>
                <Search
                    onChangeSearchInput={onChangeSearchInput}
                    searchInputValue={searchValue}
                />
            </div>
            

            <div
                className="
                    d-flex
                    products
                    flex-wrap
                "    
            >
                {
                    items
                    .filter((val) => val.name.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((val) => (
                        <Item
                            id={val.id}
                            key={val.id}
                            name={val.name}
                            price={val.price}
                            imageUrl={val.imageUrl}
                            onPlus={(obj)=>onAddToBasket(obj)}
                            onFavorite={(obj)=>onAddToFavorites(obj)}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Home;