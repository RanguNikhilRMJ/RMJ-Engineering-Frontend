"use client"
import React from 'react';
import BonafideCertificate from '@/components/certificate/BonafideCertificate';
import Layout from "@/components/Sidemenu/Layout";

const ExamplePage = () => {
  return (
    <Layout>

    <BonafideCertificate
      collegeName="G PULLAIAH COLLEGE OF ENGINEERING & TECHNOLOGY"
      aggrigations="(Approved by AICTE | NAAC Accreditation with ‘A’ Grade |
      Accredited by NBA (CSE, ECE & EEE) | Permanently Affiliated to JNTUA)"
      address="Nandikotkur Road, Venkayapalli (V), Kurnool - 518452, Andhra Pradesh"
      certificateTitle="BONAFIDE CERTIFICATE"
      studentName="GOLLA LAKSHMI KANTH"
      fatherName="GOLLA BALEESWARAIAH"
      rollNo="21AT1A3516"
      course="IV B.Tech CSE"
      academicYear="2024 to 2025"
      purpose="PASSPORT"
      date="21/09/2024"
    />
    </Layout>

  );
};

export default ExamplePage;
