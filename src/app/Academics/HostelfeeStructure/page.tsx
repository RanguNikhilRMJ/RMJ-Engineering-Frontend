"use client"
import React from 'react';
import Hostelfee from '@/components/pagescomponents/FeeComponents/Hostelfee';
import Layout from '@/components/Sidemenu/Layout';
import PageTitle from '@/components/PageTitle';


const Page: React.FC = () => {
  
  return (
    <>
    <Layout>
    <PageTitle title='Hostel Fee Structure' />
<Hostelfee/>

    </Layout>
     
    </>
  );
};

export default Page;
