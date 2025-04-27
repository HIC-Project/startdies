import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './CreateTest.css';

const UpdateTest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { testId } = useParams(); // Get the testId from the URL

  const [testData, setTestData] = useState({
    title: '',
    description: '',
    timeLimit: 30,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Fetch the test data to edit
    const fetchTestData = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/tests/${testId}`);
        const data = await res.json();
        setTestData(data);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTestData();
  }, [testId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: updatedOptions }));
  };

  const handleCorrectAnswerChange = (index) => {
    setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }));
  };

  const addQuestion = () => {
    if (!currentQuestion.question.trim() || currentQuestion.options.some(opt => !opt.trim())) {
      alert('Please fill in all fields');
      return;
    }
    setTestData(prev => ({
      ...prev,
      questions: [...prev.questions, { ...currentQuestion, id: Date.now() }]
    }));

    setCurrentQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const removeQuestion = (id) => {
    setTestData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const editQuestion = (question) => {
    setCurrentQuestion({ ...question });
    removeQuestion(question.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveTest = async () => {
    if (!testData.title.trim() || testData.questions.length === 0) {
      alert('Please add a title and at least one question');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5050/api/tests/${testId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testData,
          updatedAt: new Date().toISOString(),
          updatedBy: user?.username || 'Anonymous'
        })
      });

      if (!response.ok) throw new Error('Failed to update test');

      const updatedTest = await response.json();
      console.log('Updated test:', updatedTest);

      alert('Test updated successfully!');
      navigate('/test'); // Redirect to test list
    } catch (error) {
      console.error('Error updating test:', error);
      alert('Failed to update test.');
    }
  };

  return (
    <div className="container">
      <button
        onClick={() => navigate('/test')}
        className="backToTestListBtn"
      >
        « Back to Test List
      </button>

      <div className="header">
        <h1 className="title">Update Test</h1>
        <p className="subtitle">Update the test by editing the questions and details</p>
      </div>

      {!previewMode ? (
        <>
          <div className="basicInfo">
            <div className="formGroup">
              <label htmlFor="title" className="label">Test Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={testData.title}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter test title"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="description" className="label">Description (Optional)</label>
              <textarea
                id="description"
                name="description"
                value={testData.description}
                onChange={handleInputChange}
                className="textarea"
                placeholder="Enter test description"
                rows={3}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="timeLimit" className="label">Time Limit (Minutes)</label>
              <input
                type="number"
                id="timeLimit"
                name="timeLimit"
                value={testData.timeLimit}
                onChange={handleInputChange}
                className="input"
                min={1}
              />
            </div>
          </div>

          <div className="divider"></div>

          <div className="questionEditor">
            <h2 className="sectionTitle">Edit Questions</h2>

            <div className="formGroup">
              <label htmlFor="question" className="label">Question</label>
              <textarea
                id="question"
                name="question"
                value={currentQuestion.question}
                onChange={handleQuestionChange}
                className="textarea"
                rows={2}
              />
            </div>

            <div className="optionsGroup">
              <label className="label">Answer Options</label>
              {currentQuestion.options.map((option, idx) => (
                <div key={idx} className="optionRow">
                  <input
                    type="radio"
                    checked={currentQuestion.correctAnswer === idx}
                    onChange={() => handleCorrectAnswerChange(idx)}
                    className="radio"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="optionInput"
                    placeholder={`Option ${idx + 1}`}
                  />
                </div>
              ))}
            </div>

            <button className="addQuestionBtn" onClick={addQuestion}>Add Question</button>
          </div>

          <div className="divider"></div>

          <div className="questionList">
            <h2 className="sectionTitle">Test Questions ({testData.questions.length})</h2>
            {testData.questions.length === 0 ? (
              <div className="noQuestions">No questions added yet.</div>
            ) : (
              <div className="questionCards">
                {testData.questions.map((q, idx) => (
                  <div key={q.id} className="questionCard">
                    <div className="questionNumber">Q{idx + 1}</div>
                    <div className="questionText">{q.question}</div>
                    <div className="questionActions">
                      <button className="editBtn" onClick={() => editQuestion(q)}>Edit</button>
                      <button className="removeBtn" onClick={() => removeQuestion(q.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="actions">
            <button className="previewBtn" onClick={() => setPreviewMode(true)}>Preview Test</button>
            <button className="saveBtn" onClick={saveTest} disabled={testData.questions.length === 0}>Save Test</button>
          </div>
        </>
      ) : (
        <div className="previewSection">
          <h2 className="sectionTitle">Preview Test (Coming soon)</h2>
          <button className="previewBtn" onClick={() => setPreviewMode(false)}>Back to Editor</button>
        </div>
      )}
    </div>
  );
};

export default UpdateTest;
