import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { Context } from '../store/AppContext';

const CartItem = ({ bookId, title, harga, jumlah }) => {
  const { store, actions } = useContext(Context);
  const handleDelete = () => {
    actions.deleteCartItem(bookId, jumlah);
  };

  return (
    <div className="grid items-center py-2 px-3 grid-cols-8 border-b-2 border-white border-opacity-90 rounded-r-xl">
      <Link href={`/details?id=${bookId}`}>
        <h2
          className={`${
            title.length > 18 && 'truncate'
          } pr-2 hover:text-purple-300 cursor-pointer text-2xl col-span-4 font-bold font-nunito text-white`}
        >
          {title}
        </h2>
      </Link>
      <p className="col-span-1  text-lg text-gray-200 md:place-self-end">
        {jumlah}
      </p>
      <p className="text-xl text-gray-100 md:place-self-end col-span-2 font-nunito  font-semibold">
        Rp{harga}
      </p>

      <button
        onClick={() => handleDelete()}
        className="col-span-1 place-self-center bg-white bg-opacity-70  backdrop-filter backdrop-blur-lg p-1 shadow-lg rounded-lg "
      >
        <TrashIcon className="h-6 w-6 text-red-500 " />
      </button>
    </div>
  );
};

export default CartItem;
