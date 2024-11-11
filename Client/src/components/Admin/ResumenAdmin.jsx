import React from 'react'

const ResumenAdmin = () => {
  return (
    <div>Resumen de Administracion Proximamente</div>
  )
}

export default ResumenAdmin

/* // import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {FaUsers, FaChartBar, FaClipboard} from 'react-icons/fa'
import Widget from './ResumenesComponentes/widget'

const ResumenAdmin = () => {
  const data = [
    {
      icon: <FaClipboard/>,
      digits: 70,
      isMoney: false,
      title: "Orders",
      color: "rgb(102, 108, 255",
      bgColor: "rgb(102, 108, 255",
      percentage: 20,
    },
    {
      icon: <FaUsers/>,
      digits: 50,
      isMoney: false,
      title: "Users",
      color: "rgb(38, 108, 249",
      bgColor: "rgb(38, 108, 249, 0.12",
      percentage: 30,
    },
    {
      icon: <FaChartBar/>,
      digits: 5000,
      isMoney: true,
      title: "Earnings",
      color: "rgb(253, 181, 40",
      bgColor: "rgb(253, 181, 40, 0.12",
      percentage: -60,
    }
    
  ]

  return <StyledResumen>
    <MainStast>
      <Overview>
        <Title>
          <h2>Descripción general</h2>
          <p>Cómo se está desempeñando su tienda en comparación con el mes anterior.</p>
        </Title>
        <WidgetWrapper>
          {data?.map((data, index)=> <Widget key={index} data={data}/>)}
        </WidgetWrapper>
      </Overview>
    </MainStast>
    <SideStats></SideStats>
  </StyledResumen>
}

export default ResumenAdmin

const StyledResumen= styled.div`
  width: 100%;
  display: flex;
`;

const MainStast = styled.div`
  flex: 2;
  width: 100%;
`;

const Title = styled.div`
  p{
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: rgb(48, 31, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`; */