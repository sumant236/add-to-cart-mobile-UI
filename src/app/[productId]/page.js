"use client";

import React, { useEffect, useState } from "react";
import ArrowIcon from "../../images/ArrowIcon.svg";
import BellIcon from "../../images/BellIcon.svg";
import WishlistIcon from "../../images/WishlistIcon.svg";
import StarIcon from "../../images/StarIcon.svg";
import AddToCartBagIcon from "../../images/AddToCartBagIcon.svg";
import data from "../../db.json";
import { Button, Divider, Typography } from "antd";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { add } from "@/redux/cartSlice";

const { Title, Text } = Typography;

const productDetails = ({ params }) => {
  const [product, setProduct] = useState([]);
  const [smallSizeColor, setSmallSizeColor] = useState("text-black");
  const [smallSizeBgColor, setSmallSizeBgColor] = useState("bg-white");
  const [medSizeColor, setMedSizeColor] = useState("text-black");
  const [medSizeBgColor, setMedSizeBgColor] = useState("bg-white");
  const [largeSizeColor, setLargeSizeColor] = useState("text-black");
  const [largeSizeBgColor, setlargeSizeBgColor] = useState("bg-white");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  // to filter the product details from data file
  const getProductDetails = () => {
    let productDetail = data.products.filter(
      (prod) => prod.id == params.productId
    );
    setProduct(productDetail[0]);
  };

  // to change the color of size buttons when selected
  const changeColor = (size) => {
    if (size === "S") {
      setSmallSizeColor("text-white");
      setSmallSizeBgColor("bg-black");
      setMedSizeColor("text-black");
      setMedSizeBgColor("bg-white");
      setLargeSizeColor("text-black");
      setlargeSizeBgColor("bg-white");
      setSize(size);
    } else if (size === "M") {
      setSmallSizeColor("text-black");
      setSmallSizeBgColor("bg-white");
      setMedSizeColor("text-white");
      setMedSizeBgColor("bg-black");
      setLargeSizeColor("text-black");
      setlargeSizeBgColor("bg-white");
      setSize(size);
    } else if (size === "L") {
      setSmallSizeColor("text-black");
      setSmallSizeBgColor("bg-white");
      setMedSizeColor("text-black");
      setMedSizeBgColor("bg-white");
      setLargeSizeColor("text-white");
      setlargeSizeBgColor("bg-black");
      setSize(size);
    }
  };

  // to handle the add to cart functionality
  // it will store the product in redux store
  const handleAdd = (prod) => {
    dispatch(
      add({
        id: prod.id,
        productName: prod.productName,
        imageSrc: prod.imageSrc,
        size: size,
        price: prod.price,
        quantity: 1,
      })
    );
  };

  useEffect(() => {
    getProductDetails();
  }, [params]);
  return (
    <div className="bg-[#443C3C]">
      {product && (
        <div className="max-w-sm mx-h-screen m-auto bg-white">
          <div className="flex justify-between items-center px-6 pt-12 mb-3">
            {/* Link to go back to home page */}
            <Link href={"/"}>
              <Image src={ArrowIcon} alt="arrow icon" />
            </Link>
            <Title level={3}>Details</Title>
            <Image src={BellIcon} alt="bell icon" />
          </div>
          {/* product details */}
          <div className="px-6">
            <Image
              src={product.imageSrc}
              width={341}
              height={368}
              className="absolute"
              alt="product image"
            />
            <Button className="relative top-2 left-72 bg-white p-2 border-none w-13 h-14 shadow-2xl">
              <Image
                src={WishlistIcon}
                width={30}
                height={26}
                alt="wishlist icon"
              />
            </Button>
          </div>
          <div className="px-6 mt-80">
            <Text className="text-2xl">{product.productName}</Text>
          </div>
          <div className="px-6 flex align-center gap-1 pt-2">
            <Image src={StarIcon} alt="star icon" />
            <Text>4.5/5</Text>
            <Text className="text-slate-400">(45 Reviews)</Text>
          </div>
          <div className="px-6">
            <Text className="text-slate-400">
              THE NAME SAYS IT ALL, THE RIGHT SIZE SLIGHTLY SNUGS THE BODY
              LEAVING ENOUGH ROOM FOR COMFORT IN THE SLEEVES AND WAIST.
            </Text>
          </div>
          <div className="px-6">
            <Title level={5}>Choose size</Title>
            <div className="flex gap-3">
              <Button
                className={`h-10 ${smallSizeBgColor} `}
                onClick={() => changeColor("S")}
              >
                <Text className={`text-xl ${smallSizeColor}`}>S</Text>
              </Button>
              <Button
                className={`h-10 ${medSizeBgColor}`}
                onClick={() => changeColor("M")}
              >
                <Text className={`text-xl ${medSizeColor}`}>M</Text>
              </Button>
              <Button
                className={`h-10 ${largeSizeBgColor}`}
                onClick={() => changeColor("L")}
              >
                <Text className={`text-xl ${largeSizeColor}`}>L</Text>
              </Button>
            </div>
          </div>
          <div className="relative bottom-1  bg-white">
            <Divider className="m-0" />
            <div className="py-4 px-6 flex justify-between items-center">
              <div className="flex flex-col">
                <Text className="text-slate-400">Price</Text>
                <Text className="text-2xl">{`INR ${product.price}`}</Text>
              </div>
              {/* link to add product to cart and go to cart page*/}
              <Link href={"/cart"}>
                <Button
                  type="primary"
                  className="bg-black px-12 h-16 hover:bg-slate-900"
                  onClick={() => handleAdd(product)}
                >
                  <div className="flex gap-2 items-center">
                    <Image
                      src={AddToCartBagIcon}
                      width={24}
                      height={24}
                      alt="add to cart icon"
                    />
                    <Text className="text-white">Add to Cart</Text>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default productDetails;
