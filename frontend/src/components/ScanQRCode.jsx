import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import swal from "sweetalert";

const ScanQRCode = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const qrCodeRef = useRef(null);

  const handleScanSuccess = useCallback(
    (decodedText, decodedResult) => {
      if (!isScanning) return;

      try {
        const parsedData = JSON.parse(decodedText);

        // Validate the required fields
        const isValidData =
          parsedData.id_barang &&
          parsedData.tanggal &&
          parsedData.jumlah &&
          parsedData.id_suppliers;

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
        setScanResult(decodedText);
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

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(handleScanSuccess, handleScanFailure);

      return () => {
        scanner
          .clear()
          .catch((error) =>
            console.error("Failed to clear html5-qrcode", error)
          );
      };
    }
  }, [isScanning, handleScanSuccess]);

  const handleScanFailure = (error) => {
    console.error("Error while scanning:", error);
  };

  const handleSubmitToDatabase = async () => {
    try {
      const parsedData = JSON.parse(scanResult);
      if (!parsedData) {
        alert("No scan result available.");
        return;
      }

      await axios.post("http://localhost:5000/inputs", parsedData);
      swal({
        title: "Success!",
        text: "Data successfully added to the database.",
        icon: "success",
        button: "OK",
      });
      setShowAlert(false); // Hide alert
      navigate("/barangMasuk");
    } catch (error) {
      alert("Failed to add data to the database. Please try again.");
      console.error("Error while submitting data:", error);
    }
  };

  const handleCancel = () => {
    setShowAlert(false); // Hide alert
    setIsScanning(true); // Restart scanning
  };
  const value = (key) => {
    if (!scanResult) return null; // Jika scanResult tidak ada, kembalikan null

    try {
      const parsedData = JSON.parse(scanResult); // Parse scanResult menjadi objek JavaScript
      return parsedData[key]; // Mengembalikan nilai yang sesuai dengan kunci (key)
    } catch (error) {
      console.error("Error parsing scan result:", error);
      return null; // Jika terjadi kesalahan dalam parsing, kembalikan null
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-500 relative">
      <h1 className="text-center font-bold text-lg">Scan QR Code</h1>
      {isScanning && (
        <div id="qr-reader" ref={qrCodeRef} style={{ width: "100%" }} />
      )}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg text-center">Scan Result:</h2>
            <pre className="mt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Field</th>
                    <th className="border border-gray-400 px-4 py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      ID Barang
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {value("id_barang")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      Tanggal
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {value("tanggal")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">Jumlah</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {value("jumlah")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      ID Suppliers
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {value("id_suppliers")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </pre>

            <button
              onClick={handleSubmitToDatabase}
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
      )}
    </div>
  );
};

export default ScanQRCode;
