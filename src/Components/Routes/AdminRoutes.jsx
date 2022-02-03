import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { currentAdmin } from "../../helperFunctions/createOrUpdate";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoutes = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log(res);
          setOk(true);
        })
        .catch((err) => {
          console.log("admin route err", err);
          setOk(false);
        });
    }

    // return () => {};
  }, [user]);
  return ok ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoutes;
