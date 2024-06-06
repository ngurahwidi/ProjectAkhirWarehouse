import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const EditBarangKeluar = () => {
  const [barang, setBarang] = useState(null);
  const [tanggal, setTanggal] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [customer, setCustomer] = useState(null);
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [daftarCustomer, setDaftarCustomer] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBarangKeluarById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/keluar/${id}`);
        setBarang(response.data.barang);
        setTanggal(new Date(response.data.tanggal).toISOString().split('T')[0]);
        setJumlah(response.data.jumlah);
        setCustomer(response.data.customer);

        const responseDaftarBarang = await axios.get('http://localhost:5000/products');
        setDaftarBarang(responseDaftarBarang.data);  
        
        const responseDaftarCustomer = await axios.get('http://localhost:5000/customers');
        setDaftarCustomer(responseDaftarCustomer.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };
    getBarangKeluarById();
  }, [id]);

  const updateBarangKeluar = async (e) => {
    e.preventDefault();
    try {
      const tanggalObj = new Date(tanggal);
      await axios.patch(`http://localhost:5000/keluar/${id}`, {
        id_barang: barang.id,
        tanggal: tanggalObj.toISOString(),
        jumlah: parseInt(jumlah),
        id_customer: customer.id,
      });
      swal({
        title: "Sukses!",
        text: "Berhasil Mengupdate Data",
        icon: "success",
        button: "Ok",
      });
      navigate("/barangKeluar");
    } catch (error) {
      console.error('Error updating the data', error);
      swal({
        title: "Gagal!",
        text: "Gagal Mengupdate Data",
        icon: "error",
        button: "Ok",
      });
    }
  };

  return (
    <div className='w-full mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-500'>
      <h1 className='font-bold text-lg'>Form Edit Barang Keluar</h1>
      <form onSubmit={updateBarangKeluar} className='my-10'>
        <div className='flex flex-col'>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>Nama Barang</label>
            <select 
              className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
              value={barang ? barang.id : ''}
              onChange={(e) => setBarang(daftarBarang.find((item) => item.id === parseInt(e.target.value)))}
            >
              <option value="">Pilih Barang</option>
              {daftarBarang.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>Tanggal</label>
            <input 
              type="date" 
              className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow' 
              value={tanggal} 
              onChange={(e) => setTanggal(e.target.value)} 
            />
          </div>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>Jumlah</label>
            <input 
              type="number" 
              className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow' 
              placeholder='Jumlah Barang' 
              value={jumlah} 
              onChange={(e) => setJumlah(e.target.value)} 
            />
          </div>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>Nama Customer</label>
            <select
              className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
              value={customer ? customer.id : ''}
              onChange={(e) => setCustomer(daftarCustomer.find((item) => item.id === parseInt(e.target.value)))}
            >
              <option value="">Pilih Customer</option>
              {daftarCustomer.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <button 
            type='submit' 
            className='w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBarangKeluar;
