/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
// =======================================IMPORT 구문========================================== //
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import {
  Unstable_Grid2 as Grid,
  Paper,
  Button,
  List,
  ListSubheader,
} from "@mui/material";
import { Iproduct, Icategory } from "modules/types";
import { REST_API } from "redux/redux";
import Items from "./Items";

import "../../../Seller.css";
// ============================================================================================ //

interface Props {
  setCurrProduct: React.Dispatch<React.SetStateAction<Iproduct>>;
  realProduct: React.MutableRefObject<{
    id: number;
    userId: number;
    image: string;
    thumbnail: string;
    categoryId: number;
    categoryName: string;
    name: string;
    signature: boolean;
    popular: boolean;
    price: number;
    status: string;
    createdAt: string;
    modifiedAt: string;
    salRecord: number;
    description: string;
    sequence: number;
  }>;
  products: Iproduct[];
  categorys: Icategory[];
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setClick: React.Dispatch<React.SetStateAction<number>>;
  click: number;
}

type Category = {
  id: number;
  userId: number;
  sequence: number;
};
export default function ProductList({
  setCurrProduct,
  realProduct,
  products,
  categorys,
  setReload,
  click,
  setClick,
}: Props) {
  // 초기값 설정
  const token = localStorage.getItem("accessToken");
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo).userId : "";

  const initProduct: Iproduct = useMemo(
    () => ({
      id: 0,
      userId: user,
      image: "",
      thumbnail: "",
      categoryId: 1,
      categoryName: "",
      name: "",
      signature: false,
      popular: false,
      price: 0,
      status: "STOP",
      createdAt: "",
      modifiedAt: "",
      salRecord: 0,
      description: "",
      sequence: 1,
    }),
    [user]
  );

  const navigate = useNavigate();
  // 제품 목록

  // 메뉴와 비메뉴
  const [menu, setMenu] = useState<Iproduct[]>([]);
  const [ready, setReady] = useState<Iproduct[]>([]);

  useEffect(() => {
    if (products && categorys) {
      let menuArr: Iproduct[] = [...products];
      const readyArr: Iproduct[] = [];
      const idxMap: Map<number, number> = new Map();

      readyArr.push(
        ...menuArr.filter((menuItem) => menuItem.status === "STOP")
      );
      menuArr = menuArr.filter((menuItem) => menuItem.status === "ON");

      for (const category of categorys) {
        idxMap.set(category.id, category.sequence);
        if (category.name !== "미분류") {
          menuArr.push({
            ...initProduct,
            id: category.id,
            name: category.name,
            categoryId: category.id,
            sequence: 0,
            status: "CATE",
          });
        }
      }

      menuArr.sort((a: Iproduct, b: Iproduct) => {
        const first: number = idxMap.get(a.categoryId) || 0;
        const second: number = idxMap.get(b.categoryId) || 0;

        if (first === second) {
          if (a.status === "CATE" && b.status !== "CATE") {
            return -1;
          } else if (a.status !== "CATE" && b.status === "CATE") {
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
  }, [categorys, products]);

  // const [modalId, setModalId] = useState<number[]>([0, 0]); // 모달 상품 번호
  const [createItem, setCreateItem] = useState<boolean>(false); // 아이템 업로드

  // ***************************************************** 드래그 관련 함수 *****************************************************
  // 상품을 재배치합니다.
  const resequence = (
    list: Iproduct[] | undefined,
    startIndex: number,
    endIndex: number
  ): Iproduct[] => {
    if (list) {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);

      result.splice(endIndex, 0, removed);

      return result;
    } else {
      return [];
    }
  };

  // 상품을 이동합니다.
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
        if (second[0].status === "CATE") {
          setReady(first);
          setMenu(second);
        }
      } else {
        setReady(second);
        setMenu(first);
      }
    }
  };

  // 위의 두 함수를 이용하여, 드래그 이벤트를 결정합니다.
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // 만약 드래그 위치가 잘못되었다면 시행되지 않습니다.
    if (!destination) {
      return;
    }

    // a에서 이동
    if (source.droppableId === "a") {
      if (destination.droppableId === source.droppableId) {
        // 같은 자리에서 재배치
        const resequenceedReady = resequence(
          ready,
          source.index,
          destination.index
        );

        setReady(resequenceedReady);
      } else {
        // 다른 자리로 이동
        moving(ready, menu, source.index, destination.index, 1);
      }
    } else if (source.droppableId === "b") {
      if (destination.droppableId === source.droppableId) {
        const resequenceedMenu = resequence(
          menu,
          source.index,
          destination.index
        );

        if (resequenceedMenu[0].status === "CATE") setMenu(resequenceedMenu);
      } else if (menu && menu[source.index].status !== "CATE") {
        moving(menu, ready, source.index, destination.index, 2);
      }
    }
  };

  // ***************************************************** 드래그 관련 함수 *****************************************************

  // ***************************************************** 드래그 결과 전달 *****************************************************
  const updatesequence = () => {
    let catesequence = 1;
    let itemsequence = 1;
    let cateCode = 1;
    let defaultCategory = 1;

    const newProducts = [];
    const newCategorys: Category[] = [];
    const deleteCategorys: Category[] = [];

    // ON 상태인 것들을 넣습니다.
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].status !== "CATE") {
        newProducts.push({
          id: menu[i].id,
          categoryId: cateCode,
          status: "ON",
          sequence: itemsequence,
        });
        itemsequence++;
      } else {
        cateCode = menu[i].id;
        if (i !== menu.length - 1 && menu[i + 1].status !== "CATE") {
          defaultCategory = cateCode;
          newCategorys.push({
            id: cateCode,
            userId: user,
            sequence: catesequence,
          });
        } else {
          deleteCategorys.push({
            id: cateCode,
            userId: user,
            sequence: catesequence,
          });
        }
        itemsequence = 1;
        catesequence++;
      }
    }

    itemsequence = 1;

    // STOP 상태인 것을 먼저 넣습니다.
    for (const readyItem of ready) {
      newProducts.push({
        id: readyItem.id,
        categoryId: defaultCategory,
        status: "STOP",
        sequence: itemsequence,
      });
      itemsequence++;
    }

    axios({
      url: `${REST_API}store/menuitem/list`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: newProducts,
      },
    })
      .then(() => {
        axios({
          url: `${REST_API}store/menucategory/list`,
          method: "PATCH",
          data: {
            data: newCategorys,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            for (const del of deleteCategorys) {
              axios({
                url: `${REST_API}store/menucategory/${del.id}`,
                method: "DELETE",
              })
                .then(() => {
                  setReload(true);
                })
                .catch((er) => {
                  console.log(er);
                });
            }
          })
          .catch(() => {
            navigate("/error");
          });
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  //

  useEffect(() => {
    if (createItem) localStorage.setItem("products", JSON.stringify(products));
    setCreateItem(false);
  }, [createItem, products]);

  // useEffect(() => {
  //   if (modalId[1] !== 0) setOpen(true);
  // }, [modalId]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                        <Items
                          product={product}
                          setCurrProduct={setCurrProduct}
                          realProduct={realProduct}
                          dragProvided={dragProvided}
                          click={click}
                          setClick={setClick}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
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
                    product.status === "CATE" ? (
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
                          <Items
                            product={product}
                            dragProvided={dragProvided}
                            setCurrProduct={setCurrProduct}
                            realProduct={realProduct}
                            click={click}
                            setClick={setClick}
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
  );
}
