import React from 'react';
import Barcode from 'react-barcode';

// Define the type for each item in the data array
interface DataItem {
  name: string;
  code: string;
}

// Define the component props using the DataItem type
interface QrCodeComponentProps {
  data: DataItem[];
}

const QrCodeComponent: React.FC<QrCodeComponentProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <div>
            <Barcode value={item.code} width={1} height={50} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QrCodeComponent;