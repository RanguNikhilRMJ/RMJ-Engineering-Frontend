"use client";

import React, { useState, useEffect } from "react";
import BonafideCertificate from "@/components/certificate/BonafideCertificate";
import { useSearchParams } from "next/navigation";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";

const BonafidePage = () => {
  const searchParams = useSearchParams();
  const rollNo = searchParams.get("studentrollno") || ""; // Provide a fallback value
  const [certificateData, setCertificateData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchBonafideData = async () => {
    if (!rollNo) {
      setErrorMessage("Roll number is required.");
      return;
    }
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/getBonifiedCertificates?studentRollNo=${rollNo}`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);

      if (fetchedData) {
        setCertificateData(fetchedData);
      } else {
        setCertificateData(null);
        setErrorMessage("No data found for the provided roll number.");
      }
    } catch (error) {
      console.error("Error fetching bonafide data:", error);
      setErrorMessage("An error occurred while fetching the data.");
      setCertificateData(null);
    }
  };

  useEffect(() => {
    if (rollNo) {
      fetchBonafideData();
    }
  }, [rollNo]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!certificateData) {
    return <div>Loading...</div>;
  }

  return (
    <BonafideCertificate
      collegeName={certificateData.collegeName || "G PULLAIAH COLLEGE OF ENGINEERING & TECHNOLOGY"}
      aggrigations={
        certificateData.aggrigations ||
        "(Approved by AICTE | NAAC Accreditation with 'A' Grade | Accredited by NBA (CSE, ECE & EEE) | Permanently Affiliated to JNTUA)"
      }
      address={
        certificateData.address ||
        "Nandikotkur Road, Venkayapalli (V), Kurnool - 518452, Andhra Pradesh"
      }
      certificateTitle="BONAFIDE CERTIFICATE"
      studentName={certificateData.studentName || ""}
      fatherName={certificateData.fatherName || ""}
      rollNo={rollNo}
      course={certificateData.course || ""}
      academicYear={certificateData.academicYear || ""}
      purpose={certificateData.purpose || ""}
      date={certificateData.date || ""}
    />
  );
};

export default BonafidePage;
