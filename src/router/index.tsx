import React from 'react';
import {Route} from 'react-router-dom';

import Home from '../pages/Home';
import Board from '../pages/Board';

export const AdminRoutes: React.VFC<{}> = () => {
  return (
    <>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/board/:id" exact>
        <Board />
      </Route>
    </>
  );
};

export const DefaultRoutes: React.VFC<{}> = () => {
  return <></>;
};
