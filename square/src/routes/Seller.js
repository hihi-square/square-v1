import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Appbar from "./Appbar.js";
import "./Seller.css";

export default function Main(props) {
	return (
		<>
			<Appbar />
			<Grid container>
				<Grid xs={2} className="full-size sidebar">
					<Box className="button" sx={{marginTop: "3%"}}>
						<Typography variant="h5" component="div" sx={{flexGrow: 1, color: "white", fontWeight: 700}}>상품 관리</Typography>
					</Box>
					<Box className="button">
						<Typography variant="h5" component="div" sx={{flexGrow: 1, color: "white", fontWeight: 700}}>세일 관리</Typography>
					</Box>
					<Box className="button">
						<Typography variant="h5" component="div" sx={{flexGrow: 1, color: "white", fontWeight: 700}}>주문 관리</Typography>
					</Box>
					<Box className="button">
						<Typography variant="h5" component="div" sx={{flexGrow: 1, color: "white", fontWeight: 700}}>고객 관리</Typography>
					</Box>
					<Box className="button">
						<Typography variant="h5" component="div" sx={{flexGrow: 1, color: "white", fontWeight: 700}}>피드 관리</Typography>
					</Box>
					<Box className="button">
						<Typography variant="h5" component="div" sx={{flexGrow: 1, color: "white", fontWeight: 700}}>커뮤니티</Typography>
					</Box>
				</Grid>
				<Grid xs={10} className="full-size component-page">
					여기는 본문입니다.
				</Grid>
			</Grid>
		</>
	);
}
