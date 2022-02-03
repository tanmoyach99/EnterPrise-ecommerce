import React from "react";
import UserDashboardNav from "../../Components/Navbar/UserDashboardNav";
import { getAuth, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const auth = getAuth();

    const user = auth.currentUser;
    // const newPassword = getASecureRandomPassword();

    await updatePassword(user, password)
      .then(() => {
        setLoading(false);
        toast.success("password updated");
        // Update successful.
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        // An error ocurred
        // ...

        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex ">
        <div className="col-md-2">
          <UserDashboardNav />
        </div>

        <div className="col-md-9">
          {loading ? (
            <h3 className="text-danger">Loading </h3>
          ) : (
            <h1>Update Password </h1>
          )}
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor=""> Your Password</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="enter new password"
                className="form-control"
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!password || loading || password.length < 6}
              >
                submit
              </button>
            </div>
          </form>
          ;
        </div>
      </div>
    </div>
  );
};

export default Password;
