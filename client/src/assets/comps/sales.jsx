import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

function sales() {
  const [scouts, setScouts] = useState([])
  const [sales, setSales] = useState([])
  const [locations, SetLocations] = useState([])

  useEffect(() => {
    async function getLocations(){
    const responce = await fetch("/api/locations")
    const data = await responce.json()
    console.log(data)
    SetLocations(data)
  }
  getLocations()
}, [])

  useEffect(() => {
    async function getScouts(){
    const responce = await fetch("/api/scouts")
    const data = await responce.json()
    setScouts(data)
  }
  getScouts()
}, [])

useEffect(() => {
  async function getSales(){
  const responce = await fetch("/api/sales")
  const data = await responce.json()
  setSales(data)
}
getSales()
}, [])

const aggregatedSales = sales.reduce((acc, sale) => {
  const scoutId = sale.scout_id
  if (!acc[scoutId]) {
    acc[scoutId] = {
      totalBoxesSold: 0,
      totalMoneyMade: 0,
    }
  }
  acc[scoutId].totalBoxesSold += parseInt(sale.box)
  acc[scoutId].totalMoneyMade += parseInt(sale.box) * parseFloat(sale.priceperbox)
  return acc
}, {})

const moneyMadePerLocation = sales.reduce((locate, sale) => {
  const locationId = sale.location_id
  const totalMoneyForSale = parseInt(sale.box) * parseFloat(sale.priceperbox)

  if (!locate[locationId]) {
    locate[locationId] = 0
  }

  locate[locationId] += totalMoneyForSale
  return locate
}, {})

const rows = scouts.map(scout => {
  return {
    id: scout.id,
    firstName: scout.scouts,
    boxssold: aggregatedSales[scout.id]?.totalBoxesSold || 0,
    moneymade: `$${(aggregatedSales[scout.id]?.totalMoneyMade || 0).toFixed(2)}`,
  }
})

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'boxssold', headerName: 'Boxes Sold', type: 'number', width: 150 },
  { field: 'moneymade', headerName: 'Money Total', type: 'number', width: 150 },
]

const locateRows = locations.map(location => {
  const totalMoneyForLocation = location.location_sale.reduce((acc, sale) => {
    return acc + parseInt(sale.box) * parseFloat(sale.priceperbox)
  }, 0)

  return {
    id: location.id,
    locationmoney: `$${totalMoneyForLocation}`
  }
})

const locateColumns = [
  { field: 'id', headerName: 'Location ID', width: 150 },
  { field: 'locationmoney', headerName: 'Total Money Made', width: 150 }
]
    return (

    <div>
        <h1>sales</h1>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
        <DataGrid rows={locateRows} columns={locateColumns} pageSize={5} />
    </div>
    </div>
  )
}

export default sales