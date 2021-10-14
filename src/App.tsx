import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import LayoutPage from "./components/Layout";
import AccountLayout from "./components/AccountLayout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AdminRoutes, DefaultRoutes } from "./router";

import {
      ApolloClient,
      InMemoryCache,
      HttpLink,
      ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({ uri: "http://localhost:1337/graphql" }),
});

function App() {
      return (
            <div className="App">
                  <ApolloProvider client={client}>
                        <Router>
                              <Switch>
                                    <Route path="/account">
                                          <AccountLayout>
                                                <Switch>
                                                      <DefaultRoutes />
                                                </Switch>
                                          </AccountLayout>
                                    </Route>

                                    <Route>
                                          <LayoutPage>
                                                <Switch>
                                                      <AdminRoutes />
                                                </Switch>
                                          </LayoutPage>
                                    </Route>
                              </Switch>
                        </Router>
                  </ApolloProvider>
            </div>
      );
}

export default App;
