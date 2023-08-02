// =======================================IMPORT 구문========================================== //
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import {
  Box,
  FormControl,
  SelectChangeEvent,
  Chip,
  Select,
  MenuItem,
  Unstable_Grid2 as Grid,
  Paper,
  Button,
  Typography,
  Pagination,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { Iproduct, Icategory, Itype } from "types";

import ProductForm from "./ProductForm";
import "../../Seller.css";
// ============================================================================================ //
export default function ProductList() {
  const initState: Iproduct = {
    id: 0,
    image: "",
    thumbnail: "",
    category_id: 1,
    category: "",
    type_id: 1,
    type: "",
    name: "",
    represent: false,
    popular: false,
    price: 0,
    status_code: 1,
    status: "판매중",
    create_at: "",
    modified_at: "",
    sal_record: 0,
    description: "",
  };

  const [products, setProducts] = useState<Iproduct[]>([
    initState,
    ...JSON.parse(localStorage.getItem("products") || "[]"),
  ]); // 제품 목록
  const [categorys] = useState<Icategory[]>(
    JSON.parse(localStorage.getItem("categorys") || "[]")
  ); // 카테고리 목록
  const types = useSelector((state: RootState) => state.types as Itype[]); // 소분류 목록
  const [page, setPage] = useState<number>(1); // 페이지네이션 페이지
  const [open, setOpen] = useState<boolean>(false); // 모달 표시 여부
  const [create, setCreate] = useState<boolean>(false); // 모달 타입(등록 / 수정)
  // const [modalId, setModalId] = useState<number[]>([0, 0]); // 모달 상품 번호
  const [createItem, setCreateItem] = useState<boolean>(false); // 아이템 업로드
  const [currProduct, setCurrProduct] = useState<Iproduct>(initState);

  const itemsPerPage = 10; // 페이지네이션 기준
  const currentProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  ); // 페이지 표시 상품

  const handleChange = (event: SelectChangeEvent) => {
    // const { name, value } = event.target;
    // eslint-disable-next-line
    console.log(event.target);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // 드래그가 끝나면 순서를 재배치
    const reorderedProducts = reorder(
      products,
      source.index + (page - 1) * itemsPerPage,
      destination.index + (page - 1) * itemsPerPage
    );

    setProducts(reorderedProducts);
  };

  // 배열에서 원소를 재배치하는 함수
  const reorder = (
    list: Iproduct[],
    startIndex: number,
    endIndex: number
  ): Iproduct[] => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleCurrProduct = (key: string, value: string | boolean | number) => {
    setCurrProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = () => {
    setCreate((prev) => !prev);
  };

  const createProduct = (product: Iproduct, length: number) => {
    if (product.id === 0) {
      product.id = length;
      setProducts((prev) => [...prev, product]);
    } else {
      setProducts((prev) => {
        const index = prev.findIndex((p) => p.id === product.id);

        if (index !== -1) {
          const newProducts = [...prev];

          newProducts[index] = product;
          return newProducts;
        }

        return prev;
      });
    }
    setCreateItem(true);
  };

  useEffect(() => {
    if (createItem)
      localStorage.setItem("products", JSON.stringify(products.slice(1)));
    setCreateItem(false);
  }, [createItem, products]);

  // useEffect(() => {
  //   if (modalId[1] !== 0) setOpen(true);
  // }, [modalId]);

  return (
    <Grid xs={12} sx={{ paddingBottom: "10px" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left", fontWeight: 800 }}
        >
          상품 관리
        </Typography>
        <Typography
          component="div"
          sx={{ flexGrow: 1, textAlign: "left", fontWeight: 500 }}
        >
          가게에 등록할 상품을 관리합니다.
        </Typography>
        <Grid xs={12} sx={{ height: "80%", paddingBottom: "10px" }}>
          <Paper elevation={1} className="full-compo" sx={{ margin: "10px" }}>
            <Droppable droppableId="droppable1" isDropDisabled={true}>
              {(provided) => (
                <List
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "background.paper",
                  }}
                >
                  {currentProducts.map((product, index) =>
                    product.id === 0 ? null : (
                      <Draggable
                        key={`a${product.id}`}
                        draggableId={`a${product.id}`}
                        index={index}
                      >
                        {(dragProvided) => (
                          <>
                            <ListItem
                              key={product.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              alignItems="flex-start"
                            >
                              <ListItemAvatar>
                                <Avatar
                                  alt="음식사진"
                                  src={product.thumbnail}
                                />
                              </ListItemAvatar>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "start",
                                }}
                              >
                                <ListItemText
                                  primary={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography
                                        component="h3"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        {product.name}
                                      </Typography>
                                      <Typography
                                        component="h3"
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        {product.price}
                                      </Typography>
                                    </Box>
                                  }
                                  secondary={
                                    <>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        Ali Connors
                                      </Typography>
                                      {
                                        " — I'll be in your neighborhood doing errands this…"
                                      }
                                    </>
                                  }
                                />
                                <Divider /> {/* 가로선 추가 */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {/* 뱃지 추가 */}
                                  <Chip label="대표" />

                                  {/* 상태 변경 셀렉트 추가 */}
                                  <FormControl
                                    sx={{ m: 1, minWidth: 100 }}
                                    size="small"
                                  >
                                    <Select
                                      labelId="demo-simple-selecdt-label"
                                      id="demo-simple-select"
                                      value={product.status}
                                      onChange={handleChange}
                                    >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </Box>
                            </ListItem>
                          </>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>

            <Pagination
              count={Math.ceil(products.length / itemsPerPage)}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setCreate(true);
                setCurrProduct(initState);
                setOpen(true);
              }}
            >
              상품등록
            </Button>
            <ProductForm
              open={open}
              close={setOpen}
              categorys={categorys}
              types={types}
              length={products.length}
              create={createProduct}
              isCreateModal={create}
              handleCreateModal={handleCreate}
              currProduct={currProduct === undefined ? initState : currProduct}
              handleCurrProduct={handleCurrProduct}
            />
          </Paper>
        </Grid>
      </DragDropContext>
    </Grid>
  );
}
