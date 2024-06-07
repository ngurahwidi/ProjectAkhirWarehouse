import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
        const responseBarang = await axios.get("http://localhost:5000/products");
        setDaftarBarang(responseBarang.data);

        const responseCustomer = await axios.get("http://localhost:5000/customers");
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
      alert("Harap isi semua field yang diperlukan");
      return;
    }

    if (isNaN(jumlah) || jumlah <= 0) {
      alert("Jumlah barang harus berupa angka positif");
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
      alert("Terjadi kesalahan saat menambahkan barang keluar");
      console.error(error);
    }
  };

  const wrapText = (text, maxWidth) => {
    const doc = new jsPDF();
    const words = text.split(' ');
    let lines = [];
    let currentLine = words[0];
  
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = doc.getTextWidth(currentLine + ' ' + word);
  
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
  
    lines.push(currentLine);
  
    return lines.join('\n');
  };
  
  const cetakPDF = async () => {
    try {
      // const responseBarangMasuk = await axios.get(`http://localhost:5000/inputs/${barang.id}`);
      // const supplier = responseBarangMasuk.data.supplier;
  
      const doc = new jsPDF();
      doc.text("Data Barang Keluar", doc.internal.pageSize.getWidth() / 2, 10, { align: "center" });
  
      // Table with smaller font size for descriptions
      const rows = [
        ['Nama Barang', barang.nama],
        ['Harga', barang.harga], // Menambahkan word wrapping untuk deskripsi
        // ['Nama Supplier', supplier.nama],
        ['Tanggal Keluar', tanggal],
        ['Nama Customer', customer.nama],
        ['Jumlah', jumlah],        
        ['Deskripsi', wrapText(barang.deskripsi, 180)],
      ];
      let y = 20;
  
      rows.forEach(([keterangan, data], index) => {
        doc.setFontSize(8);
        doc.text(keterangan, 10,y);
        doc.setFontSize(12);
        const dataDimensions = doc.getTextDimensions(data.toString());
        doc.text(data.toString(), 10,y + dataDimensions.h);    
        y += dataDimensions.h + 5;
      });
      
  
      // Large code box
      const codeX = 150;
      const codeY = 20;
      const codeWidth = 50;
      const codeHeight = 30;
  
      doc.setFontSize(10);
      doc.text("Kode", codeX, codeY - 5, { align: "center" }); // Menyertakan parameter align: "center" untuk posisi teks "Kode"
      doc.setFontSize(35);
      const codeDimensions = doc.getTextDimensions(barang.kode); // Mengukur dimensi teks kode
      const codeCenterX = codeX + codeWidth / 2; // Menentukan pusat horisontal kotak kode
      const codeCenterY = codeY + codeHeight / 2; // Menentukan pusat vertikal kotak kode
      doc.text(barang.kode, codeCenterX - codeDimensions.w / 2, codeCenterY + codeDimensions.h / 4); // Mengatur posisi teks kode agar terpusat

      doc.setLineWidth(1);
      doc.rect(codeX, codeY, codeWidth, codeHeight);
  
      doc.save(`data_barang_keluar_${barang.nama}.pdf`);
    } catch (error) {
      alert("Terjadi kesalahan saat mencetak PDF");
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
                setBarang(daftarBarang.find((item) => item.id === parseInt(e.target.value)))
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
                setCustomer(daftarCustomer.find((item) => item.id === parseInt(e.target.value)))
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
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
          >
            Submit
          </button>
          <button
            type="button"
            className="w-full py-3 mt-4 font-bold text-white bg-green-600 hover:bg-green-500 rounded-lg border-green-500 hover:shadow"
            onClick={cetakPDF}
          >
            Cetak PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBarangKeluar;
