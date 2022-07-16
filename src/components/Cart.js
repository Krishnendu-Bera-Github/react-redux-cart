import React, { useEffect } from "react";
import pizzaDatabase from "../pizzaDatabase.json";
import {
  addToCart,
  removeFromCart,
  decreaseCart,
  getTotal,
} from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.cart.cartTotalAmount);
  console.log(items);
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex">
        <div className="md:3/4 w-3/4  px-20 flex flex-wrap justify-between mt-5 mb-auto">
          {pizzaDatabase.map((data) => {
            return (
              <div className=" w-64 bg-white rounded-md mb-12">
                <div className="relative">
                  <img
                    className="rounded-md object-cover h-36"
                    src={data.image}
                    alt=""
                  />
                  <p className="absolute bottom-2 text-white font-bold px-2">
                    ₹ {data.price}
                  </p>
                </div>
                <div className="px-2">
                  <h2 className="font-bold py-2">{data.name}</h2>
                  <p className="text-sm font-extralight mb-2">
                    {data.description}
                  </p>
                  <div className="text-right py-2">
                    <button
                      onClick={() => handleAdd(data)}
                      className=" p-1 text-green-600 border-2 rounded-md border-green-500 text-sm"
                    >
                      Add to CART
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" lg:w-1/4 xl:w-1/4">
          <div className=" h-[25rem] bg-white mr-16  mt-5 overflow-y-auto ">
            {items.length ? (
              <div className="">
                {items.map((item) => {
                  return (
                    <div className="">
                      <div className="flex space-x-5 p-2 w-full border-t border-gray-300">
                        <div className="w-72 ">
                          <img
                            className="w-32 h-20  object-cover rounded-md"
                            src={item.image}
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div className="">
                          <p className="font-semibold mb-2 text-gray-600">
                            {item.name}
                          </p>
                          <p className="text-xs">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between px-2">
                        <div className="flex items-center border border-gray-500 rounded-md">
                          <span className="p-1 cursor-pointer">
                            <img
                              onClick={() => handleDecreaseCart(item)}
                              className="w-4"
                              src="minus.png"
                              alt=""
                            />
                          </span>
                          <span className="px-3">{item.cartQuantity}</span>
                          <span className="p-1 cursor-pointer">
                            <img
                              onClick={() => handleAdd(item)}
                              className="w-3"
                              src="plus.png"
                              alt=""
                            />
                          </span>
                        </div>
                        <span className="flex items-center">
                          <img
                            onClick={() => handleRemove(item)}
                            className="w-4 cursor-pointer"
                            src="delete.png"
                            alt=""
                          />
                        </span>
                        <p className="font-bold text-gray-600 pb-2">
                          ₹ {item.price * item.cartQuantity}.00
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <img className="ml-auto" src="empty_cart.png" alt="" />
                <div className="px-10 text-gray-500 mt-20">
                  <h1 className="font-bold text-xl">YOUR CART IS EMPTY</h1>
                  <p className="font-extralight">
                    Please add some items from the menu.
                  </p>
                </div>
              </div>
            )}
          </div>
          {items.length ? (
            <div className="mr-16 bg-[#d8e0e7] p-2 rounded-sm">
              <div className="flex justify-between px-4 items-center">
                <p className=" font-bold text-lg  ">Subtotal</p>
                <p className="font-bold text-lg">₹ {total}</p>
              </div>
              <button className="bg-[#82BB37]  px-2 py-1 pt- w-full rounded-md text-white font-medium">
                CHECKOUT
              </button>
            </div>
          ) : (
            ``
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
