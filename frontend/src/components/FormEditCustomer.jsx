import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const FormEditCustomer = () => {
  const [nama, setNama] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getCustomerById = async () => {
      const response = await axios.get(`http://localhost:5000/customers/${id}`);
      setNama(response.data.nama);
      setNo_hp(response.data.no_hp);
      setEmail(response.data.email);
    };
    getCustomerById();
  }, [id]);

  const updateCustomer = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/customers/${id}`, {
      nama: nama,
      no_hp: no_hp,
      email: email,
    });
    swal({
      title: "Sukses!",
      text: "Berhasil Mengupdate Data",
      icon: "success",
      button: "Ok",
    });
    navigate("/customers");
  };
  return (
    <div className="w-full mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-500">
      <h1 className="font-bold text-lg">Form Edit Customer</h1>
      <form onSubmit={updateCustomer} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Nama</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Nama Customer"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">No Telepon</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="No Telepon Customer"
              value={no_hp}
              onChange={(e) => setNo_hp(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Email</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Email Customer"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditCustomer;
