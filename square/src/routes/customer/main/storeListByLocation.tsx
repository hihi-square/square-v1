import React from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { useSwipeable } from "react-swipeable";
import "App.css";

import StorePage from "../store/storePage";

export default function StoreListByLocation() {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const handlers = useSwipeable({
    onSwipedUp: () => {
      setState({ ...state, bottom: true });
    },
    onSwipedDown: () => {
      setState({ ...state, bottom: false });
    },
  });

  const toggleDrawer =
    (anchor: "bottom", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        event instanceof KeyboardEvent &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <div>
      <React.Fragment key={"bottom"}>
        <Drawer
          anchor={"bottom"}
          open={state.bottom}
          onClose={toggleDrawer("bottom", false)}
        >
          <button>하이</button>
          <button>하이</button>
          <button>하이</button>
          <button>하이</button>
        </Drawer>
      </React.Fragment>
      <div className="swipe-handler" {...handlers}>
        <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          <div
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: "darkgray",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: "darkgray",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: "darkgray",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>

      <Routes>
        <Route path="/:storeid" element={<StorePage />} />
      </Routes>
    </div>
  );
}
