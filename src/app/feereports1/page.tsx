"use client";
import React, { useState } from 'react';
import DuplicateFeeReceiptsForm from '@/components/fee/DuplicateFeeReceipts';
import DuplicateFeeReceiptsDetails from '@/components/fee/DuplicateFeeReceiptsDetails';
import DuplicateFeeReceiptsDetailsSelect from '@/components/fee/DuplicateFeeReceiptsDetailsSelect';
import Layout from '@/components/Sidemenu/Layout';

interface FormData {
  phoneNumber: string;
  name: string;
  hallticket: string;
  studentRollNo: string;
  batch: number;
  year: number;
  feeName: string;
  amount: number;
  academicId: number;
  category: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    name: '',
    hallticket: '',
    studentRollNo: '',
    batch: 2020,
    year: 3,
    feeName: 'Tuition Fee',
    amount: 20000,
    academicId: 21,
    category: 'Mandatory',
  });

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showDetailsSelect, setShowDetailsSelect] = useState<boolean>(false);

  const handleNext = () => {
    setShowDetails(true);
  };

  const handleSelect = () => {
    setShowDetailsSelect(true);
  };

  return (
    <Layout>
      <DuplicateFeeReceiptsForm onNext={handleNext} setFormData={setFormData} />
      {showDetails && <DuplicateFeeReceiptsDetails onSelect={handleSelect} />}
      {showDetailsSelect && <DuplicateFeeReceiptsDetailsSelect formData={formData} />}
    </Layout>
  );
};

export default Page;