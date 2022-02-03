import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoutes = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoutes;
