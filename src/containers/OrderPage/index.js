import React, { useEffect } from "react";
import { BiDollar } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Breed } from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import { getOrders } from "../../redux/actions";
import "./style.css";

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  console.log(user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />

        {user.orders &&
          user.orders.map((order) => {
            return order.items.map((item) => (
              <Card style={{ display: "block", margin: "5px 0" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/order_details/${order._id}`}
                  className="orderItemContainer">
                  <div className="orderImgContainer">
                    <img
                      className="orderImg"
                      src={item.productId.productPictures[0].img}
                    />
                  </div>
                  <div className="orderRow">
                    <div className="orderName">{item.productId.name}</div>
                    <div className="orderPrice">
                      <BiDollar />
                      {item.payablePrice}
                    </div>
                    <div>{order.paymentStatus}</div>
                  </div>
                </Link>
              </Card>
            ));
          })}
      </div>
    </Layout>
  );
};

export default OrderPage;
