import React from 'react';
import Header from './components/Header';
import SidebarBasket from './components/SidebarBasket';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Profile from './pages/Profile';

function App() {
    React.useEffect(
        () => {
            async function getResponseFromServer() {
                const [itemsResponse, basketResponse, favoriteResponse] = await Promise.all([
                    axios.get("https://61f53c3462f1e300173c4065.mockapi.io/Items"),
                    axios.get("https://61f53c3462f1e300173c4065.mockapi.io/BasketItems"),
                    axios.get("https://61f53c3462f1e300173c4065.mockapi.io/FavoriteItems")
                ]);
                setBasketItems(basketResponse.data);
                setFavoriteItems(favoriteResponse.data);
                setItems(itemsResponse.data);
            }
            getResponseFromServer();
        }
    , []);

    const [items, setItems] = React.useState([]);
    const [basketItems, setBasketItems] = React.useState([]);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [basketOpened, setBasketOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onBasketClick = () => {
        setBasketOpened(true);
    }

    const onCancelClick = () => {
        setBasketOpened(false);
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const onAddToFavorites = async (obj) => {
        try {
            if(favoriteItems.find(item => item.id === obj.id)) {
                const id = favoriteItems.find(item => item.id === obj.id).favoriteId;
                axios.delete(`https://61f53c3462f1e300173c4065.mockapi.io/FavoriteItems/${id}`);
                setFavoriteItems(prev => prev.filter((item) => item.id !== obj.id));
            } else {
                const { data } = await axios.post("https://61f53c3462f1e300173c4065.mockapi.io/FavoriteItems", obj);
                console.log('data', data);
                setFavoriteItems(prev => [...prev , data]);
            }
        } catch(error) {
            alert('Не удалось добавить в закладки');
        }   
    }

    const onAddToBasket = async (obj) => {
        try {
            if(basketItems.find(item => Number(item.id) === Number(obj.id))) {
                const id = basketItems.find(item => item.id === obj.id).basketId;
                axios.delete(`https://61f53c3462f1e300173c4065.mockapi.io/BasketItems/${id}`);
                setBasketItems(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post("https://61f53c3462f1e300173c4065.mockapi.io/BasketItems", obj);
                console.log('data', data);
                setBasketItems(prev => [...prev , data]);
            }
        } catch(error) {
            alert('Не удалось добавить в корзину');
        }
    }

    const onRemoveBasketItem = (id) => {
        axios.delete(`https://61f53c3462f1e300173c4065.mockapi.io/BasketItems/${id}`);
        setBasketItems(prev => prev.filter((item) => item.id !== id));
    }

    const isItemAdded = (id) => {
        return basketItems.some(obj => Number(obj.id) === Number(id));
    }

    const isItemFavorite = (id) => {
        return favoriteItems.some(obj => Number(obj.id) === Number(id));
    }

    return (
        <AppContext.Provider
            value={{
                items, basketItems, favoriteItems,
                isItemAdded, onAddToFavorites, onAddToBasket,
                setBasketOpened, setBasketItems, isItemFavorite
            }}
        >
            <div
                className="
                    wrapper
                    clear
                "
            >
                {basketOpened ?
                    <SidebarBasket
                        items={basketItems}
                        onCancel={onCancelClick}
                        onCancelItem={onRemoveBasketItem}
                        opened={basketOpened}
                    />
                    : null
                }
                <Header
                    onBasket={onBasketClick}
                />
                <Route path="/" exact>
                    <Home
                        basketItems={basketItems}
                        favoriteItems={favoriteItems}
                        items={items}
                        searchValue={searchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToBasket={onAddToBasket}
                        onAddToFavorites={onAddToFavorites}
                    />
                </Route>
                    
                <Route path="/fav">
                    <Favorites />
                </Route>

                <Route path="/profile">
                    <Profile />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
