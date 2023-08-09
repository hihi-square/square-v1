import React, { useEffect, useState } from "react";
import { REST_API } from "redux/redux";
import axios from "axios"; // axios를 import합니다.
import { Unstable_Grid2 as Grid, Typography, Box, Button } from "@mui/material";

type Item = {
  menuId: number;
  menuName: string;
  menuThumbnail: string;
  menuImage: string;
  description: string;
  status: number;
  popularity: boolean;
  signature: boolean;
  price: number;
};

type CategoryMenu = {
  categoryId: number;
  categoryName: string;
  menuItems: Item[];
};

interface Props {
  storeId: string | undefined;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setCurItem: React.Dispatch<React.SetStateAction<Item | undefined>>;
}

export default function StoreMenu({ storeId, setState, setCurItem }: Props) {
  const [menus, setMenus] = useState<CategoryMenu[]>([]);

  const handlePurchase = (item: Item) => {
    setState(true);
    setCurItem(item);
  };

  useEffect(() => {
    // storeId를 사용해 메뉴 정보를 가져오는 API를 호출합니다.

    axios({
      url: `${REST_API}store/menu/${storeId}`,
      method: "GET",
      params: {},
    })
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        // console.error("메뉴 정보를 불러오는데 실패했습니다.", error);
      });
  }, [storeId]); // storeId가 변경될 때마다 API 호출을 다시 합니다.

  return (
    <Grid container xs={11}>
      {menus &&
        menus.map((categoryMenu, index) => (
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
                  <Grid xs={12} key={innerIndex}>
                    <Button
                      onClick={() => {
                        handlePurchase(menu);
                      }}
                      fullWidth
                    >
                      <Grid container sx={{ width: "100%" }}>
                        <Grid xs="auto">
                          <Box
                            sx={{
                              width: { xs: "130px", md: "250px" },
                              height: "auto",
                              "& img": {
                                width: "100%",
                                height: "auto",
                              },
                            }}
                          >
                            <img src={menu.menuThumbnail} alt="menu" />
                          </Box>
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
    </Grid>
  );
}
