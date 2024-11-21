"use client"
import TransferCertificate from '@/components/certificate/TransferCertificate';
import React, { useState, useEffect } from "react";
import { fetchCardDetailstoken } from "@/modules/apitoken";
import { DIGITAL_CAMPUS_BASE_URL } from "@/modules/apiConfig";
import { useParams, useSearchParams } from 'next/navigation'

export default function TransferCertificatePage() {
  const [studentData, setStudentData] = useState<any>(null); // To hold API response data
  const [transferCertificate, setTransferCertificate] = useState<any>(null); // To hold API response data

  const searchParams = useSearchParams()
  const studentrollno = searchParams.get('studentrollno')

  const getFunc = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/getByStudentRollNoTC?studentrollno=24ATA05L50`;
      const data = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);
      if (data.length > 0) {
        setTransferCertificate(data); // Store the fetched data
        console.log(data); // Logging data directly to check the response
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const tCFunc = async () => {
    try {
      const token = localStorage.getItem("token") || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/studentOrganizationInfo?studentrollno=24ATA05L50`;
      const data = await fetchCardDetailstoken(apiEndpoint, "GET", null, token);
      if (data.length > 0) {
        setStudentData(data); 
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
      getFunc(); 
      tCFunc();
  }, []); 

  return (
    <TransferCertificate
    collegeName={studentData?.[0]?.organisationName || ''}
    //
    organisationName      = "G.PULLAIAH COLLEGE OF ENGINEERING & TECHNOLOGY (Autonomous)( Code: PCEK )"
    organisationBrandName = "GPCET"
    organisationNAAC      = "Accredited by NAAC with ‘A’ Grade"
    organisationUGC       = "(Recognized by UGC under 2(f) & 12(B) and ISO 9001:2008 Certified Institution)"
    organisationAICTE     = "Approved by AICTE, New Delhi & Permanently Affiliated to JNTUA, Ananthapuramu"
    organisationAddress   = "Nandikotkur Road, Venkayapalli (V), Kurnool - 518452, Andhra Pradesh"
    //
    certificateTitle="TRANSFER CERTIFICATE"
    studentName={studentData?.[0]?.name || ''}
    admissionNumber={studentData?.[0]?.studentrollno || ''}
    branch={studentData?.[0]?.branchName || ''}
    gender={studentData?.[0]?.gender || ''}
    fatherName={studentData?.[0]?.fathername || ''}
    nationalityAndReligion={studentData?.[0]?.region || ''}
    categoryGroup={studentData?.[0]?.caste || ''}
    dob={studentData?.[0]?.dateofbirth || ''}
    dateOfAdmission={studentData?.[0]?.dateofjoin || ''}                   
    admissionClass="I B.Tech"
    leavingClass="IV B.Tech & Course Completed"
    qualifiedForPromotion={transferCertificate?.[0]?.qualifiedforheigherclass || ''}
    feesPaid={transferCertificate?.[0]?.feedue || ''}  
    dateOfLeaving={transferCertificate?.[0]?.dateofleft || ''}
    applicationDate=  {transferCertificate?.[0]?.dateofapplicationtransfer || ''}
    dateOfCertificate=   {transferCertificate?.[0]?.dateofcertification || ''}
      // dateOfLeaving="18/05/2024"{transferCertificate[0].dateofleft}
      // applicationDate="12/06/2024"{transferCertificate[0].dateofapplicationtransfer}
      // dateOfCertificate="14/06/2024"{transferCertificate[0].dateofcertification}
      conduct={transferCertificate?.[0]?.conduct || ''}  
      tcnumber={transferCertificate?.[0]?.tcnumber || ''}  
    />
  );
}
