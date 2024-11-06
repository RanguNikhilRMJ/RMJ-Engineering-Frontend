"use client"
import React from 'react'
import PostComponent from '@/components/pagescomponents/MidMarksComponent/PostComponent';
import PageTitle from "@/components/PageTitle";
import Layout from '@/components/Sidemenu/Layout';
const postmarks: React.FC = () =>  {
  return (
    <>
    <Layout>
      <PageTitle title="Post Mid Marks" />
    <PostComponent/>
    </Layout>
   
    </>
  )
};

export default postmarks;