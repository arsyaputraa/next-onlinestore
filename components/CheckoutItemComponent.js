import { useEffect, useState } from 'react';
import { RefreshIcon } from '@heroicons/react/outline';

const CheckoutItemComponent = ({
  index,
  CheckoutItem,
  buyerLocation,
  totalOngkirCount,
}) => {
  const [sellerCityID, setSellerCityID] = useState(CheckoutItem.idKota);
  // const [buyerCityID, setBuyerCityID] = useState(buyerLocation);
  const [kurir, setKurir] = useState('');
  const [pilihOngkir, setPilihOngkir] = useState(0);
  const [tipeOngkir, setTipeOngkir] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // useEffect(async () => {
  //   console.log(buyerCityID);
  //   const opts = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       key: 'c2b5556d2dad508cb165d9ea5bc07888',
  //     },
  //     body: JSON.stringify({
  //       origin: sellerCityID,
  //       destination: buyerCityID,
  //       courier: kurir,
  //       weight: 500,
  //     }),
  //   };
  //   if (buyerCityID != null) {
  //     const res = await fetch('https://localhost:5000/ongkir', opts);
  //     const data = await res.json();
  //     console.log(data);
  //   }
  // }, [sellerCityID, buyerLocation, kurir]);

  const handleOngkir = async (kurir = { kurir }) => {
    if (
      buyerLocation == undefined ||
      buyerLocation == null ||
      buyerLocation == ''
    )
      alert('Pilih alamat pengiriman terlebih dahulu');

    const opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        key: 'c2b5556d2dad508cb165d9ea5bc07888',
      },
      // body: JSON.stringify({
      //   origin: sellerCityID,
      //   destination: buyerLocation,
      //   courier: kurir,
      //   weight: 500,
      // }),
    };
    if (buyerLocation != null) {
      setPilihOngkir();
      setTipeOngkir([]);
      setShowLoading(true);

      const res = await fetch(
        `http://localhost:5000/ongkir?destination=${buyerLocation}&origin=${sellerCityID}&courier=${kurir}&weight=${CheckoutItem.totalBerat}`,
        opts
      );

      const data = await res.json();

      setTipeOngkir(data.rajaongkir.results[0].costs);
      setShowLoading(false);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    handleOngkir(e.target.value);
    setKurir(e.target.value);

    setPilihOngkir(() => {
      totalOngkirCount(pilihOngkir, 0);
      return 0;
    });
  };

  return (
    <div
      key={index}
      className="border-b-2 py-2 grid md:grid-cols-2 text-white border-gray-400"
    >
      <div>
        <h2 className="text-lg font-bold">Pesanan {index + 1}</h2>
        <p className="text-sm capitalize">
          Penjual : {CheckoutItem.namaPenjual}
        </p>
        <p className="text-xs">
          {CheckoutItem.kota}, {CheckoutItem.provinsi}
        </p>
        {CheckoutItem.produk.map((produk, index) => {
          return (
            <div key={index} className="py-1">
              <h3 className="font-roboto underline font-bold text-xl">
                {produk.nama}
              </h3>
              <p>Jumlah : {produk.quantity}</p>
              <p>Berat : {produk.quantity} x 300 gr</p>
              <p>
                {produk.quantity} x (Rp{produk.harga}) = Rp
                {produk.totalHarga}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <p className="font-semibold text-xl">
          Total Harga :{' '}
          <span className="text-2xl">Rp{CheckoutItem.totalHargaToko}.00</span>
        </p>
        <label className="block">Pilih Jasa Pengiriman:</label>
        <div className="py-1">
          <select
            onChange={(e) => handleChange(e)}
            className="text-black p-1 rounded-md shadow-sm"
          >
            <option value="" selected disabled hidden>
              Pilih Kurir
            </option>
            <option value="jne">JNE</option>
            <option value="tiki">TIKI</option>
            <option value="pos">POS ID</option>
          </select>
        </div>
        {!loading && tipeOngkir.length !== 0 ? (
          <div className="py-1">
            <label className="block">Pilih Tipe Pengiriman:</label>
            <select
              onChange={(e) =>
                setPilihOngkir((prevState) => {
                  const previous = prevState ? prevState : 0;
                  totalOngkirCount(previous, e.target.value);
                  return e.target.value;
                })
              }
              className="text-black p-1 rounded-md shadow-sm"
            >
              <option value="" selected disabled hidden>
                Pilih Tipe Pengiriman
              </option>
              {tipeOngkir.map((tipe) => (
                <option value={tipe.cost[0].value}>
                  {tipe.description} ({tipe.service})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>{showLoading && <RefreshIcon className="w-8 animate-spin" />}</>
        )}

        {pilihOngkir != null && pilihOngkir != undefined && pilihOngkir != 0 ? (
          <>
            <p className="text-white">Berat : {CheckoutItem.totalBerat} gr</p>
            <p className="my-1 font-semibold text-white">
              Ongkos Kirim:
              <br />
              <span className="text-2xl">Rp{pilihOngkir}.00</span>
            </p>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CheckoutItemComponent;
