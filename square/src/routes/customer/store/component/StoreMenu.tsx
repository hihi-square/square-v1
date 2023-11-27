/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { REST_API } from "redux/redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Unstable_Grid2 as Grid,
  Box,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SelectMenu from "./SelectMenu";

type Item = {
  menuId: number;
  menuName: string;
  menuThumbnail: string;
  menuImage: string;
  description: string;
  status: string;
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
  storeId: string;
  storeName: string;
  storeThumbnail: string;
}

export default function StoreMenu({
  storeId,
  storeName,
  storeThumbnail,
}: Props) {
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [menus, setMenus] = useState<CategoryMenu[]>();
  const [menuSwitch, setMenuSwitch] = useState<boolean[]>();
  const [curItem, setCurItem] = useState<Item>();
  const [purchase, setPurchase] = useState<boolean>(false);
 
  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 가게의 메뉴를 가져옵니다.
  const getStoreMenu = () => {
    axios({
      url: `${REST_API}store/menu/${storeId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setMenus(response.data.menus);
        setMenuSwitch(new Array(response.data.menus.length).fill(true));
      })
      .catch((error) => {
        navigate("/error", { state: error });
      });
  };

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 로딩화면 출력 및 axios 통신
  useEffect(() => {
    getStoreMenu();
    setLoading(false);
  }, []);

  // useEffect 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // 함수 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 현재의 아이템과 Dialog창을 열어준다.
  const handlePurchase = (item: Item) => {
    setCurItem(item);
    setPurchase(true);
  };

  // 누른 카테고리의 메뉴들을 축소합니다.
  const handleSwitch = (index: number) => {
    if (menuSwitch) {
      const newArray = [...menuSwitch];

      newArray[index] = !newArray[index];
      setMenuSwitch(newArray);
    }
  };

  // 함수 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  if (loading) return <CircularProgress />;
  else {
    return (
      <Grid container xs={10}>
        {menus &&
          menus.map((categoryMenu, index) => {
            if (categoryMenu.categoryName === "미분류") return null;
            return (
              <Grid container xs={12} justifyContent="center" key={index}>
                <Grid xs={12}>
                  <Box
                    onClick={() => {
                      handleSwitch(index);
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      height: "40px",
                      backgroundColor:
                        menuSwitch && menuSwitch[index] ? "#d1d1d1" : "#e7e7e7",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        marginLeft: "10px",
                        fontWeight: 500,
                        textAlign: "left",
                        color: "black",
                      }}
                    >
                      {categoryMenu.categoryName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        marginLeft: "10px",
                        fontWeight: 500,
                        textAlign: "left",
                        color: "black",
                      }}
                    >
                      {menuSwitch && menuSwitch[index] ? (
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          style={{ color: "#000000", marginRight: "20px" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCaretUp}
                          style={{ color: "#000000", marginRight: "20px" }}
                        />
                      )}
                    </Typography>
                  </Box>
                </Grid>
                {categoryMenu?.menuItems.map((menu, innerIndex) =>
                  menu.status !== "ON"
                    ? null
                    : menuSwitch &&
                      menuSwitch[index] && (
                        <Grid
                          xs={12}
                          container
                          alignItems="center"
                          sx={{ padding: "5px 0px" }}
                          key={innerIndex}
                          onClick={() => {
                            handlePurchase(menu);
                          }}
                        >
                          <Grid
                            xs={3}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Box
                              sx={{
                                width: "100%",
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
                          <Grid container xs={9}>
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
                                    padding: "10px 0px 0px 20px",
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
                                    padding: "0px 5px 5px 20px",
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
                                    color: "primary.main",
                                    fontWeight: 600,
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
                          <Grid xs={12}>
                            <Divider />
                          </Grid>
                        </Grid>
                      )
                )}
              </Grid>
            );
          })}
        {curItem && (
          <SelectMenu
            storeId={Number(storeId)}
            storeName={storeName}
            storeThumbnail={storeThumbnail}
            curItem={curItem}
            purchase={purchase}
            setPurchase={setPurchase}
          />
        )}
      </Grid>
    );
  }
}
