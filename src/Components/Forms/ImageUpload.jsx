import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const ImageUpload = ({ values, setValues }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images || values;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const element = files[i];
        Resizer.imageFileResizer(
          element,
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `http://localhost:8000/api/upload`,
                { image: uri },
                { headers: { authtoken: user ? user.token : "" } }
              )
              .then((res) => {
                console.log(res);

                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                console.log("err happened", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (id) => {
    axios
      .post(
        `http://localhost:8000/api/upload`,
        { public_id: id },
        { headers: { authtoken: user ? user.token : "" } }
      )
      .then((res) => {
        const { images } = values;
        let filteredImages = images.filter((img) => img.public_id !== id);
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="row">
        {values.images &&
          values.images.map((img) => (
            <Badge
              count="X"
              key={img.public_id}
              style={{ cursor: "pointer" }}
              onClick={() => handleImageRemove(img.public_id)}
            >
              <Avatar
                src={img.url}
                size={100}
                shape="square"
                className="p-3 d-flex"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <input
          type="file"
          name=""
          id=""
          className="btn btn-primary "
          multiple
          accept="images/*"
          onChange={fileUploadResize}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
