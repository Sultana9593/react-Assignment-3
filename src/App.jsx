import React, { useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([
    {
      id: '1',
      name: 'Rahim Ahmed',
      dept: 'IT',
      gender: 'Male',
      phone: '01711111111',
      localAddress: 'Dhaka',
      permAddress: 'Sylhet'
    }
  ]);

  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [dept, setDept] = useState('IT');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [localAddress, setLocalAddress] = useState('');
  const [permAddress, setPermAddress] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !empId || !phone) {
      alert('Please fill in all required fields!');
      return;
    }

    if (isEditing) {
      setEmployees(
        employees.map((emp) =>
          emp.id === empId
            ? { ...emp, name, dept, gender, phone, localAddress, permAddress }
            : emp
        )
      );
      setIsEditing(false);
    } else {
      const newEmp = {
        id: empId,
        name,
        dept,
        gender,
        phone,
        localAddress,
        permAddress
      };
      setEmployees([...employees, newEmp]);
    }

    setName('');
    setEmpId('');
    setPhone('');
    setLocalAddress('');
    setPermAddress('');
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleEdit = (emp) => {
    setIsEditing(true);
    setEmpId(emp.id);
    setName(emp.name);
    setDept(emp.dept);
    setGender(emp.gender);
    setPhone(emp.phone);
    setLocalAddress(emp.localAddress);
    setPermAddress(emp.permAddress);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.dept === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', maxWidth: '950px', margin: '0 auto', background: '#f9f9f9', minHeight: '100vh', borderRadius: '10px' }}>
      <h2 style={{ color: '#020c15', textAlign: 'center', marginBottom: '20px' }}>Employee Directory App</h2>

      {/* Employee Count */}
      <div style={{ background: '#95cdf8', padding: '10px 15px', borderRadius: '6px', marginBottom: '15px', color: '#2980b9', fontWeight: 'bold' }}>
        Total Employees Found: {filteredEmployees.length}
      </div>

      {/* Search & Filter Section */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <input
          type="text"
          placeholder="Search by Name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '250px', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #97c7fa' }}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)', marginBottom: '25px' }}>
        <h3 style={{ marginTop: '0', color: '#051525' }}>{isEditing ? 'Edit Employee Details' : 'Add New Employee'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <input type="text" placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} disabled={isEditing} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          
          <select value={dept} onChange={(e) => setDept(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

          <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Local Address" value={localAddress} onChange={(e) => setLocalAddress(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Permanent Address" value={permAddress} onChange={(e) => setPermAddress(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>
        
        {/* Colorful Submit Button */}
        <button type="submit" style={{ 
          marginTop: '15px', 
          padding: '10px 20px', 
          background: isEditing ? '#8fbea3' : '#2980b9', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '6px', 
          fontWeight: 'bold',
          cursor: 'pointer' 
        }}>
          {isEditing ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      {/* Employee List Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
        <thead>
          <tr style={{ background: '#34495e', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Dept</th>
            <th style={{ padding: '12px' }}>Gender</th>
            <th style={{ padding: '12px' }}>Phone</th>
            <th style={{ padding: '12px' }}>Local Address</th>
            <th style={{ padding: '12px' }}>Permanent Address</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{emp.id}</td>
                <td style={{ padding: '12px' }}>{emp.name}</td>
                <td style={{ padding: '12px' }}>{emp.dept}</td>
                <td style={{ padding: '12px' }}>{emp.gender}</td>
                <td style={{ padding: '12px' }}>{emp.phone}</td>
                <td style={{ padding: '12px' }}>{emp.localAddress}</td>
                <td style={{ padding: '12px' }}>{emp.permAddress}</td>
                <td style={{ padding: '12px' }}>
                  {/* Colorful Edit Button */}
                  <button onClick={() => handleEdit(emp)} style={{ 
                    marginRight: '6px', 
                    background: '#f39c12', 
                    color: '#fff', 
                    border: 'none', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    fontWeight: 'bold',
                    cursor: 'pointer' 
                  }}>
                    Edit
                  </button>
                  {/* Colorful Delete Button */}
                  <button onClick={() => handleDelete(emp.id)} style={{ 
                    background: '#e74c3c', 
                    color: 'white', 
                    border: 'none', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    fontWeight: 'bold',
                    cursor: 'pointer' 
                  }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
