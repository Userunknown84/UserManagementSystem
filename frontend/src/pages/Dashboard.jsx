import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Common.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("user"));
  const admin = adminData?.user || adminData;

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchUsers = async (page = 1) => {
    try {
      if (users.length === 0) {
        setLoading(true);
      } else {
        setPageLoading(true);
      }
      
      setError("");
      
      const res = await API.get(`/admin/users?page=${page}`);
      
      setUsers(res.data.users);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setError("");
    } catch (err) {
      console.error('Fetch error:', err.response || err);
      setError(err.response?.data?.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (!adminData) {
      navigate('/');
      return;
    }
    
    if (admin.role !== 'admin') {
      navigate('/profile');
      return;
    }
    
    fetchUsers(1);
  }, []);

  const updateStatus = async (id, newStatus) => {
    const action = newStatus === "inactive" ? "deactivate" : "activate";
    const confirmAction = window.confirm(
      `Are you sure you want to ${action} this user?`
    );
    
    if (!confirmAction) return;

    try {
      const endpoint = newStatus === "inactive" ? "deactivate" : "activate";
      await API.patch(`/admin/users/${id}/${endpoint}`);
      
      setMessage(`User ${action}d successfully`);
      setError("");
      
      setTimeout(() => setMessage(""), 3000);
      
      fetchUsers(currentPage);
    } catch (err) {
      console.error('Update status error:', err.response || err);
      setError(err.response?.data?.message || `Failed to ${action} user`);
      setMessage("");
    }
  };

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    
    setMessage("");
    fetchUsers(page);
  };

  return (
    <div className="page-container">
      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <p>Welcome, {admin.fullName}</p>
            <p className="role">Role: {admin.role}</p>
          </div>
          <div className="navbar-right">
            <button onClick={() => navigate("/profile")} className="btn">
              Profile
            </button>
            <button 
              onClick={() => { 
                localStorage.clear(); 
                navigate("/"); 
              }} 
              className="btn logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="content">
        <h2>Admin Dashboard</h2>

        {message && (
          <div className="notification success">
            ✓ {message}
          </div>
        )}
        {error && (
          <div className="notification error">
            ✗ {error}
          </div>
        )}

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 && !error ? (
          <p className="no-data">No users found</p>
        ) : (
          <>
            <div className="table-container" style={{ position: 'relative' }}>
              {pageLoading && (
                <div className="page-loading-overlay">
                  <div className="spinner"></div>
                </div>
              )}
              
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.email}</td>
                      <td>{user.fullName}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        {user.status === "active" ? (
                          <button 
                            className="btn danger" 
                            onClick={() => updateStatus(user._id, "inactive")}
                            disabled={pageLoading}
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button 
                            className="btn primary" 
                            onClick={() => updateStatus(user._id, "active")}
                            disabled={pageLoading}
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || pageLoading}
                  className="btn pagination-btn"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`btn pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => handlePageChange(i + 1)}
                    disabled={pageLoading}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || pageLoading}
                  className="btn pagination-btn"
                >
                  Next
                </button>
              </div>
            )}

            <div className="page-info">
              Page {currentPage} of {totalPages}
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        <p>© 2025 User Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminDashboard;
