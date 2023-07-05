import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShopByUserAction } from './store/action';
import Shop from './shop/Shop';
import NoShop from './noShop/NoShop';
import { AbilityContext } from '../../utility/context/Can';

export default function index() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.shops);

  const ability = useContext(AbilityContext);

  useEffect(() => {
    if (ability.can('read', 'shop')) {
      dispatch(getShopByUserAction()).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <>
      {ability.can('read', 'shop') && isLoading === false ? (
        <>
          {store?.shop?._id ? (
            <Shop store={store} dispatch={dispatch} />
          ) : (
            <NoShop dispatch={dispatch} />
          )}
        </>
      ) : (
        <h4>Loading...</h4>
      )}
    </>
  );
}
