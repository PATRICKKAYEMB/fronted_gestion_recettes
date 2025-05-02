import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import {useState} from "react"
import { useQuery } from '@tanstack/react-query';
import { get_user } from '@/api/apiRecette';
import Sidebar from './Sidebar';


const Layout = () => {


   const{data}= useQuery({
        queryKey:["username"],
        queryFn:get_user,
    })

const username=data?.username
const [toggle,SetToggle]=useState(false)
   
  return (
    <>
      <Navbar username={username} toggle={toggle} SetToggle={SetToggle} />
      <div className='flex overflow-hidden bg-[#F1F1F1 ]'>
            <Sidebar toggle={toggle} SetToggle={SetToggle}/>

            <main  className='flex-1 overflow-auto '>
              <Outlet />
            </main>

      </div>
      
     <Footer/>
    </>
  );
};

export default Layout;
