import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const FormAddSupplier = () => {
  const [nama, setNama] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const saveSupplier = async (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!regex.test(setEmail)){

      swal("format email harus benar ")

    }
    e.preventDefault();
    await axios.post("http://localhost:5000/suppliers", {
      nama: nama,
      no_hp: no_hp,
      email: email,
    });
    swal({
      title: "Sukses!",
      text: "Berhasil Menyimpan Data",
      icon: "success",
      button: "Ok",
    });
    navigate("/suppliers");
  };
  return (
    <div className="w-full mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-500">
      <h1 className="font-bold text-lg">Form Tambah Supplier</h1>
      <form onSubmit={saveSupplier} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Nama</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Nama Supplier"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">No Telepon</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="No Telepon Supplier"
              value={no_hp}
              onChange={(e) => setNo_hp(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Email</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Email Supplier"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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

export default FormAddSupplier;
