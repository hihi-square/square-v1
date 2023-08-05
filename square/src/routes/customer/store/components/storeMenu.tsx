import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';

function StoreMenu({ storeId }: { storeId?: string }) {
  type CategoryMenu = {
    categoryId: number;
    categorySequence: number;
    categoryName: string;
    menuItems: {
      menuId: number;
      menuName: string;
      menuDescription: string;
      status: number;
      popularity: boolean;
      price: number;
    }[];
  };

  const [menus, setMenus] = useState<CategoryMenu[]>([]);
  const [menuQuantities, setMenuQuantities] = useState<{ [menuId: number]: number }>({});

  const handleAddCart = (menuId: number, quantity: number) => {
    if (!storeId) {
      console.error('Store ID is undefined');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '{}');

    if (!cart[storeId]) {
      cart[storeId] = {};
    }

    if (cart[storeId][menuId]) {
      cart[storeId][menuId] += quantity;
    } else {
      cart[storeId][menuId] = quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  useEffect(() => {
    axios({
      url: `http://43.201.255.188:8811/store/menu/${storeId}`,
      method: "GET",
      params: {}
    })
    .then(response => {
      console.log('받아온 데이터:', response.data); 
      console.log('menuList:', response.data.map((item: CategoryMenu) => item.menuItems)); 
      setMenus(response.data);
    })
      .catch(error => {
        console.error('메뉴 정보를 불러오는데 실패했습니다.', error);
      });
  }, [storeId]); 

  return (
    <div>
      <Table>
        <TableHead>
        </TableHead>
        <TableBody>
          {menus.map((categoryMenu, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell 
                  colSpan={5} 
                  style={{ 
                    fontWeight: 'bolder', 
                    textAlign: 'center', 
                  }}
                >
                  {categoryMenu.categoryName}
                </TableCell>
              </TableRow>
              {categoryMenu.menuItems && categoryMenu.menuItems.map((menu, innerIndex) => (
                <TableRow key={index * 100 + innerIndex}>
                  <TableCell style={{ fontWeight: menu.popularity ? 'bold' : 'normal' }}>{menu.menuName}</TableCell>
                  <TableCell>{menu.menuDescription}</TableCell>
                  <TableCell align="right">{menu.price}원</TableCell>
                  <TableCell>
                  <TextField 
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      value={menuQuantities[menu.menuId] || 1}
                      onChange={(e) => setMenuQuantities({
                        ...menuQuantities,
                        [menu.menuId]: Number(e.target.value)
                      })}
                    /> 
                  </TableCell>
                  <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleAddCart(menu.menuId, menuQuantities[menu.menuId] || 1)}>
  담기
</Button>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StoreMenu;
