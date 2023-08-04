/* eslint-disable no-console */
// =======================================IMPORT 구문========================================== //
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import {
  Unstable_Grid2 as Grid,
  Paper,
  Button,
  Typography,
  List,
  ListSubheader,
} from "@mui/material";
import { Iproduct, Icategory } from "modules/types";

import ReadyItems from "./components/ReadyItems";
import ProductForm from "./ProductForm";
import "../../Seller.css";
// ============================================================================================ //
export default function ProductList() {
  // 초기값 설정
  const REST_API: string = "http://i9b208.p.ssafy.io:8811";
  const user = useSelector((state: RootState) => state.user);
  const initProduct: Iproduct = useMemo(
    () => ({
      id: 0,
      userId: user.usr_id,
      image: "",
      thumbnail: "",
      categoryId: 0,
      categoryName: "",
      name: "",
      signature: false,
      popular: false,
      price: 0,
      status: 1,
      createdAt: [],
      modifiedAt: [],
      salRecord: 0,
      description: "",
      sequence: 1,
    }),
    [user.usr_id]
  );

  // 제품 목록
  const [products, setProducts] = useState<Iproduct[]>([]);

  useEffect(() => {
    axios({
      url: `${REST_API}/store/menuitem`,
      method: "GET",
      headers: {
        userId: 24,
      },
    })
      .then((res) => {
        console.log(res);
        const arr: Iproduct[] = res.data.data;
        const newArr = arr.filter((product: Iproduct) => product.status !== 2);

        setProducts(newArr);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [user]);

  // 카테고리 목록
  const [categorys, setCategorys] = useState<Icategory[]>([]);

  useEffect(() => {
    axios({
      url: `${REST_API}/store/menuCategory`,
      method: "GET",
      headers: {
        userId: 24,
      },
    })
      .then((res) => {
        console.log(res);
        const arr: Icategory[] = res.data.data;

        setCategorys(arr);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [user]);

  // 메뉴와 비메뉴
  const [menu, setMenu] = useState<Iproduct[]>([]);
  const [ready, setReady] = useState<Iproduct[]>([]);

  useEffect(() => {
    if (products && categorys) {
      let menuArr: Iproduct[] = [...products];
      const readyArr: Iproduct[] = [];
      const idxMap: Map<number, number> = new Map();

      readyArr.push(...menuArr.filter((menuItem) => menuItem.categoryId === 0));
      menuArr = menuArr.filter((readyItem) => readyItem.categoryId !== 0);

      for (const category of categorys) {
        idxMap.set(category.id, category.sequence);
        menuArr.push({
          ...initProduct,
          id: category.id,
          name: category.name,
          categoryId: category.id,
          sequence: 0,
          status: 4,
        });
      }

      menuArr.sort((a: Iproduct, b: Iproduct) => {
        const first: number = idxMap.get(a.categoryId) || 0;
        const second: number = idxMap.get(b.categoryId) || 0;

        if (first === second) {
          if (a.status === 4 && b.status !== 4) {
            return -1;
          } else if (a.status !== 4 && b.status === 4) {
            return 1;
          } else if (a.sequence === b.sequence) {
            return b.id - a.id;
          } else {
            return a.sequence - b.sequence;
          }
        } else {
          return first - second;
        }
      });

      readyArr.sort((a: Iproduct, b: Iproduct) => {
        if (a.sequence === b.sequence) {
          return b.id - a.id;
        } else {
          return a.sequence - b.sequence;
        }
      });

      setMenu(menuArr);
      setReady(readyArr);
    }
  }, [categorys, products, initProduct, user]);

  const [open, setOpen] = useState<boolean>(false); // 모달 표시 여부
  const [create, setCreate] = useState<boolean>(false); // 모달 타입(등록 / 수정)
  // const [modalId, setModalId] = useState<number[]>([0, 0]); // 모달 상품 번호
  const [createItem, setCreateItem] = useState<boolean>(false); // 아이템 업로드
  const [currProduct, setCurrProduct] = useState<Iproduct>(initProduct);

  const resequence = (
    list: Iproduct[] | undefined,
    startIndex: number,
    endIndex: number
  ): Iproduct[] => {
    if (list) {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);

      result.splice(endIndex, 0, removed);

      // eslint-disable-next-line no-console
      console.log(result);
      return result;
    } else {
      return [];
    }
  };

  const moving = (
    from: Iproduct[] | undefined,
    to: Iproduct[] | undefined,
    startIndex: number,
    endIndex: number,
    moveType: number
  ): void => {
    if (from && to) {
      const first = Array.from(from);
      const second = Array.from(to);
      const [removed] = first.splice(startIndex, 1);

      second.splice(endIndex, 0, removed);

      if (moveType === 1) {
        if (second[0].status === 4) {
          setReady(first);
          setMenu(second);
        }
      } else {
        setReady(second);
        setMenu(first);
      }
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === "a") {
      if (destination.droppableId === source.droppableId) {
        // 드래그가 끝나면 순서를 재배치
        const resequenceedReady = resequence(
          ready,
          source.index,
          destination.index
        );

        setReady(resequenceedReady);
      } else {
        moving(ready, menu, source.index, destination.index, 1);
      }
    } else if (source.droppableId === "b") {
      if (destination.droppableId === source.droppableId) {
        const resequenceedMenu = resequence(
          menu,
          source.index,
          destination.index
        );

        if (resequenceedMenu[0].status === 4) setMenu(resequenceedMenu);
      } else if (menu && menu[source.index].status !== 4) {
        moving(menu, ready, source.index, destination.index, 2);
      }
    }
  };

  const handleCurrProduct = (key: string, value: string | boolean | number) => {
    setCurrProduct((prev) => ({ ...prev, [key]: value }));
  };

  const updatesequence = () => {
    let catesequence = 1;
    let itemsequence = 1;
    let cateCode = 0;

    const newProducts = [];
    const newCategorys = [];

    // eslint-disable-next-line no-console
    console.log("메뉴");
    // eslint-disable-next-line no-console
    console.log(menu);

    for (const readyItem of ready) {
      newProducts.push({ ...readyItem, categoryId: 0, sequence: itemsequence });
      itemsequence++;
    }
    itemsequence = 1;
    for (const menuItem of menu) {
      console.log(menuItem);
      if (menuItem.status !== 4) {
        newProducts.push({
          userId: user.usr_id,
          id: menuItem.id,
          categoryId: cateCode,
          status: menuItem.status,
          sequence: itemsequence,
        });
        itemsequence++;
      } else {
        cateCode = menuItem.id;
        newCategorys.push({
          id: cateCode,
          userId: user.usr_id,
          sequence: catesequence,
        });
        itemsequence = 1;
        catesequence++;
      }
    }

    console.log("ㅎㅇ");
    console.log(newProducts);

    axios({
      url: `${REST_API}/store/menuitem/list`,
      method: "PATCH",
      data: {
        data: newProducts,
      },
    })
      .then((res) => {
        axios({
          url: `${REST_API}/store/menuitem`,
          method: "GET",
          headers: {
            userId: 24,
          },
        })
          .then((resp) => {
            console.log(resp);
            const arr: Iproduct[] = resp.data.data;
            const newArr = arr.filter(
              (product: Iproduct) => product.status !== 2
            );

            setProducts(newArr);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });

    axios({
      url: `${REST_API}/store/menuCategory/list`,
      method: "PATCH",
      data: {
        data: newCategorys,
      },
    })
      .then((res) => {
        axios({
          url: `${REST_API}/store/menuCategory`,
          method: "GET",
          headers: {
            userId: 24,
          },
        })
          .then((resp) => {
            console.log(resp);
            const arr: Icategory[] = res.data.data;

            setCategorys(arr);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
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
    if (createItem) localStorage.setItem("products", JSON.stringify(products));
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
        <Grid xs={12} container>
          <Grid xs={6} sx={{ height: "80%", paddingBottom: "10px" }}>
            <Paper elevation={1} className="full-compo" sx={{ margin: "10px" }}>
              <Droppable droppableId="a">
                {(provided) => (
                  <List
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "100%",
                      maxWidth: 500,
                      maxHeight: 600,
                      bgcolor: "white",
                      overflow: "auto",
                    }}
                  >
                    {ready?.map((product, index) => (
                      <Draggable
                        key={product.id}
                        draggableId={`a${product.id}`}
                        index={index}
                      >
                        {(dragProvided) => (
                          <ReadyItems
                            product={product}
                            dragProvided={dragProvided}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>

              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setCreate(true);
                  setCurrProduct({ ...initProduct });
                  setOpen(true);
                }}
              >
                상품등록
              </Button>
              <ProductForm
                open={open}
                close={setOpen}
                length={products.length}
                create={createProduct}
                isCreateModal={create}
                handleCreateModal={handleCreate}
                currProduct={
                  currProduct === undefined ? initProduct : currProduct
                }
                handleCurrProduct={handleCurrProduct}
              />
            </Paper>
          </Grid>
          <Grid xs={6} sx={{ height: "80%", paddingBottom: "10px" }}>
            <Paper elevation={1} className="full-compo" sx={{ margin: "10px" }}>
              <Droppable droppableId="b">
                {(provided) => (
                  <List
                    aria-labelledby="nested-list-subheader"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "100%",
                      maxWidth: 500,
                      maxHeight: 600,
                      bgcolor: "white",
                      overflow: "auto",
                    }}
                  >
                    {menu?.map((product, index) =>
                      product.status === 4 ? (
                        <Draggable
                          key={`b${index}`}
                          draggableId={`b${index}`}
                          index={index}
                        >
                          {(dragProvided) => (
                            <ListSubheader
                              component="div"
                              id="nested-list-subheader"
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              sx={{
                                backgroundColor: "lightgray",
                              }}
                            >
                              {product.name}
                            </ListSubheader>
                          )}
                        </Draggable>
                      ) : (
                        <Draggable
                          key={`c${product.id}`}
                          draggableId={`c${product.id}`}
                          index={index}
                        >
                          {(dragProvided) => (
                            <ReadyItems
                              product={product}
                              dragProvided={dragProvided}
                            />
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  updatesequence();
                }}
              >
                메뉴변경
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </DragDropContext>
    </Grid>
  );
}
