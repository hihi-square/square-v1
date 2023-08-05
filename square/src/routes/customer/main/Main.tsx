import { Unstable_Grid2 as Grid } from "@mui/material";
import Category from "./component/category";
import DiscountNow from "./component/discountNow";
import Header from "./component/Header";
import Footer from "./component/footer";

function MainPage() {
  return (
    <>
      <Grid container xs={12}>
        <Grid container xs={12} justifyContent="center">
          <Header />
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <Category />
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <DiscountNow />
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

export default MainPage;
