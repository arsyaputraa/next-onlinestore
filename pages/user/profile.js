import Image from 'next/image';
import LayoutNav from '../../components/LayoutNav';
import userAvatar from '../../public/images/user.webp';
import { Context } from '../../store/AppContext';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeftIcon, RefreshIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const profile = () => {
  const router = useRouter();
  const { store, actions } = useContext(Context);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const uploadImage = async () => {
    if (selectedImage == '') {
      alert('choose image first');
      return null;
    }
    setShowLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    formData.append('name', store.user.email);

    const opts = {
      method: 'POST',
      body: formData,
    };
    const res = await fetch(
      'https://api.imgbb.com/1/upload?key=bd90638c13e2462dadcae63f4e65fe56',
      opts
    );
    const data = await res.json();

    await actions.updateProfilePic(data.data.url);
    setShowLoading(false);
    router.reload();
  };

  const handleUpdate = () => {
    actions.updateProfile(firstName, lastName, phone, newPassword);
    router.reload();
  };
  return (
    <LayoutNav>
      {store.token && store.token != '' && store.token != undefined ? (
        <>
          <div className="flex p-4 justify-between items-center">
            <button
              onClick={() => {
                router.back();
              }}
              className="text-white flex gap-2 items-center font-bold"
            >
              <ArrowLeftIcon className="w-6 h-6" />
              Back
            </button>
            <button
              onClick={() => {
                actions.logout();
                router.push('/');
              }}
              className="bg-red-500 text-white font-bold p-3 rounded-xl shadow-md shadow-zinc-700"
            >
              Log Out
            </button>
          </div>
          <div className="text-white p-3 py-5 md:grid md:grid-cols-2 md:gap-2">
            <div className="grid space-y-5 md:space-y-0 md:grid-rows-5 md:grid-cols-1 items-center justify-center">
              <div className="place-self-center md:row-span-2 w-6/12 lg:w-4/12 rounded-full border-4 border-indigo-300 overflow-hidden">
                <Image
                  src={
                    store.user.profile_pic ? store.user.profile_pic : userAvatar
                  }
                  height={200}
                  layout="responsive"
                  width={200}
                />
              </div>
              <div className="place-self-center flex justify-between items-center w-9/12 md:w-8/12 lg:w-6/12 border-white border-opacity-20 border-2 p-2 rounded-lg md:row-span-1 md:place-self-center">
                <input
                  type="file"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                {showLoading ? (
                  <RefreshIcon className="animate-spin w-8" />
                ) : (
                  <button
                    className={`${
                      selectedImage != '' &&
                      'bg-blue-400 font-semibold text-white hover:border-2 hover:border-indigo-300'
                    } bg-blue-200 rounded-md p-2 text-black`}
                    onClick={uploadImage}
                  >
                    Upload
                  </button>
                )}
              </div>
              <div className="md:row-span-2 flex flex-col items-center md:place-self-center p-3 md:px-3">
                <h3 className="font-bold text-xl uppercase">
                  {store.user.nama}
                </h3>
                <table className="">
                  <tr>
                    <td className="whitespace-nowrap">User ID</td>
                    <td className="pl-3">: {store.user.userID}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap">Email</td>
                    <td className="pl-3">: {store.user.email}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap">Phone</td>
                    <td className="pl-3">: {store.user.no_telp}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap">Alamat</td>
                    <td className="pl-3">
                      :{' '}
                      {store.user.alamat &&
                      store.user.kodepos &&
                      store.user.kota &&
                      store.user.provinsi
                        ? `${store.user.alamat}, ${store.user.kodepos}, ${store.user.kota}, ${store.user.provinsi}`
                        : '-'}{' '}
                      <Link href="/updateaddress">
                        <button className="bg-green-400 hover:bg-opacity-100 transition-all ease-in-out duration-150 bg-opacity-40 p-1 rounded-md">
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="flex flex-col px-3 md:space-y-10 space-y-3 md:pr-4 ">
              <div className="flex justify-center flex-col">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  placeholder="New First Name"
                  name="first_name"
                  className="border-black text-black w-100 border-2 rounded-xl p-3"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center flex-col">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  placeholder="New Last Name"
                  name="last_name"
                  className="border-black text-black w-100 border-2 rounded-xl p-3"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center flex-col">
                <label htmlFor="name">Phone</label>
                <input
                  type="tel"
                  maxLength={12}
                  placeholder="New Phone Number"
                  name="no_telp"
                  className="border-black text-black w-100 border-2 rounded-xl p-3"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              {/* <div className="flex justify-center flex-col">
                <label htmlFor="alamat">Alamat</label>
                <input
                  type="text"
                  placeholder="Alamat"
                  name="alamat"
                  className="border-black w-100 border-2 rounded-xl p-3"
                />
              </div> */}
              <div className="flex justify-center flex-col">
                <label htmlFor="umur">New Password</label>
                <input
                  type="text"
                  placeholder="New Password"
                  name="password"
                  className="border-black text-black w-100 border-2 rounded-xl p-3"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <button
                disabled={
                  firstName.length > 0 ||
                  lastName.length > 0 ||
                  phone.length > 0 ||
                  newPassword.length > 0
                    ? false
                    : true
                }
                type="submit"
                className="bg-green-400 rounded-xl p-3 text-white font-bold disabled:bg-green-800 disabled:opacity-25"
                onClick={() => {
                  if (confirm('Are you sure want to update')) {
                    handleUpdate();
                  }
                }}
              >
                Update
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center h-screen">
          <h1 className="text-xl font-bold text-white">
            Unavailable, please login or register first!
          </h1>
          <Link href="/login">
            <button className="bg-gradient-to-r mt-3 hover:bg-gradient-to-l from-sky-600 to-blue-600 p-2 rounded-lg text-white font-roboto font-bold text-xl border-2 border-transparent hover:border-2 border-opacity-80 hover:border-purple-100 transition-all ease-in-out duration-150">
              Login
            </button>
          </Link>
        </div>
      )}
    </LayoutNav>
  );
};

export default profile;
