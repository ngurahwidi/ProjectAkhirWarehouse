import {React, useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'

const EditProduct = () => {
  const [kode, setKode] = useState("")
  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState("")
  const [stok, setStok] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(()=> {
    const getProductById = async ()=> {
        const response = await axios.get(`http://localhost:5000/products/${id}`)
        setKode(response.data.kode)
        setNama(response.data.nama)
        setHarga(response.data.harga)
        setStok(response.data.stok)
        setDeskripsi(response.data.deskripsi)
    }
    getProductById()
  }, [id])

  const updateProduct = async (e)=>{
    e.preventDefault()
    await axios.patch(`http://localhost:5000/products/${id}`, {
      kode: kode,
      nama: nama,
      harga: parseInt(harga),
      stok: parseInt(stok),
      deskripsi: deskripsi,
    })
    swal({
      title: "Sukses!",
      text: "Berhasil Mengupdate Data",
      icon: "success",
      button: "Ok",
    });
    navigate("/products")
  }
  return (
    <div className='w-full mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-500'>
      <h1 className='font-bold text-lg'>Form Edit Barang</h1>
      <form onSubmit={updateProduct} className='my-10'>
        <div className='flex flex-col'>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>Kode</label>
            <input type="text" 
            className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
            placeholder='Kode barang'
            value={kode}
            onChange={(e)=> setKode(e.target.value)}
            />
          </div>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>Nama</label>
            <input type="text" 
            className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
            placeholder='Nama barang'
            value={nama}
            onChange={(e)=> setNama(e.target.value)}
            />
          </div>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>Harga</label>
            <input type="text" 
            className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
            placeholder='Harga barang'
            value={harga}
            onChange={(e)=> setHarga(e.target.value)}
            />
          </div>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>Stok</label>
            <input type="text" 
            className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
            placeholder='Stok barang'
            value={stok}
            onChange={(e)=> setStok(e.target.value)}
            />
          </div>
          <div className='mb-5'>
            <label className='font-bold text-slate-700'>Deskripsi</label>
            <input type="text" 
            className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
            placeholder='Deskripsi barang'
            value={deskripsi}
            onChange={(e)=> setDeskripsi(e.target.value)}
            />
          </div>
          <button 
          type='submit' 
          className='w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow'>
          Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct