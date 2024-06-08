import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import swal from "sweetalert";

const GenerateCode = () => {
  const [barang, setBarang] = useState(null);
  const [tanggal, setTanggal] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [supplier, setSupplier] = useState(null);
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [daftarSupplier, setDaftarSupplier] = useState([]);
  const [qrData, setQrData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBarang = await axios.get(
          "http://localhost:5000/products"
        );
        setDaftarBarang(responseBarang.data);

        const responseSupplier = await axios.get(
          "http://localhost:5000/suppliers"
        );
        setDaftarSupplier(responseSupplier.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const generateCode = async (e) => {
    e.preventDefault();
    if (!barang || !jumlah || !supplier) {
      alert("Harap isi semua field yang diperlukan");
      return;
    }

    if (isNaN(jumlah) || jumlah <= 0) {
      alert("Jumlah barang harus berupa angka positif");
      return;
    }

    try {
      const tanggalObj = new Date(tanggal);
      const inputData = {
        id_barang: barang.id,
        tanggal: tanggalObj.toISOString(),
        jumlah: parseInt(jumlah),
        id_suppliers: supplier.id,
      };

      const qrString = JSON.stringify(inputData);
      setQrData(qrString);

      swal({
        title: "Sukses!",
        text: "Menghasilkan Kode QR ",
        icon: "success",
        button: "Ok",
      });

    } catch (error) {
      alert("Terjadi kesalahan saat menambahkan barang masuk");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-500">
      <h1 className="text-center font-bold text-lg">
        Form Tambah Barang Masuk
      </h1>
      <form onSubmit={generateCode} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Nama Barang</label>
            <select
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              value={barang ? barang.id : ""}
              onChange={(e) =>
                setBarang(
                  daftarBarang.find(
                    (item) => item.id === parseInt(e.target.value)
                  )
                )
              }
            >
              <option value="">Pilih Barang</option>
              {daftarBarang.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Tanggal</label>
            <input
              type="date"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Jumlah</label>
            <input
              type="number"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Jumlah Barang"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Nama Supplier</label>
            <select
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              value={supplier ? supplier.id : ""}
              onChange={(e) =>
                setSupplier(
                  daftarSupplier.find(
                    (item) => item.id === parseInt(e.target.value)
                  )
                )
              }
            >
              <option value="">Pilih Supplier</option>
              {daftarSupplier.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
          >
            Generate QR Code
          </button>
        </div>
      </form>
      {qrData && (
        <div className="text-center mt-6 w-full ">
          <h2 className="font-bold text-lg">QR Code:</h2>
          <div className=" flex justify-center items-center gap-10 mt-8">
            <QRCode value={qrData}  />
            <div className="grid gap-4 w-full">
            <button className=" w-full h-10 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Cetak PDF </button>
            <button className=" w-full h-10 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"> input Barang </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateCode;
