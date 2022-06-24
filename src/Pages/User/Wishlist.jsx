import React, { useEffect, useState } from "react";
import UserDashboardNav from "../../Components/Navbar/UserDashboardNav";
import { useSelector, useDispatch } from "react-redux";
import { getWishList, updateWishlist } from "../../helperFunctions/user";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const loadWishlist = () =>
    getWishList(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = (productId) => {
    updateWishlist(productId, user.token).then((res) => {
      wishlist.map((p, i) => {
        if (p._id === productId) {
          return wishlist.splice(i, 1);
        }
      });
      localStorage.setItem("wishlist", JSON.stringify(res.data.wishlist));

      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: wishlist,
      });
      loadWishlist();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex ">
        <div className="col-md-2">
          <UserDashboardNav />
        </div>

        <div className="col-md-10">
          <h4>Wishlist</h4>
          {wishlist.map((p) => {
            return (
              <div key={p._id} className="alert alert-secondary">
                <Link to={`/product/${p.slug}`}> {p.title} </Link>
                <span
                  onClick={() => handleRemove(p._id)}
                  className="btn btn-dark float-end float-right btn-sm"
                >
                  Remove From Wishlist
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
