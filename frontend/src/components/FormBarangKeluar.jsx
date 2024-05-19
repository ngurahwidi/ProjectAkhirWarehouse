import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'

const FormBarangKeluar = () => {
  const [idBarang, setIdBarang] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [idCustomer, setIdCustomer] = useState('');
  const navigate = useNavigate();

  const saveOutput = async (e) => {
    e.preventDefault();
    if (!idBarang || !jumlah || !idCustomer) {
      alert('Harap isi semua field yang diperlukan');
      return;
    }
  
    if (isNaN(jumlah) || jumlah <= 0) {
      alert('Jumlah barang harus berupa angka positif');
      return;
    }
  
    try {
      const tanggalObj = new Date(tanggal);
      await axios.post('http://localhost:5000/keluar', {
        id_barang: parseInt(idBarang),
        tanggal: tanggalObj.toISOString(),
        jumlah: parseInt(jumlah),
        id_customer: parseInt(idCustomer),
      });
      swal({
        title: "Sukses!",
        text: "Berhasil Menyimpan Data Barang Keluar",
        icon: "success",
        button: "Ok",
      });
      navigate("/products") //barangKeluar
    } catch (error) {
      alert('Terjadi kesalahan saat menambahkan barang keluar');
      console.error(error);
    }
  };

  return (
    <div className='max-w-xl mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-500'>
      <h1 className='text-center font-bold text-lg'>Form Tambah Barang Keluar</h1>
      <form onSubmit={saveOutput} className='my-10'>
        <div className='flex flex-col'>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>ID Barang</label>
            <input
              type="text"
              className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
              placeholder='ID Barang'
              value={idBarang}
              onChange={(e) => setIdBarang(e.target.value)}
            />
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
            <label className='font-bold text-slate-700'>ID Customer</label>
            <input
              type="text"
              className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
              placeholder='ID Customer'
              value={idCustomer}
              onChange={(e) => setIdCustomer(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBarangKeluar;
