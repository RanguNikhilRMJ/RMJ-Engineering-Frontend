"use client"
import React from 'react';
import CollegeFeeStructure from '@/components/pagescomponents/FeeComponents/CollegeFeeStructure';
import Layout from '@/components/Sidemenu/Layout';
import PageTitle from '@/components/PageTitle';
const Page: React.FC = () => {
  
  return (
    <>
    <Layout>
    <PageTitle title='College Fee Structure' />
<CollegeFeeStructure/>
    </Layout>
     
    </>
  );
};

export default Page;
