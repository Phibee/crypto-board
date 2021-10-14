import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Board from "../pages/Board";
import { BoardItemProps } from "../types/board.item";

export const AdminRoutes: React.VFC<{}> = () => {
      return (
            <>
                  <Route path="/" exact>
                        <Board />
                  </Route>
            </>
      );
};

export const DefaultRoutes: React.VFC<{}> = () => {
      return <></>;
};
