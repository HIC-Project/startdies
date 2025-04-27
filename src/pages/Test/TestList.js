import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './TestList.css';

const TestList = () => {
  const { user } = useAuth();
  const [testSets, setTestSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestSets = async () => {
      try {
        const mockTestSets = [
          { id: 1, title: 'Biology Midterm', questionsCount: 42, lastAttempt: '2025-04-22' },
          { id: 2, title: 'Chemistry Fundamentals', questionsCount: 30, lastAttempt: '2025-04-15' },
          { id: 3, title: 'Spanish Vocabulary', questionsCount: 50, lastAttempt: null },
          { id: 4, title: 'World History', questionsCount: 75, lastAttempt: '2025-04-01' },
        ];
        setTestSets(mockTestSets);
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
                    <button className="editBtn">Edit</button>
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
