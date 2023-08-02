import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import StoreMenu from './storeMenu';
import StoreFeed from './storeFeed';
import StoreReview from './storeReview';
import StoreInfo from './storeInfo';

import Cart from '../deal/cart';

function StorePage() : JSX.Element {
  const [selectedTab, setSelectedTab] = useState('menu');

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'menu':
        return <StoreMenu />;
      case 'info':
        return <StoreFeed />;
      case 'review':
        return <StoreReview />;
      default:
        return <StoreMenu />;
    }
  };

  

  return (
    <>
      <StoreInfo />
      <div className="button-container">
        <button onClick={() => setSelectedTab('menu')}>메뉴</button>
        <button onClick={() => setSelectedTab('info')}>정보</button>
        <button onClick={() => setSelectedTab('review')}>리뷰</button>
        {selectedTab}
      </div>
      <div>
        {renderTabContent()}
      </div>

      <Routes>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </>
  )
}

export default StorePage;
