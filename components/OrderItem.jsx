import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { RefreshIcon } from '@heroicons/react/outline';
import { Context } from '../store/AppContext';
import Link from 'next/link';

const OrderItem = ({ userOrder }) => {
  const { store, actions } = useContext(Context);
  const [showLoading, setShowLoading] = useState(false);
  const handleCekStatus = () => {
    setShowLoading(true);
    actions.cekStatus(userOrder.orderID).then(() => {
      setShowLoading(false);
    });
  };

  const handleOrderFinish = () => {
    if (confirm('Anda yakin pesanan selesai?')) {
      setShowLoading(true);
      actions.finishOrder(userOrder.orderID).then(() => {
        setShowLoading(false);
      });
    }
  };
  const statusTranslate = (status) => {
    if (status == 'pending') return 'Menunggu Pembayaran';
    else if (status === 'settlement') return 'Pembayaran Berhasil';
    else if (status === 'expire') return 'Expired';
    else if (status === 'failure') return 'Transaksi Gagal';
    else if (status === 'finished') return 'Transaksi Selesai';
  };

  return (
    <div className="bg-black min-w-full  bg-opacity-70 shadow-lg sm:rounded-md backdrop-blur-lg backdrop-filter place-self-center grid grid-cols-3 items-center justify-evenly flex-col p-4">
      <div className="">
        <p className="text-xl md:text-2xl lg:text-3xl font-bold font-roboto">
          Total Tagihan: <br /> <span>Rp{userOrder.totalHarga}</span>
        </p>
        <p className="text-xs md:text-sm lg:text-md ">
          Order ID : {userOrder.orderID}
        </p>
        <p>Transfer Bank : {userOrder.bank}</p>
      </div>

      <div className="flex justify-center items-center">
        {showLoading ? (
          <RefreshIcon className="w-4 animate-spin" />
        ) : (
          <span
            className={`${userOrder.status == 'pending' && 'bg-orange-300'} ${
              userOrder.status == 'settlement' && 'bg-green-400'
            } ${userOrder.status == 'expire' && 'bg-red-400'} ${
              userOrder.status == 'failure' && 'bg-red-500'
            } ${
              userOrder.status === 'finished' && 'bg-blue-400'
            }p-1 text-xs lg:text-lg rounded-lg`}
          >
            {statusTranslate(userOrder.status)}
          </span>
        )}
      </div>
      <div className="flex gap-2 md:gap-3 justify-evenly items-center">
        {userOrder.status == 'pending' ? (
          <Link
            href={`/pembayaran?bank=${userOrder.bank}&totalHarga=${userOrder.totalHarga}&vanumber=${userOrder.vanumber}&orderID=${userOrder.orderID}`}
            as={`pembayaran/order-${userOrder.orderID}`}
          >
            <button className="md:text-4xl bg-gradient-to-r hover:bg-gradient-to-l min-w-fit from-purple-600 to-indigo-600 p-2 rounded-lg text-white font-roboto font-bold text-xl border-2 border-transparent hover:border-2 border-opacity-80 hover:border-purple-100 transition-all ease-in-out duration-150">
              Bayar
            </button>
          </Link>
        ) : (
          <>
            {userOrder.status !== 'pending' && userOrder.status !== 'finished' && (
              <button
                onClick={() => {
                  handleOrderFinish();
                }}
                className="md:text-3xl bg-gradient-to-r hover:bg-gradient-to-l from-purple-600 to-indigo-600 p-2 rounded-lg text-white font-roboto font-bold min-w-fit border-2 border-transparent hover:border-2 border-opacity-80 hover:border-purple-100 transition-all ease-in-out duration-150"
              >
                Selesai
              </button>
            )}
          </>
        )}
        {userOrder.status === 'finished' && (
          <Link href={`/rating?orderID=${userOrder.orderID}`}>
            <button className="md:text-lg bg-gradient-to-r hover:bg-gradient-to-l min-w-fit from-purple-600 to-indigo-600 p-2 rounded-lg text-white font-roboto font-bold text-md border-2 border-transparent hover:border-2 border-opacity-80 hover:border-purple-100 transition-all ease-in-out duration-150">
              Beri penilaian
            </button>
          </Link>
        )}
        <button
          onClick={() => {
            handleCekStatus();
          }}
          className="md:text-4xl bg-gradient-to-r hover:bg-gradient-to-l from-purple-600 to-indigo-600 p-2 rounded-full text-white font-roboto font-bold text-2xl border-2 border-transparent hover:border-2 border-opacity-80 hover:border-purple-100 transition-all ease-in-out duration-150"
        >
          <RefreshIcon className="w-6 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
