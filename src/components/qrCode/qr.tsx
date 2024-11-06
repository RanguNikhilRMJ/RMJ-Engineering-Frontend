import React from 'react';
import Barcode from 'react-barcode';

function QrCodeComponent({ data }) {
  // Extract the name and code from the input data
  return (
    <>
    <div style={{ display: "flex", gap: "20px",flexWrap:"wrap" }}>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <div >
          <Barcode value={item.code}
           width={1} 
           height={50}  
          />
          </div>
        </div>
      ))}
    </div>
  </>
    );
}

export default QrCodeComponent;
