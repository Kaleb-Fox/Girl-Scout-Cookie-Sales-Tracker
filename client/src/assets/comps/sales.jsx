import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Modal, Box, Select, MenuItem } from '@mui/material';

function Sales() {
  const [scouts, setScouts] = useState([]);
  const [sales, setSales] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newSale, setNewSale] = useState({ scout_id: '', box: '', priceperbox: '', location_id: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSale, setEditSale] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const scoutsResponse = await fetch('/api/scouts');
      const scoutsData = await scoutsResponse.json();
      setScouts(scoutsData);

      const salesResponse = await fetch('/api/sales');
      const salesData = await salesResponse.json();
      setSales(salesData);

      const locationsResponse = await fetch('/api/locations');
      const locationsData = await locationsResponse.json();
      setLocations(locationsData);
    }

    fetchData();
  }, []);

  const handleCreateSale = async () => {
    const response = await fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSale),
    });
    if (response.ok) {
      const createdSale = await response.json();
      setSales([...sales, createdSale]);
      setNewSale({ scout_id: '', box: '', priceperbox: '', location_id: '' });
    }
  };

  const handleDeleteSale = async (id) => {
    const response = await fetch(`/api/sales/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setSales(sales.filter((sale) => sale.id !== id));
    }
  };

  const handleEditSale = async (id, updatedSale) => {
    const response = await fetch(`/api/sales/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSale),
    });
    if (response.ok) {
      const updatedSales = sales.map((sale) => (sale.id === id ? updatedSale : sale));
      setSales(updatedSales);
      setIsEditModalOpen(false);
    }
  };

  const openEditModal = (sale) => {
    setEditSale(sale);
    setIsEditModalOpen(true);
  };

  const aggregatedSales = sales.reduce((acc, sale) => {
    const scoutId = sale.scout_id;
    if (!acc[scoutId]) {
      acc[scoutId] = {
        totalBoxesSold: 0,
        totalMoneyMade: 0,
      };
    }
    acc[scoutId].totalBoxesSold += parseInt(sale.box);
    acc[scoutId].totalMoneyMade += parseInt(sale.box) * parseFloat(sale.priceperbox);
    return acc;
  }, {});

  const rows = scouts.map((scout) => ({
    id: scout.id,
    firstName: scout.scouts,
    boxssold: aggregatedSales[scout.id]?.totalBoxesSold || 0,
    moneymade: `$${(aggregatedSales[scout.id]?.totalMoneyMade || 0).toFixed(2)}`,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'boxssold', headerName: 'Boxes Sold', type: 'number', width: 150 },
    { field: 'moneymade', headerName: 'Money Total', type: 'number', width: 150 },
  ];

  return (
    <div>
      <h1>Sales</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateSale(); }}>
        <Select
          value={newSale.scout_id}
          onChange={(e) => setNewSale({ ...newSale, scout_id: e.target.value })}
          displayEmpty
        >
          <MenuItem value="" disabled>Select Scout</MenuItem>
          {scouts.map((scout) => (
            <MenuItem key={scout.id} value={scout.id}>{scout.scouts}</MenuItem>
          ))}
        </Select>
        <TextField
          label="Boxes"
          value={newSale.box}
          onChange={(e) => setNewSale({ ...newSale, box: e.target.value })}
        />
        <TextField
          label="Price per Box"
          value={newSale.priceperbox}
          onChange={(e) => setNewSale({ ...newSale, priceperbox: e.target.value })}
        />
        <Select
          value={newSale.location_id}
          onChange={(e) => setNewSale({ ...newSale, location_id: e.target.value })}
          displayEmpty
        >
          <MenuItem value="" disabled>Select Location</MenuItem>
          {locations.map((location) => (
            <MenuItem key={location.id} value={location.id}>{location.summary}, {location.date}</MenuItem>
          ))}
        </Select>
        <Button type="submit">Create Sale</Button>
      </form>
      <Button onClick={() => setIsModalOpen(true)}>Click Here to View All Sales</Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ width: 900, margin: 'auto', marginTop: '5%', padding: 2, backgroundColor: 'white', maxHeight: '80vh', overflowY: 'auto' }}>
          <h2>All Sales</h2>
          <DataGrid rows={sales.map(sale => ({
            ...sale,
            scout_id: scouts.find(scout => scout.id === sale.scout_id)?.scouts || sale.scout_id
          }))} columns={[
            { field: 'id', headerName: 'Sale ID', width: 90 },
            { field: 'scout_id', headerName: 'Scout ID', width: 150 },
            { field: 'box', headerName: 'Boxes', width: 150 },
            { field: 'priceperbox', headerName: 'Price per Box', width: 150 },
            { field: 'location_id', headerName: 'Location ID', width: 150 },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 150,
              renderCell: (params) => (
                <div>
                  <Button onClick={() => handleDeleteSale(params.row.id)}>Delete</Button>
                  <Button onClick={() => openEditModal(params.row)}>Edit</Button>
                </div>
              ),
            },
          ]} pageSize={5} />
        </Box>
      </Modal>
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box sx={{ width: 400, margin: 'auto', marginTop: '5%', padding: 2, backgroundColor: 'white' }}>
          <h2>Edit Sale</h2>
          {editSale && (
            <form onSubmit={(e) => { e.preventDefault(); handleEditSale(editSale.id, editSale); }}>
              <Select
                value={editSale.scout_id}
                onChange={(e) => setEditSale({ ...editSale, scout_id: e.target.value })}
                displayEmpty
              >
                <MenuItem value="" disabled>Select Scout</MenuItem>
                {scouts.map((scout) => (
                  <MenuItem key={scout.id} value={scout.id}>{scout.scouts}</MenuItem>
                ))}
              </Select><br></br><br></br>
              <TextField
                label="Boxes"
                value={editSale.box}
                onChange={(e) => setEditSale({ ...editSale, box: e.target.value })}
              /><br></br><br></br>
              <TextField
                label="Price per Box"
                value={editSale.priceperbox}
                onChange={(e) => setEditSale({ ...editSale, priceperbox: e.target.value })}
              />
              <br></br><br></br>
              <TextField
                label="Location ID"
                value={editSale.location_id}
                onChange={(e) => setEditSale({ ...editSale, location_id: e.target.value })}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </Box>
      </Modal>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
}
export default Sales;