import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Choice, setChoice, REST_API } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Typography,
  Paper,
  Box,
  // Button,
  Divider,
} from "@mui/material";
import "App.css";

export default function CategoryStore() {
  type BigList = {
    scbId: number;
    storeId: number;
    storeName: string;
    content: string;
    storeAddress: string;
    mainMenu: string;
    logo: string;
  };
  const [stores, setStores] = useState<BigList[]>([]);
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      axios({
        url: `${REST_API}store/big-category/${Number(category)}`,
        method: "GET",
      })
        .then((response) => {
          setStores(response.data);
        })
        .catch((error) => {});
    }
  }, [category, navigate]);

  return (
    <Grid xs={11} pt={5}>
      {stores.map((store, index) => (
        <Paper
          key={index}
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
                <img
                  src={store.logo}
                  style={{ width: "120px", height: "auto" }}
                  alt="menu"
                />
              </Grid>
              <Grid container xs>
                <Box
                  sx={{
                    padding: "2px 2px 0px 0px",
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
                          padding: "10px 0px 10px 20px",
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
                        variant="h6"
                        component="h6"
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
                        {store.mainMenu}
                      </Typography>
                    </Grid>
                    <Grid
                      xs={12}
                      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      <Typography
                        variant="subtitle1"
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
                          fontWeight: 400,
                          padding: "0px 10px 10px 21px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        별점이 들어갈 공간입니다.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid xs={12} sx={{ color: "red", padding: "20px" }}>
              <Divider></Divider>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Grid>
  );
}
