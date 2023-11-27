/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Choice, setChoice, REST_API, RootState } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Typography,
  Paper,
  Box,
  Rating,
  // Button,
  Divider,
} from "@mui/material";
import "App.css";

type BigList = {
  scbId: number;
  storeId: number;
  storeName: string;
  content: string;
  storeAddress: string;
  mainMenu: string;
  logo: string;
};

export default function CategoryStore() {
  const [stores, setStores] = useState<BigList[]>([]);

  const { query } = useParams<{ query?: string }>();
  const emdCode = useSelector((state: RootState) => state.emd.emdCode);
  const depth = useSelector((state: RootState) => state.emd.depth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("accessToken") || "";

  useEffect(() => {
    if (query) {
      let url = query.replace(/\s+/g, "");

      if (!depth || !emdCode) {
        navigate("/");
      } else {
        switch (query) {
          case "1":
          case "2":
          case "3":
          case "4":
            url = `${REST_API}store/big-category/${query}/${emdCode}/${depth}`;
            break;
          default:
            url = `${REST_API}store/search/${emdCode}/${depth}?query=${query}`;
            break;
        }
        axios({
          url,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.data.stores) setStores(response.data.stores);
            else setStores(response.data);
          })
          .catch((error) => {});
      }
    }
  }, []);

  return (
    <Grid xs={11}>
      {stores.length === 0 ? (
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          검색 결과가 없습니다.
        </Grid>
      ) : (
        stores.map((store, index) => (
          <Paper
            key={`a${index}`}
            elevation={0}
            sx={{ display: "flex", marginBottom: "10px", width: "100%" }}
            onClick={() => {
              const tmpStore: Choice = {
                storeId: store.storeId,
                storeThumbnail: store.logo,
                storeName: store.storeName,
              };

              dispatch(setChoice(tmpStore));

              navigate(`/store/${store.storeId}`);
            }}
          >
            <Grid xs={12} container>
              <Grid container xs={12}>
                <Grid xs="auto">
                  {store.logo ? (
                    <img
                      src={store.logo}
                      style={{ width: "120px", height: "120px" }}
                      alt="menu"
                    />
                  ) : (
                    <img
                      src="/img/store/store1.png"
                      style={{ width: "120px", height: "120px" }}
                      alt="menu"
                    />
                  )}
                </Grid>
                <Grid container xs>
                  <Box
                    sx={{
                      paddingLeft: "2px",
                      paddingBottom: "0px",
                      flex: "1 0 auto",
                      width: "100%",
                    }}
                  >
                    <Grid container xs={12}>
                      <Grid xs={12}>
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: 700,
                            padding: "1px 0px 2px 20px",
                            width: "90%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {store.storeName}
                        </Typography>
                      </Grid>
                      <Grid xs={12} sx={{ overflow: "hidden" }}>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{
                            fontWeight: 400,
                            color: "secondary.main",
                            padding: "0px 5px 0px 20px",
                            width: "90%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {store.mainMenu
                            ? store.mainMenu
                            : "대표 메뉴가 등록되지 않았습니다."}
                        </Typography>
                      </Grid>
                      <Grid
                        xs={12}
                        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{
                            fontWeight: 400,
                            padding: "0px 0px 10px 21px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {store.storeAddress}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 400,
                            padding: "0px 10px 0px 21px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Rating name="read-only" value={5} readOnly />
                          <Box sx={{ marginLeft: "5px" }}>{"(4.8)"}</Box>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Grid xs={12} sx={{ color: "red", padding: "5px" }}>
                <Divider></Divider>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </Grid>
  );
}
