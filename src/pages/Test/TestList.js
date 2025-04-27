import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './TestList.css';

const TestList = () => {
  const { user } = useAuth();
  const [testSets, setTestSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestSets = async () => {
      try {
        const res = await fetch('http://localhost:5050/api/tests');
        const data = await res.json();

        // Add dummy "lastAttempt" field for UI consistency
        const enrichedData = data.map(test => ({
          ...test,
          questionsCount: test.questions.length,
          lastAttempt: null, // You can later save user's last attempt if needed
        }));

        setTestSets(enrichedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test sets:', error);
        setLoading(false);
      }
    };

    fetchTestSets();
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleEdit = (id) => {
    alert(`Edit Test ID: ${id} (Feature coming soon)`);
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
                      Edit
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
