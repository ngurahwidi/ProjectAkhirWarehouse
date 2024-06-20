import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSwr, { useSWRConfig } from "swr";
import swal from "sweetalert";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import ReactDOM from "react-dom"; // Import ReactDOM for rendering
import QRCodeLib from "qrcode";

const BarangMasukList = () => {
  const { mutate } = useSWRConfig();

  // Fetch data function for inputs
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/inputs");
    return response.data;
  };

  // Fetch data for inputs using useSWR hook
  const { data } = useSwr("inputs", fetcher);

  // Loading state while fetching data
  if (!data) return <h2>Loading....</h2>;

  // Function to delete input
  const deleteInputs = async (inputsId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:5000/inputs/${inputsId}`);
          swal("Poof! Your file has been deleted!", {
            icon: "success",
          });
          mutate("inputs");
        } catch (error) {
          swal("Error deleting input", {
            icon: "error",
          });
        }
      } else {
        swal("Your file is safe!");
      }
    });
  };

  // Function to view input information
  const viewInputInfo = async (inputs) => {
    // Fetch product details (including harga and deskripsi) based on inputs.barang.id
    const productResponse = await axios.get(
      `http://localhost:5000/products/${inputs.barang.id}`
    );
    const product = productResponse.data;

    // Construct QR code value as JSON
    const qrCodeValue = JSON.stringify({
      Barang: product.nama,
      Harga: product.harga,
      Deskripsi: product.deskripsi,
      Supplier: inputs.supplier.nama,
      Jumlah: inputs.jumlah,
      Tanggal: inputs.tanggal,
    });

    // Create a container element to hold the information and QR code
    const container = document.createElement("div");
    container.style.textAlign = "left";

    // Render information and QR code inside the container
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
            <strong>Barang:</strong> {product.nama}
          </p>
          <p>
            <strong>Harga:</strong> {product.harga}
          </p>
          <p>
            <strong>Deskripsi:</strong> {product.deskripsi}
          </p>
          <p>
            <strong>Supplier:</strong> {inputs.supplier.nama}
          </p>
          <p>
            <strong>Jumlah:</strong> {inputs.jumlah}
          </p>
          <p>
            <strong>Tanggal:</strong> {inputs.tanggal}
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <QRCode value={qrCodeValue} size={128} />
        </div>
      </div>,
      container
    );

    // Show SweetAlert dialog with information and QR code
    swal({
      title: "Input Information",
      content: container,
      buttons: {
        print: {
          text: "Print Info",
          className: "bg-green-500",
          value: "print",
        },
        close: "Close",
      },
    }).then((value) => {
      if (value === "print") {
        generatePDF(product, inputs, qrCodeValue);
      }
    });
  };

  // Function to generate PDF
  const generatePDF = (product, inputs, qrCodeValue) => {
    const { nama, harga, deskripsi } = product;
    const { supplier, jumlah, tanggal } = inputs;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // Set font style to bold for the title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Input Information", centerX, 15, { align: "center" });

    // Reset font style and size
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add input information to the PDF
    doc.text(`Barang: ${nama}`, 14, 30);
    doc.text(`Harga: ${harga}`, 14, 40);
    doc.text(`Deskripsi: ${deskripsi}`, 14, 50);
    doc.text(`Supplier: ${supplier.nama}`, 14, 60);
    doc.text(`Jumlah: ${jumlah}`, 14, 70);
    doc.text(`Tanggal: ${tanggal}`, 14, 80);

    // Generate QR code as base64 using qrcode library
    QRCodeLib.toDataURL(qrCodeValue, { width: 128, margin: 2 }, (err, url) => {
      if (err) return console.error(err);

      // Add QR code to the PDF
      doc.addImage(url, "JPEG", pageWidth - 64, 25, 50, 50); // Position the QR code
      doc.save(`${nama}-masuk_details.pdf`); // Save the PDF with barang.nama as the filename
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
                    <button
                      onClick={() => viewInputInfo(inputs)}
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

export default BarangMasukList;
