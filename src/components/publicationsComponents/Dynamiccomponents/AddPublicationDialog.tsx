import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import TextFieldComponent from './TextFieldComponent';
 
interface AddPublicationDialogProps {
  open: boolean;
  handleClose: () => void;
  selectedEndpoint: string;
  publicationData: { [key: string]: string | number };
  setPublicationData: React.Dispatch<React.SetStateAction<{ [key: string]: string | number }>>;
  handleSubmit: () => void;
  endpointUrl: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;  // Error handler from parent
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;  // Success handler from parent
}
 
const AddPublicationDialog: React.FC<AddPublicationDialogProps> = ({
  open,
  handleClose,
  selectedEndpoint,
  publicationData,
  setPublicationData,
  handleSubmit,
  endpointUrl,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [formFields, setFormFields] = useState<string[]>([]); // Array to hold field names
  const [fieldTypes, setFieldTypes] = useState<{ [key: string]: 'string' | 'number' | 'date' }>({}); // Store field types
 
  useEffect(() => {
    // Dynamically set form fields and their types based on the endpoint selected
    if (selectedEndpoint === '/publications/Updateorsave') {
      setFormFields([
        'facultyid', 'year', 'branchid', 'sem', 'subjectcode', 'section',
        'assessmenttools', 'acadamicid', 'verifiedstatus',
      ]);
      setFieldTypes({
         facultyid: 'string', year: 'number', branchid: 'number', sem: 'number',
        subjectcode: 'string', section: 'string', assessmenttools: 'string', acadamicid: 'number',
        verifiedstatus: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationsGainingITUpdateorsave') {
      setFormFields([
         'typeofcertificationprogram', 'certificationprogramtitle', 'certificationprogramduration',
        'uploadcertificate', 'certificationprogram', 'certificationprogramamount', 'facultyid',
        'certificationdate', 'certificationtype', 'verificationby', 'verifiedstatus',
      ]);
      setFieldTypes({
         typeofcertificationprogram: 'string', certificationprogramtitle: 'string',
        certificationprogramduration: 'string', uploadcertificate: 'string', certificationprogram: 'string',
        certificationprogramamount: 'number', facultyid: 'string', certificationdate: 'date',
        certificationtype: 'string', verificationby: 'string', verifiedstatus: 'string',
      });
    } else if (selectedEndpoint === '/publications/publicationproductUpdateorsave') {
      setFormFields([
         'title', 'producttype', 'date', 'datetime', 'members', 'condetedby', 'proof',
        'verifiedstatus', 'facultyid',
      ]);
      setFieldTypes({
       title: 'string', producttype: 'string', date: 'date', datetime: 'date', members: 'string',
        condetedby: 'string', proof: 'string', verifiedstatus: 'string', facultyid: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationsCourtUpdateorsave') {
      setFormFields([
        'title', 'court', 'decideddate', 'reporter1', 'reporter2', 'reporter3', 'docketid',
        'facultyid', 'verificationby', 'verifiedstatus',
      ]);
      setFieldTypes({
         title: 'string', court: 'string', decideddate: 'date', reporter1: 'string',
        reporter2: 'string', reporter3: 'string', docketid: 'string', facultyid: 'string', verificationby: 'string',
        verifiedstatus: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationsContentUpdateorsave') {
      setFormFields([
         'contenttitle', 'type', 'datetime', 'acadamicid', 'facultyid', 'verifiedby',
        'verifiedstatus', 'verifieddatetime',
      ]);
      setFieldTypes({
         contenttitle: 'string', type: 'string', datetime: 'date', acadamicid: 'number',
        facultyid: 'string', verifiedby: 'string', verifiedstatus: 'string', verifieddatetime: 'date',
      });
    } else if (selectedEndpoint === '/publications/PublicationsConferenceUpdateorsave') {
      setFormFields([
         'title', 'authors', 'publicationdate', 'conference', 'volume', 'issue', 'pages',
        'facultyid', 'conferencetype', 'issnnumber', 'doinumber', 'categorytype', 'verificationby',
        'verifiedstatus', 'scopusurl', 'uploadfileurl',
      ]);
      setFieldTypes({
         title: 'string', authors: 'string', publicationdate: 'date', conference: 'string',
        volume: 'string', issue: 'string', pages: 'string', facultyid: 'string', conferencetype: 'string',
        issnnumber: 'string', doinumber: 'string', categorytype: 'string', verificationby: 'string',
        verifiedstatus: 'string', scopusurl: 'string', uploadfileurl: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationsChapterUpdateorsave') {
      setFormFields([
         'title', 'authors', 'publicationdate', 'book', 'volume', 'issue', 'pages', 'publisher',
        'facultyid', 'verificationby', 'verifiedstatus', 'link', 'authornumber',
      ]);
      setFieldTypes({
         title: 'string', authors: 'string', publicationdate: 'date', book: 'string',
        volume: 'string', issue: 'string', pages: 'string', publisher: 'string', facultyid: 'string',
        verificationby: 'string', verifiedstatus: 'string', link: 'string', authornumber: 'number',
      });
    } else if (selectedEndpoint === '/publications/PublicationsCertificationUpdateorsave') {
      setFormFields([
       'typeofcertificationprogram', 'certificationprogramtitle', 'certificationprogramduration',
        'uploadcertificate', 'certificationprogram', 'certificationprogramamount', 'facultyid',
        'certificationdate', 'certificationtype', 'certificationstatus', 'expecteddate', 'verificationby',
        'verifiedstatus', 'uploadfileurl',
      ]);
      setFieldTypes({
        typeofcertificationprogram: 'string', certificationprogramtitle: 'string',
        certificationprogramduration: 'string', uploadcertificate: 'string', certificationprogram: 'string',
        certificationprogramamount: 'number', facultyid: 'string', certificationdate: 'date',
        certificationtype: 'string', certificationstatus: 'string', expecteddate: 'date', verificationby: 'string',
        verifiedstatus: 'string', uploadfileurl: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationsCertificationRegistrationUpdateorsave') {
      setFormFields([
         'title', 'researchtype', 'description', 'expectedfromdate', 'certificateprogramrelatedto',
        'expectedtodate', 'facultyid', 'hodremark', 'principalremark', 'supervisorremark', 'hodstatus',
        'principalstatus', 'supervisorstatus',
      ]);
      setFieldTypes({
         title: 'string', researchtype: 'string', description: 'string', expectedfromdate: 'date',
        certificateprogramrelatedto: 'number', expectedtodate: 'date', facultyid: 'string', hodremark: 'string',
        principalremark: 'string', supervisorremark: 'string', hodstatus: 'string', principalstatus: 'string',
        supervisorstatus: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationsBookUpdateorsave') {
      setFormFields([
       'title', 'authors', 'publicationdate', 'volume', 'issue', 'pages', 'facultyid', 'verificationby',
        'verifiedstatus', 'authornumber', 'link', 'bsearchorglink',
      ]);
      setFieldTypes({
        title: 'string', authors: 'string', publicationdate: 'date', volume: 'string',
        issue: 'string', pages: 'string', facultyid: 'string', verificationby: 'string', verifiedstatus: 'string',
        authornumber: 'number', link: 'string', bsearchorglink: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationSeminarsUpdateorsave') {
      setFormFields([
         'typeofseminars', 'seminarstitle', 'locationoftheseminars', 'seminarsduration', 'fundingagencytotheseminars',
        'seminarsregistrationamount', 'uploadseminarsproceeding', 'seminarsspeakers', 'uploadpptordocrelatedtotheseminars',
        'facultyid', 'seminarsdate', 'verificationby', 'verifiedstatus',
      ]);
      setFieldTypes({
       typeofseminars: 'string', seminarstitle: 'string', locationoftheseminars: 'string',
        seminarsduration: 'string', fundingagencytotheseminars: 'string', seminarsregistrationamount: 'number',
        uploadseminarsproceeding: 'string', seminarsspeakers: 'string', uploadpptordocrelatedtotheseminars: 'string',
        facultyid: 'string', seminarsdate: 'date', verificationby: 'string', verifiedstatus: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationResearchProjectUpdateorsave') {
      setFormFields([
        'title', 'researchagency', 'amount', 'date', 'datetime', 'status', 'facultyid', 'verifiedstatus',
        'proof', 'positionnumber',
      ]);
      setFieldTypes({
        id: 'number', title: 'string', researchagency: 'string', amount: 'number', date: 'date', datetime: 'date',
        status: 'string', facultyid: 'string', verifiedstatus: 'string', proof: 'string', positionnumber: 'string',
      });
    } else  if (selectedEndpoint === '/publications/PublicationResearchOutcomeUpdateorsave') {
      setFormFields([ 'researchid', 'description', 'date', 'datetime', 'facultyid', 'verifiedstatus', 'proof']);
      setFieldTypes({
        researchid: 'number',
        description: 'string',
        date: 'date',
        datetime: 'date',
        facultyid: 'string',
        verifiedstatus: 'string',
        proof: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationProjectStatusUpdateorsave') {
      setFormFields(['projectid', 'batch', 'status', 'facultyid', 'acadamicid']);
      setFieldTypes({
        projectid: 'string',
        batch: 'number',
        status: 'string',
        facultyid: 'string',
        acadamicid: 'number',
      });
    } else if (selectedEndpoint === '/publications/PublicationICTToolsUpdateorsave') {
      setFormFields([
         'facultyid', 'branchid', 'year', 'sem', 'subjectcode', 'section', 'icttools', 'acadamicid',
      ]);
      setFieldTypes({
        facultyid: 'string',
        branchid: 'number',
        year: 'number',
        sem: 'number',
        subjectcode: 'string',
        section: 'string',
        icttools: 'string',
        acadamicid: 'number',
      });
    } else if (selectedEndpoint === '/publications/PublicationFacultyAwardsUpdateorsave') {
      setFormFields([
         'facultyid', 'awards', 'date', 'awardtype', 'uploadproof', 'verifiedstatus', 'verificationby',
      ]);
      setFieldTypes({
        facultyid: 'string',
        awards: 'string',
        date: 'date',
        awardtype: 'string',
        uploadproof: 'string',
        verifiedstatus: 'string',
        verificationby: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationFDPUpdateUpdateorsave') {
      setFormFields([
         'typeoffdp', 'fdptitle', 'locationofthefdp', 'fdpduration', 'fundingagencytothefdp',
        'fdpregistrationamount', 'uploadfdpproceeding', 'fdpspeakers', 'uploadpptordocrelatedtothefdp',
        'facultyid', 'fdpdate', 'verificationby', 'verifiedstatus',
      ]);
      setFieldTypes({
        typeoffdp: 'string',
        fdptitle: 'string',
        locationofthefdp: 'string',
        fdpduration: 'number',
        fundingagencytothefdp: 'string',
        fdpregistrationamount: 'number',
        uploadfdpproceeding: 'string',
        fdpspeakers: 'string',
        uploadpptordocrelatedtothefdp: 'string',
        facultyid: 'string',
        fdpdate: 'date',
        verificationby: 'string',
        verifiedstatus: 'string',
      });
    } else if (selectedEndpoint === '/publications/PublicationConsultancyUpdateorsave') {
      setFormFields([
      'title', 'consultancyname', 'amount', 'date', 'datetime', 'facultyid', 'verifiedstatus', 'proof',
      ]);
      setFieldTypes({
        title: 'string',
        consultancyname: 'string',
        amount: 'number',
        date: 'date',
        datetime: 'date',
        facultyid: 'string',
        verifiedstatus: 'string',
        proof: 'string',
      });
    }
    
  }, [selectedEndpoint]); 
  
  const submitPublication = async () => {
    if (Object.values(publicationData).some((value) => !value)) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
 
    const formattedData = { ...publicationData };
 
    if (formattedData.certificationdate) {
      formattedData.certificationdate = new Date(formattedData.certificationdate as string).toISOString();
    }
    if (formattedData.date) {
      formattedData.date = new Date(formattedData.date as string).toISOString();
    }
 
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('User is not authenticated.');
      return;
    }
 
    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });
 
      if (response.ok) {
        const result = await response.json();
        setSuccessMessage('Publication added successfully!');
        setPublicationData({});
        handleClose();
      } else {
        const errorResult = await response.json();
        setErrorMessage(errorResult.message || 'Failed to add publication.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the publication.');
    }
  };
 
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Publication</DialogTitle>
      <DialogContent>
        {formFields.map((field) => (
          <TextFieldComponent
            key={field}
            label={field}
            value={String(publicationData[field] || '')}
            onChange={(e) => setPublicationData({ ...publicationData, [field]: e.target.value })}
            type={fieldTypes[field] || 'text'}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={submitPublication} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default AddPublicationDialog;
 
 