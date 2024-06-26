import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const FormBarangKeluar = () => {
  const [barang, setBarang] = useState(null);
  const [tanggal, setTanggal] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [customer, setCustomer] = useState(null);
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [daftarCustomer, setDaftarCustomer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBarang = await axios.get(
          "http://localhost:5000/products"
        );
        setDaftarBarang(responseBarang.data);

        const responseCustomer = await axios.get(
          "http://localhost:5000/customers"
        );
        setDaftarCustomer(responseCustomer.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const saveOutput = async (e) => {
    e.preventDefault();
    if (!barang || !jumlah || !customer) {
      swal("Error", "Harap isi semua field yang diperlukan", "error");
      return;
    }

    if (isNaN(jumlah) || jumlah <= 0) {
      swal("Error", "Jumlah barang harus berupa angka positif", "error");
      return;
    }

    try {
      const tanggalObj = new Date(tanggal);
      await axios.post("http://localhost:5000/keluar", {
        id_barang: barang.id,
        tanggal: tanggalObj.toISOString(),
        jumlah: parseInt(jumlah),
        id_customer: customer.id,
      });
      swal({
        title: "Sukses!",
        text: "Berhasil Menyimpan Data Barang Keluar",
        icon: "success",
        button: "Ok",
      });
      navigate("/barangKeluar");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        swal("Error", error.response.data.msg, "error");
      } else {
        swal(
          "Error",
          "Terjadi kesalahan saat menambahkan barang keluar",
          "error"
        );
      }
      console.error(error);
    }
  };

  return (
    <div className="w-full mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-500">
      <h1 className="text-center font-bold text-lg">
        Form Tambah Barang Keluar
      </h1>
      <form onSubmit={saveOutput} className="my-10">
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
            <label className="font-bold text-slate-700">Nama Customer</label>
            <select
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              value={customer ? customer.id : ""}
              onChange={(e) =>
                setCustomer(
                  daftarCustomer.find(
                    (item) => item.id === parseInt(e.target.value)
                  )
                )
              }
            >
              <option value="">Pilih Customer</option>
              {daftarCustomer.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <a
            className="w-full text-center py-3 mb-4 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
            href="/scanKeluar"
          >
            Scan
          </a>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBarangKeluar;
