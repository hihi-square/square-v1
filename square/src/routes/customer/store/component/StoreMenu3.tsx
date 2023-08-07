import React, { useEffect, useState } from "react";
import axios from "axios"; // axios를 import합니다.
import { Unstable_Grid2 as Grid, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  storeId: string | undefined;
}

function StoreMenu({ storeId }: Props) {
  type CategoryMenu = {
    categoryId: number;
    categoryName: string;
    menuItems: {
      menuId: number;
      menuName: string;
      menuDescription: string;
      status: number;
      popularity: boolean;
      signature: boolean;
      price: number;
    }[];
  };

  const test = [
    {
      categoryId: 1,
      categoryName: "우리집 인기 메뉴",
      menuItems: [
        {
          menuId: 3,
          thumbnail: "/img/sample/cookie1.png",
          menuName: "소보루빵",
          description: "맛있는 소보루빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 5000,
        },
        {
          menuId: 4,
          thumbnail: "/img/sample/cookie2.png",
          menuName: "소보루빵",
          description: "맛있는 소보루빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 5000,
        },
        {
          menuId: 5,
          thumbnail: "/img/sample/cookie3.png",
          menuName: "소보루빵",
          description: "맛있는 소보루빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 5000,
        },
        {
          menuId: 6,
          thumbnail: "/img/sample/cookie4.png",
          menuName: "소보루빵",
          description: "맛있는 소보루빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 5000,
        },
        {
          menuId: 8,
          thumbnail: "/img/sample/cookie5.png",
          menuName: "소보루빵",
          description: "맛있는 소보루빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 5000,
        },
        {
          menuId: 9,
          thumbnail: "/img/sample/cookie6.png",
          menuName: "소보루빵",
          description: "맛있는 소보루빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 5000,
        },
        {
          menuId: 10,
          thumbnail: "/img/sample/cookie1.png",
          menuName: "소보루빵",
          description: "맛있는 소보루빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 5000,
        },
      ],
    },
    {
      categoryId: 3,
      categoryName: "맛나",
      menuItems: [
        {
          menuId: 1,
          thumbnail: "/img/sample/cookie2.png",
          menuName: "소보루빵",
          description: "맛있는 소보루빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 5000,
        },
        {
          menuId: 2,
          thumbnail: "/img/sample/cookie3.png",
          menuName: "소보루빵",
          description: "맛있는 소보루빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 5000,
        },
        {
          menuId: 11,
          thumbnail: "/img/sample/cookie4.png",
          menuName: "빵2",
          description: "맛난 초코빵",
          status: 1,
          popularity: false,
          signature: false,
          price: 3000,
        },
        {
          menuId: 12,
          thumbnail: "/img/sample/cookie5.png",
          menuName: "빵2",
          description: "맛난 초코빵",
          status: 2,
          popularity: false,
          signature: false,
          price: 3000,
        },
        {
          menuId: 13,
          thumbnail: "/img/sample/cookie6.png",
          menuName: "빵2",
          description: "맛난 초코빵",
          status: 2,
          popularity: false,
          signature: false,
          price: 3000,
        },
        {
          menuId: 14,
          thumbnail: "/img/sample/cookie1.png",
          menuName: "빵2",
          description: "맛난 초코빵",
          status: 2,
          popularity: false,
          signature: false,
          price: 3000,
        },
      ],
    },
  ];

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
        setMenus(response.data.menu);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  }, [storeId]); // storeId가 변경될 때마다 API 호출을 다시 합니다.

  return (
    <Grid container xs={11}>
      {test.map((categoryMenu, index) => (
        <Grid container xs={12} key={index}>
          <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h5"
              component="h5"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              {categoryMenu.categoryName}
            </Typography>
          </Grid>
          {categoryMenu.menuItems &&
            categoryMenu.menuItems.map((menu, innerIndex) =>
              menu.status === 0 ? null : (
                <Grid xs={12}>
                  <Button onClick={handlePurchase} fullWidth>
                    <Grid container sx={{ width: "100%" }}>
                      <Grid xs="auto">
                        <img
                          src={menu.thumbnail}
                          style={{ width: "130px", height: "auto" }}
                          alt="menu"
                        />
                      </Grid>
                      <Grid container xs>
                        <Box
                          sx={{
                            padding: "2px 2px 0px 0px",
                            paddingBottom: "0px",
                            flex: "1 0 auto",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Grid xs={12}>
                            <Typography
                              variant="h5"
                              component="h5"
                              sx={{
                                fontWeight: 700,
                                color: "black",
                                textAlign: "left",
                                padding: "10px 0px 4px 20px",
                                width: "90%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {menu.menuName}
                            </Typography>
                          </Grid>
                          <Grid xs={12} sx={{ overflow: "hidden" }}>
                            <Typography
                              variant="subtitle1"
                              component="div"
                              sx={{
                                fontWeight: 400,
                                textAlign: "left",
                                color: "secondary.main",
                                padding: "0px 5px 10px 20px",
                                width: "90%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {menu.description}
                            </Typography>
                          </Grid>
                          <Grid
                            xs={12}
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <Typography
                              variant="h6"
                              component="h6"
                              sx={{
                                fontWeight: 400,
                                textAlign: "left",
                                padding: "0px 0px 10px 21px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {menu.price}원
                            </Typography>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Button>
                </Grid>
              )
            )}
        </Grid>
      ))}

      <Grid>{menus.length}</Grid>
    </Grid>
  );
}

export default StoreMenu;
