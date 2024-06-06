import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const EditBarangMasuk = () => {
  const [barang, setBarang] = useState(null);
  const [tanggal, setTanggal] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [supplier, setSupplier] = useState(null);
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [daftarSupplier, setDaftarSupplier] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBarangMasukById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/inputs/${id}`);
        setBarang(response.data.barang);
        setTanggal(new Date(response.data.tanggal).toISOString().split('T')[0]);
        setJumlah(response.data.jumlah);
        setSupplier(response.data.supplier);

        const responseDaftarBarang = await axios.get('http://localhost:5000/products');
        setDaftarBarang(responseDaftarBarang.data);

        const responseDaftarSupplier = await axios.get('http://localhost:5000/suppliers');
        setDaftarSupplier(responseDaftarSupplier.data);

      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };
    getBarangMasukById();
  }, [id]);

  const updateBarangMasuk = async (e) => {
    e.preventDefault();
    try {
      const tanggalObj = new Date(tanggal);
      await axios.patch(`http://localhost:5000/inputs/${id}`, {
      id_barang: barang.id,
      tanggal: tanggalObj.toISOString(),
      jumlah: parseInt(jumlah),
      id_suppliers: supplier.id,
      });
      swal({
        title: "Sukses!",
        text: "Berhasil Mengupdate Data",
        icon: "success",
        button: "Ok",
      });
      navigate("/barangMasuk");
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
      <h1 className='font-bold text-lg'>Form Edit Barang Masuk</h1>
      <form onSubmit={updateBarangMasuk} className='my-10'>
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
            <label className='font-bold text-slate-700'>Nama Supplier</label>
            <select
              className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
              value={supplier ? supplier.id : ''}
              onChange={(e) => setSupplier(daftarSupplier.find((item) => item.id === parseInt(e.target.value)))}
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
            type='submit'
            className='w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBarangMasuk;
