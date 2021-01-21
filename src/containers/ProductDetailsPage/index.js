import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../redux/actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { BiRupee, BiZoomIn } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import { addToCart } from "../../redux/actions";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import mediumZoom from "medium-zoom";
// import "./script";

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [activeIndex, setActiveIndex] = useState(0);

  mediumZoom("[data-zoomable]");

  useEffect(() => {
    const { productId } = props.match.params;
    console.log(props);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  // const handleClick = (index) => {
  //   const newActiveIndex = setActiveIndex(index);
  //   console.log(newActiveIndex);
  // };

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((thumb, index) => (
              <div
                className="thumbnail"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}>
                <img src={thumb.img} alt={thumb.img} />
              </div>
            ))}
            {/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> */}
          </div>
          <div className="productDescContainer">
            <TransformWrapper
              defaultScale={1}
              defaultPositionX={100}
              defaultPositionY={200}>
              {({ zoomIn, zoomOut, ...rest }) => (
                <>
                  <TransformComponent>
                    <div className="productDescImgContainer">
                      {/* <div 
              // id="lens"
              ></div> */}
                      <img
                        // id="featured"
                        src={
                          product.productDetails.productPictures[activeIndex]
                            .img
                        }
                        alt={`${product.productDetails.productPictures[activeIndex].img}`}
                      />
                    </div>
                  </TransformComponent>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginBottom: "20px",
                      // marginTop: "-10px",
                    }}>
                    <FaSearchMinus onClick={zoomOut} />
                    <FaSearchPlus onClick={zoomIn} />
                  </div>
                </>
              )}
            </TransformWrapper>

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  props.history.push(`/cart`);
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div>
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="#">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Mobiles</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Samsung</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiRupee />
              4500 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <BiRupee />
                {product.productDetails.price}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}>
                Available Offers
              </p>
              <p style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                    marginBottom: "5px",
                  }}>
                  Description
                </span>

                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}>
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
