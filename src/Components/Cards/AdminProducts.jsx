import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProducts = ({ pd, handleRemove }) => {
  console.log(handleRemove, pd);
  const { title, description, images, slug } = pd;
  return (
    <div className="col-md-4 pb-3">
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            alt=""
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/admin/updateProduct/${slug}`}>
            <EditOutlined className="text-danger" />
          </Link>,
          <DeleteOutlined
            onClick={() => handleRemove(slug)}
            className="text-warning"
          />,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}....`}
        />
      </Card>
    </div>
  );
};

export default AdminProducts;
