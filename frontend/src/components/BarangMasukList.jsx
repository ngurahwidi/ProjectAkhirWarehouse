import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSwr, { useSWRConfig } from "swr";
import swal from "sweetalert";

const BarangMasukList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/inputs");
    return response.data;
  };

  const { data } = useSwr("inputs", fetcher);
  if (!data) return <h2>Loading....</h2>;

  const deleteInputs = async (inputsId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`http://localhost:5000/inputs/${inputsId}`);
        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
        mutate("inputs");
      } else {
        swal("Your file is safe!");
      }
    });
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="w-full">
        <Link
          to="/barangMasuk/add"
          className="bg-blue-500 hover:bg-blue-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add New
        </Link>
        <div className="relative shadow rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Tanggal</th>
                <th className="py-3 px-6">Jumlah</th>
                <th className="py-3 px-6">Barang</th>
                <th className="py-3 px-6">Supplier</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((inputs, index) => (
                <tr className="bg-white border-b" key={inputs.id}>
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6">{inputs.tanggal}</td>
                  <td className="py-3 px-6">{inputs.jumlah}</td>
                  <td className="py-3 px-6">{inputs.barang.nama}</td>
                  <td className="py-3 px-6">{inputs.supplier.nama}</td>
                  <td className="py-3 px-1 text-center">
                    <Link
                      to={`/barangMasuk/${inputs.id}`}
                      className="font-medium bg-yellow-500 hover:bg-yellow-700 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteInputs(inputs.id)}
                      className="font-medium bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-white mr-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BarangMasukList;
