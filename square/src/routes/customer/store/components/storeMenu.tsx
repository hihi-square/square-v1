import React, { useEffect, useState } from "react";
import axios from "axios"; // axios를 import합니다.
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handlePurchase = (menu: any) => {
    // menu 정보를 파라미터로 받음
    navigate("/cart/pay", { state: { menu } }); // menu 정보를 state 객체에 넣어서 전달
  };

  useEffect(() => {
    // storeId를 사용해 메뉴 정보를 가져오는 API를 호출합니다.

    axios({
      url: `http://43.201.255.188:8811/store/menu/${storeId}`,
      method: "GET",
      params: {},
    })
      .then((response) => {
        // console.log("받아온 데이터:", response.data);

        setMenus(response.data);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  }, [storeId]); // storeId가 변경될 때마다 API 호출을 다시 합니다.

  return (
    <div>
      <Table>
        <TableHead></TableHead>
        <TableBody>
          {menus.map((categoryMenu, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell
                  colSpan={4}
                  style={{
                    fontWeight: "bolder",
                    textAlign: "center",
                  }}
                >
                  {categoryMenu.categoryName}
                </TableCell>
              </TableRow>
              {categoryMenu.menuItems &&
                categoryMenu.menuItems.map((menu, innerIndex) =>
                  menu.status === 0 ? null : (
                    <TableRow key={index * 100 + innerIndex}>
                      <TableCell
                        style={{
                          fontWeight: menu.popularity ? "bold" : "normal",
                        }}
                      >
                        {menu.menuName}
                        {menu.menuId}
                      </TableCell>
                      <TableCell>{menu.menuDescription}</TableCell>
                      <TableCell align="right">{menu.price}원</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handlePurchase(menu.menuId)}
                        >
                          구매
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StoreMenu;
