import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import swal from "sweetalert";

const ScanQRCodeKeluar = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [tanggal, setTanggal] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [customer, setCustomer] = useState(null);
  const [daftarCustomer, setDaftarCustomer] = useState([]);
  const navigate = useNavigate();
  const qrCodeRef = useRef(null);

  // Fetch customers from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/customers");
        setDaftarCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        // Optionally, show an alert or message to inform the user of the error
      }
    };

    fetchCustomers();
  }, []);

  // Handle successful QR code scan
  const handleScanSuccess = useCallback(
    (decodedText, decodedResult) => {
      if (!isScanning) return;

      try {
        const parsedData = JSON.parse(decodedText);

        // Validate the required fields
        const isValidData =
          parsedData.id &&
          parsedData.Kode &&
          parsedData.Nama &&
          parsedData.Harga &&
          parsedData.Stok &&
          parsedData.Deskripsi;

        if (!isValidData) {
          swal({
            title: "Invalid QR Code",
            text: "The QR code does not contain the required data.",
            icon: "error",
            button: "OK",
          });
          setIsScanning(true);
          return;
        }

        setIsScanning(false); // Stop further scanning
        setScanResult(parsedData);
        setShowAlert(true); // Show alert
      } catch (error) {
        swal({
          title: "Invalid QR Code",
          text: "The QR code does not contain valid JSON.",
          icon: "error",
          button: "OK",
        });
        setIsScanning(true);
      }
    },
    [isScanning]
  );

  // Initialize QR code scanner on component mount
  useEffect(() => {
    if (isScanning && qrCodeRef.current) {
      const scanner = new Html5QrcodeScanner(
        qrCodeRef.current.id,
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(handleScanSuccess, handleScanFailure);

      return () => {
        scanner
          .clear()
          .catch((error) =>
            console.error("Failed to clear html5-qrcode scanner", error)
          );
      };
    }
  }, [isScanning, handleScanSuccess]);

  // Handle QR code scanning failure
  const handleScanFailure = (error) => {
    console.error("Error while scanning:", error);
    // Optionally, inform the user of the scanning error
  };

  // Save input data to the backend
  const saveInput = async (e) => {
    e.preventDefault();

    if (!scanResult) {
      swal({
        title: "Invalid QR Code",
        text: "Scan QR Code first before submitting.",
        icon: "error",
        button: "OK",
      });
      return;
    }

    if (!tanggal || !jumlah || !customer) {
      swal({
        title: "Missing Information",
        text: "Please fill in all required fields.",
        icon: "error",
        button: "OK",
      });
      return;
    }

    if (isNaN(jumlah) || jumlah <= 0) {
      swal({
        title: "Invalid Input",
        text: "Jumlah barang harus berupa angka positif.",
        icon: "error",
        button: "OK",
      });
      return;
    }

    try {
      const tanggalObj = new Date(tanggal);
      const dataToSubmit = {
        id_barang: parseInt(scanResult.id),
        tanggal: tanggalObj.toISOString(),
        jumlah: parseInt(jumlah),
        id_customer: parseInt(customer.id),
      };

      // Submit data to backend
      const response = await axios.post(
        "http://localhost:5000/keluar",
        dataToSubmit
      );

      swal({
        title: "Success!",
        text: "Data berhasil disimpan.",
        icon: "success",
        button: "OK",
      });
      navigate("/barangKeluar"); // Redirect to barangKeluar page
    } catch (error) {
      console.error("Error during request:", error);
      if (error.response && error.response.data && error.response.data.msg) {
        swal({
          title: "Error",
          text: error.response.data.msg,
          icon: "error",
          button: "OK",
        });
      } else {
        swal({
          title: "Error",
          text: "Terjadi kesalahan saat menambahkan barang keluar.",
          icon: "error",
          button: "OK",
        });
      }
    }
  };

  // Cancel scanning and reset state
  const handleCancel = () => {
    setShowAlert(false);
    setIsScanning(true);
  };

  // Helper function to safely access scanResult values
  const value = (key) => {
    if (!scanResult) return null;

    try {
      return scanResult[key];
    } catch (error) {
      console.error("Error accessing scan result value:", error);
      return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-500 relative grid gap-4">
      <div className="w-80">
        <a
          href="/barangKeluar/add"
          className="mb-8 text-center py-3 px-12 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
        >
          Manual
        </a>
      </div>
      <div>
        <h1 className="text-center font-bold text-lg mb-4">Scan QR Code</h1>

        {isScanning && (
          <div id="qr-reader" ref={qrCodeRef} style={{ width: "100%" }} />
        )}
      </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50  ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/6">
            <h2 className="font-bold text-lg text-center">Scan Result:</h2>
            <pre className="mt-4">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Field</th>
                    <th className="border border-gray-400 px-4 py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">Kode</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {value("Kode")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">Nama</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {value("Nama")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">Harga</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {value("Harga")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">Stok</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {value("Stok")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      Deskripsi
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {value("Deskripsi")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </pre>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Tanggal
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Tanggal"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Jumlah
              </label>
              <input
                type="number"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Jumlah"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                ID Customer
              </label>
              <select
                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                value={customer ? customer.id : ""}
                onChange={(e) =>
                  setCustomer(
                    daftarCustomer.find(
                      (item) => item.id === parseInt(e.target.value)
                    )
                  )
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

            <div className="flex gap-4">
              <button
                onClick={saveInput}
                className="w-full py-3 mt-4 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
              >
                Submit to Database
              </button>
              <button
                onClick={handleCancel}
                className="w-full py-3 mt-4 font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg border-red-500 hover:shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanQRCodeKeluar;
