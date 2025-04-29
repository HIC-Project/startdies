import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons
import './TestList.css';

const TestList = () => {
  const { user } = useAuth();
  const [testSets, setTestSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, [user]);

  const fetchTests = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/tests');
      const data = await res.json();

      const enrichedData = data.map(test => ({
        ...test,
        questionsCount: test.questions.length,
        lastAttempt: null, // Optional: You can later store the actual last attempt date
      }));

      setTestSets(enrichedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching test sets:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleEdit = (id) => {
    navigate(`/test/update/${id}`); // Navigate to the update page with the testId
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this test?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5050/api/tests/${id}`, {
        method: 'DELETE',
      });

      // Refresh the list after deletion
      fetchTests();
      alert('Test deleted successfully!');
    } catch (error) {
      console.error('Error deleting test:', error);
      alert('Failed to delete test.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Practice Tests</h1>
        <p className="subtitle">
          Create and take practice tests to assess your knowledge.
        </p>
      </div>

      {loading ? (
        <div className="loading">Loading your tests...</div>
      ) : (
        <>
          <div className="createNew">
            <Link to="/test/create" className="createLink">
              Create New Test →
            </Link>
          </div>

          {testSets.length === 0 ? (
            <div className="emptyState">
              <p>You don't have any test sets yet.</p>
              <p>Start by creating your first test!</p>
            </div>
          ) : (
            <div className="testGrid">
              {testSets.map((test) => (
                <div key={test.id} className="testCard">
                  <h3 className="testTitle">{test.title}</h3>
                  <div className="testDetails">
                    <p>{test.questionsCount} Questions</p>
                    <p>Last Attempt: {formatDate(test.lastAttempt)}</p>
                  </div>
                  <div className="actionButtons">
                    <Link to={`/test/run?id=${test.id}`} className="takeTestBtn">
                      Take Test
                    </Link>
                    <button className="editBtn" onClick={() => handleEdit(test.id)}>
                      <FaEdit size={16} style={{ marginRight: 4 }} />
                    </button>
                    <button className="removeBtn" onClick={() => handleDelete(test.id)}>
                      <FaTrash size={16} style={{ marginRight: 4 }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestList;
