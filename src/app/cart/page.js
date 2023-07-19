"use client";

import { Button, Divider, Input, Typography } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ArrowIcon from "../../images/ArrowIcon.svg";
import ArrowRightIcon from "../../images/ArrowRightIcon.svg";
import BellIcon from "../../images/BellIcon.svg";
import TrashIcon from "../../images/TrashIcon.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, remove } from "@/redux/cartSlice";

const { Title, Text } = Typography;

const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [shippingFees, setShippingFees] = useState(0);
  const [total, setTotal] = useState(0);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // to handle total no of a product and update it in redux
  const handleNoOfItems = (action, value) => {
    action === "increase"
      ? dispatch(increaseQuantity(value.id))
      : dispatch(decreaseQuantity(value.id));
  };

  // to calculate the price
  const calculatePrice = () => {
    setSubTotal(0);
    setVat(0);
    setShippingFees(0);
    setTotal(0);

    cartItems.map((product) => {
      setSubTotal(product.price * product.quantity);
      setVat(0);
      setShippingFees(80);
      setTotal(subTotal + shippingFees);
    });
  };

  // to handle the delete and delete the product from redux store
  const handleDelete = (item) => {
    dispatch(remove(item));
  };

  // to calculate price when page renders
  useEffect(() => {
    calculatePrice();
  }, []);

  // to calculate price when product quantity updates / product deleted
  useEffect(() => {
    calculatePrice();
  }, [handleNoOfItems, handleDelete]);

  return (
    <div className="bg-[#443C3C]">
      <div className="max-w-sm mx-h-screen m-auto bg-white">
        <div className="flex justify-between items-center px-6 pt-12 mb-3">
          <Link href={"/"}>
            <Image src={ArrowIcon} alt="arrow icon" />
          </Link>
          <Title level={3}>My Cart</Title>
          <Image src={BellIcon} alt="bell icon" />
        </div>
        {/* list to products added to the cart */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#F2F2F2] flex justify-between mx-6 my-4 px-4 py-2 rounded"
          >
            <div className="border-slate-400 border-2 rounded">
              <Image
                src={item.imageSrc}
                width={83}
                height={85}
                alt="product image"
              />
            </div>
            <div className="flex flex-col justify-between font-inter w-28">
              <div className="flex flex-col">
                <Text className="font-medium">{item.productName}</Text>
                <Text className="text-slate-500">{`Size ${item.size}`}</Text>
              </div>
              <Text>{`INR ${item.price}`}</Text>
            </div>
            <div className="flex flex-col items-end justify-between">
              {/* to delete the product */}
              <Image
                src={TrashIcon}
                alt="trash icon"
                onClick={() => handleDelete(item)}
              />
              {/* to update the number of quantity */}
              <div className="flex items-center">
                <Button
                  onClick={() => handleNoOfItems("decrease", item)}
                  className="px-2 py-1"
                >
                  -
                </Button>
                <div className="w-4 text-center">
                  <Text>{item.quantity}</Text>
                </div>
                <Button
                  onClick={() => handleNoOfItems("increase", item)}
                  className="px-2 py-1"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-[#F2F2F2] flex justify-between mx-6 my-8 px-4 py-2 rounded">
          <Input
            placeholder="Add a voucher"
            className="bg-[#F2F2F2]"
            bordered={false}
          />
        </div>
        <div className="mx-6">
          <div className="flex justify-between my-4">
            <Text className="text-slate-500 font-medium">Sub-total</Text>
            <Text>{`INR ${subTotal}`}</Text>
          </div>
          <div className="flex justify-between my-4">
            <Text className="text-slate-500 font-medium">Vat (%)</Text>
            <Text>{`INR ${vat}`}</Text>
          </div>
          <div className="flex justify-between my-4">
            <Text className="text-slate-500 font-medium">Shipping fee</Text>
            <Text>{`INR ${shippingFees}`}</Text>
          </div>
          <Divider className="m-0" />
          <div className="flex justify-between my-4">
            <Text className="font-medium">Total</Text>
            <Text>{`INR ${total}`}</Text>
          </div>
        </div>
        <div className="py-4 px-6">
          <Button
            type="primary"
            className="bg-black px-12 h-16 hover:bg-slate-900 w-full"
          >
            <div className="flex gap-2 items-center justify-center">
              <Text className="text-white text-base">Checkout</Text>
              <Image
                src={ArrowRightIcon}
                width={24}
                height={24}
                alt="arrow right icon"
              />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
