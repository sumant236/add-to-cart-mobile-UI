"use client";

import Image from "next/image";
import BellIcon from "../images/BellIcon.svg";
import FilterIcon from "../images/FilterIcon.svg";
import WishlistIcon from "../images/WishlistIcon.svg";
import HomeIcon from "../images/HomeIcon.svg";
import SavedIcon from "../images/SavedIcon.svg";
import ShoppingBagIcon from "../images/ShoppingBagIcon.svg";
import SettingsIcon from "../images/SettingsIcon.svg";
import data from "../db.json";
import { Button, Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

export default function Home() {
  return (
    <div className="bg-[#443C3C]">
      <div className="max-w-sm mx-h-screen m-auto bg-white">
        <div className="flex justify-between px-6 pt-12 ">
          <Title level={2} className="mb-3">
            Discover
          </Title>
          <Image src={BellIcon} alt="Bell Icon" />
        </div>
        <div className="flex gap-2 mb-4 px-6">
          <Input
            size="large"
            placeholder="Search anything"
            prefix={<SearchOutlined />}
          />
          <Button type="primary" className="h-10 bg-black text-white">
            <Image src={FilterIcon} alt="filter Icon" />
          </Button>
        </div>
        <div className="flex justify-between px-6">
          <Button className="bg-black text-white px-5">All</Button>
          <Button className="bg-[#F2F2F2] text-black px-5">Men</Button>
          <Button className="bg-[#F2F2F2] text-black px-5">Women</Button>
          <Button className="bg-[#F2F2F2] text-black px-5">Kids</Button>
        </div>
        <div className="grid grid-cols-2 gap-2 px-6 pt-6">
          {/* list of products */}
          {data.products.map((product) => {
            return (
              <Link href={`${product.id}`} key={product.id}>
                <Image
                  src={product.imageSrc}
                  width={161}
                  height={174}
                  className="absolute"
                  alt="product image"
                />
                <Button className="relative top-2 left-28 bg-white p-2 border-none shadow-2xl">
                  <Image src={WishlistIcon} alt="wishlist Icon" />
                </Button>
                {product.productName && (
                  <Title
                    level={5}
                    className="mt-36"
                    style={{ marginBottom: 0 }}
                  >
                    {product.productName}
                  </Title>
                )}
                {product.price && <Text>{`INR ${product.price}`}</Text>}
              </Link>
            );
          })}
        </div>
        <div className="relative py-5 px-9 flex justify-between items-center bg-white font-inter">
          <div onClick={() => {}}>
            <Image src={HomeIcon} className="m-auto" alt="Home Icon" />
            <Text>Home</Text>
          </div>
          <div>
            <Image src={SavedIcon} className="m-auto" alt="Saved Icon" />
            <Text>Saved</Text>
          </div>
          <div>
            <Image
              src={ShoppingBagIcon}
              className="m-auto"
              alt="shopping bag Icon"
            />
            <Text>Cart</Text>
          </div>
          <div>
            <Image src={SettingsIcon} className="m-auto" alt="settings Icon" />
            <Text>Settings</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
