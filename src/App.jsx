import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // State untuk Tab Aktif (Navigasi 1 Page)
  const [activeTab, setActiveTab] = useState('leads');

  // --- A. useState ---
  const [leads, setLeads] = useState([]);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // --- C. useRef ---
  const nameInputRef = useRef(null);

  // --- B. useEffect ---
  useEffect(() => {
    // Hanya fetch data jika tab yang aktif adalah leads
    if (activeTab === 'leads') {
      setIsLoading(true);
      const fetchLeads = setTimeout(() => {
        setLeads([
          { id: 1, name: "Budi Santoso", email: "budi@example.com" },
          { id: 2, name: "Siti Aminah", email: "siti@example.com" }
        ]);
        setIsLoading(false);
        
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 1500);

      return () => clearTimeout(fetchLeads);
    }
  }, [activeTab]); // useEffect dipanggil setiap tab berubah ke 'leads'

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!newLeadName || !newLeadEmail) return;

    const newLead = {
      id: leads.length + 1,
      name: newLeadName,
      email: newLeadEmail
    };

    setLeads([...leads, newLead]);
    setNewLeadName("");
    setNewLeadEmail("");
    
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  // Komponen Tampilan (Render Functions)
  const renderDashboard = () => (
    <div className="crm-card">
      <h3>Overview Dashboard</h3>
      <p>Selamat datang di CRM Pro. Ini adalah ringkasan penjualan bulan ini.</p>
      <div className="dashboard-stats" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '10px', flex: 1 }}>
          <h4>Total Penjualan</h4>
          <h2 style={{ color: '#10b981', marginTop: '10px' }}>Rp 50.000.000</h2>
        </div>
        <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '10px', flex: 1 }}>
          <h4>Leads Aktif</h4>
          <h2 style={{ color: '#10b981', marginTop: '10px' }}>{leads.length > 0 ? leads.length : 24} Orang</h2>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="crm-card">
      <h3>Daftar Pelanggan VIP</h3>
      <p>Pelanggan yang sudah melakukan pembelian bulan ini.</p>
      <table className="crm-table" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Pelanggan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CUST-01</td>
            <td>Ahmad Fikri</td>
            <td><span style={{ color: 'green', fontWeight: 'bold' }}>Active VIP</span></td>
          </tr>
          <tr>
            <td>CUST-02</td>
            <td>Dina Mariana</td>
            <td><span style={{ color: 'orange', fontWeight: 'bold' }}>Reguler</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderSettings = () => (
    <div className="crm-card">
      <h3>Pengaturan Akun</h3>
      <div className="form-group" style={{ marginTop: '20px' }}>
        <label>Nama Perusahaan</label>
        <input type="text" value="PT CRM Sejahtera" readOnly style={{ background: '#eee' }} />
      </div>
      <div className="form-group" style={{ marginTop: '10px' }}>
        <label>Email Admin</label>
        <input type="email" value="admin@crmpro.com" readOnly style={{ background: '#eee' }} />
      </div>
      <button className="btn-submit" style={{ marginTop: '15px' }}>Update Profil</button>
    </div>
  );

  const renderLeads = () => (
    <div className="crm-grid">
      <div className="crm-card">
        <h3>Tambah Lead Baru</h3>
        <form onSubmit={handleAddLead} className="lead-form">
          <div className="form-group">
            <label>Nama Lead</label>
            <input
              ref={nameInputRef}
              type="text"
              value={newLeadName}
              onChange={(e) => setNewLeadName(e.target.value)}
              placeholder="Masukkan nama..."
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={newLeadEmail}
              onChange={(e) => setNewLeadEmail(e.target.value)}
              placeholder="Masukkan email..."
            />
          </div>
          <button type="submit" className="btn-submit">Simpan Lead</button>
        </form>
      </div>

      <div className="crm-card list-card">
        <h3>Daftar Leads</h3>
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Memuat data leads...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="crm-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {leads.length > 0 ? (
                  leads.map((lead, index) => (
                    <tr key={lead.id}>
                      <td>{index + 1}</td>
                      <td>{lead.name}</td>
                      <td>{lead.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-state">Belum ada data lead</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="crm-container">
      {/* SIDEBAR */}
      <aside className="crm-sidebar">
        <div className="sidebar-logo">
          <h2>CRM<span>Pro</span></h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>Dashboard</a>
            </li>
            <li className={activeTab === 'leads' ? 'active' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('leads'); }}>Leads</a>
            </li>
            <li className={activeTab === 'customers' ? 'active' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('customers'); }}>Customers</a>
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}>Settings</a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="crm-main-wrapper">
        {/* HEADER */}
        <header className="crm-header">
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-profile">
            <div className="avatar">AD</div>
            <span>Admin User</span>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="crm-content">
          <div className="content-header">
            <h1 style={{ textTransform: 'capitalize' }}>
              {activeTab === 'leads' ? 'Lead Management' : activeTab}
            </h1>
            <p>
              {activeTab === 'leads' 
                ? 'Pertemuan 12: Implementasi useState, useEffect, dan useRef' 
                : `Halaman ${activeTab} - Fitur Utama CRM Pro`}
            </p>
          </div>

          {/* Conditional Rendering berdasar Tab Aktif */}
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'leads' && renderLeads()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'settings' && renderSettings()}

        </main>
      </div>
    </div>
  );
}

export default App;
