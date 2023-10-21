import React, { Suspense } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
// import Emails from '../components/Emails'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SuspenseLoader from '../components/SuspenseLoader'
import { Box ,styled} from '@mui/material'

const Wrapper = styled(Box)`
    display: flex;
`;

const Main = () => {

  const [openDrawer, setOpenDrawer] = useState(true);

  const toogleDrawer = () => {
    setOpenDrawer(prevState => !prevState);
  }

  return (
    <>
      <Header toogleDrawer={toogleDrawer} />
      <Wrapper>
          <SideBar toogleDrawer={toogleDrawer} openDrawer={openDrawer} />
          <Suspense fallback={<SuspenseLoader/>}>
          <Outlet context={{openDrawer}}/>
          </Suspense>
      </Wrapper>
         
    </>
  )
}

export default Main
