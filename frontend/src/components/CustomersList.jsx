import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSwr, { useSWRConfig } from "swr";
import swal from "sweetalert";

const CustomersList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/customers");
    return response.data;
  };

  const { data } = useSwr("customers", fetcher);
  if (!data) return <h2>Loading....</h2>;
  const deleteCustomer = async (customerId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:5000/customers/${customerId}`);
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
           mutate("customers");
        } catch (error) {
          swal("eror di databse ",{
            icon: "error"
          })
        }
      } else {
        swal("Your imaginary file is safe!");
      }
    });
   
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="w-full">
        <Link
          to="/customers/add"
          className="bg-blue-500 hover:bg-blue-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add New
        </Link>
        <div className="relative shadow rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Nama</th>
                <th className="py-3 px-6">No Telepon</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((customer, index) => (
                <tr className="bg-white border-b" key={customer.id}>
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6">{customer.nama}</td>
                  <td className="py-3 px-6">{customer.no_hp}</td>
                  <td className="py-3 px-6">{customer.email}</td>
                  <td className="py-3 px-1 text-center">
                    <Link
                      to={`/customers/${customer.id}`}
                      className="font-medium bg-yellow-500 hover:bg-yellow-700 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCustomer(customer.id)}
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

export default CustomersList;
