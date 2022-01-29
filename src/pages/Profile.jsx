import React from 'react';
import Item from '../components/Item';
import AppContext from '../context';
import Info from '../components/Info';
import axios from 'axios';

function Profile() {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(
        () => {
            async function getResponseFromServer() {
                try {
                    const ordersResponse = await axios.get("https://61f53c3462f1e300173c4065.mockapi.io/Orders");
                    setOrders(ordersResponse.data);
                    console.log(orders);
                    
                } catch(error) {
                    alert(error);
                }
            }
            getResponseFromServer();
        }
    , []);

    return (
        (orders.length>0) ?
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
                        Мои заказы
                    </h1>
                </div>
                <div>
                    {orders.map(
                        (order) => (
                            <div>
                                <h2
                                    className="
                                        title
                                        mb-20
                                    "
                                >
                                    Заказ №{order.id}
                                </h2>
                                <div
                                    className="
                                        d-flex
                                        flex-wrap
                                    "    
                                >
                                    {order.items
                                        .map((val) => (
                                            <Item
                                                key={val.id}
                                                id={val.id}
                                                key={val.id}
                                                name={val.name}
                                                price={val.price}
                                                imageUrl={val.imageUrl}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div> :
            <div
                className='information'    
            >
                <Info
                    title={'У вас нет заказов'}
                    description={'Сделайте хотя бы один заказ'}
                    image={'/img/empty-cart.jpeg'}
                    link={"/"}
                />
            </div>
    );
}

export default Profile;
