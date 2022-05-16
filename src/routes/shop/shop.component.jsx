import SHOP_DATA from '../../data/shop.data';

import './Shop.styles.scss';

const Shop = () => {
    return (
        <div>
            {SHOP_DATA.map(({ id, name }) => (
                <div key={id}>{name}</div>
            ))}
        </div>
    );
};

export default Shop;