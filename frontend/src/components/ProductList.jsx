import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSwr, { useSWRConfig } from "swr";
import swal from "sweetalert";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";
import QRCodeLib from "qrcode"; // Import qrcode library
import ReactDOM from "react-dom"; // Import ReactDOM for rendering

const ProductList = () => {
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  };

  const { data, error } = useSwr("products", fetcher);

  if (error) return <h2>Failed to load products</h2>;

  
  if (!data) return <h2>Loading....</h2>;

  
  const deleteProduct = async (productId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:5000/products/${productId}`);
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          mutate("products");
        } catch (error) {
          swal("Error deleting product", {
            icon: "error",
          });
        }
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const viewProductInfo = (product) => {
    const qrCodeValue = JSON.stringify({
      id : product.id,
      Kode: product.kode,
      Nama: product.nama,
      Harga: product.harga,
      Stok: product.stok,
      Deskripsi: product.deskripsi,
    });

    const container = document.createElement("div");
    container.style.textAlign = "left";

    ReactDOM.render(
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "space-between",
          width: "80%",
          margin: "auto",
        }}
      >
        <div>
          <p>
            <strong>ID:</strong> {product.id}
          </p>
          <p>
            <strong>Kode:</strong> {product.kode}
          </p>
          <p>
            <strong>Nama:</strong> {product.nama}
          </p>
          <p>
            <strong>Harga:</strong> {product.harga}
          </p>
          <p>
            <strong>Stok:</strong> {product.stok}
          </p>
          <p>
            <strong>Deskripsi:</strong> {product.deskripsi}
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <QRCode value={qrCodeValue} size={128} />
        </div>
      </div>,
      container
    );

    swal({
      title: "Product Information",
      content: container, 
      buttons: {
        print: {
          text: "Print Info",
          className: "bg-green-500 ",
          value: "print",
        },
        close: "Close",
      },
    }).then((value) => {
      if (value === "print") {
        generatePDF(product, qrCodeValue);
      }
    });
  };

  const generatePDF = (product, qrCodeValue) => {
    const { kode, nama, harga, stok, deskripsi } = product;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24); 
    doc.text("Product Information", centerX, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    doc.text(`Product: ${nama}`, 18, 30);
    doc.text(`Kode: ${kode}`, 18, 40);
    doc.text(`Harga: ${harga}`, 18, 50);
    doc.text(`Stok: ${stok}`, 18, 60);
    doc.text(`Deskripsi: ${deskripsi}`, 18, 70);

    QRCodeLib.toDataURL(qrCodeValue, { width: 128, margin: 2 }, (err, url) => {
      if (err) return console.error(err);

      doc.addImage(url, "JPEG", pageWidth - 68, 25, 50, 50); // Position the QR code
      doc.save(`${nama}_details.pdf`);
    });
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="w-full">
        <Link
          to="/add"
          className="bg-blue-500 hover:bg-blue-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add New
        </Link>
        <div className="relative shadow rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Kode</th>
                <th className="py-3 px-6">Nama</th>
                <th className="py-3 px-6">Harga</th>
                <th className="py-3 px-6">Stok</th>
                <th className="py-3 px-6">Deskripsi</th>
                <th className="py-3 px-1 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr className="bg-white border-b" key={product.id}>
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6">{product.kode}</td>
                  <td className="py-3 px-6">{product.nama}</td>
                  <td className="py-3 px-6">{product.harga}</td>
                  <td className="py-3 px-6">{product.stok}</td>
                  <td className="py-3 px-6">{product.deskripsi}</td>
                  <td className="py-3 px-1 text-center">
                    <Link
                      to={`/edit/${product.id}`}
                      className="font-medium bg-yellow-500 hover:bg-yellow-700 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="font-medium bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-white mr-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => viewProductInfo(product)}
                      className="font-medium bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-white"
                    >
                      View Info
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

export default ProductList;
