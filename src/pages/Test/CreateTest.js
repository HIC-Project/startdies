import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './CreateTest.css';

const CreateTest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
  
  const [errors, setErrors] = useState({
    title: '',
    question: '',
    options: ['', '', '', '']
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: updatedOptions }));
    
    // Clear error for this option when user types
    if (errors.options[index]) {
      const updatedOptionErrors = [...errors.options];
      updatedOptionErrors[index] = '';
      setErrors(prev => ({ ...prev, options: updatedOptionErrors }));
    }
  };

  const handleCorrectAnswerChange = (index) => {
    setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }));
  };

  const validateQuestion = () => {
    let isValid = true;
    const newErrors = {
      question: '',
      options: ['', '', '', '']
    };
    
    // Validate question text
    if (!currentQuestion.question.trim()) {
      newErrors.question = 'Question text is required';
      isValid = false;
    }
    
    // Validate options
    currentQuestion.options.forEach((option, index) => {
      if (!option.trim()) {
        newErrors.options[index] = `Option ${index + 1} is required`;
        isValid = false;
      }
    });
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const addQuestion = () => {
    if (!validateQuestion()) {
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
    
    // Show success message
    setFormMessage({
      type: 'success',
      text: 'Question added successfully!'
    });
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setFormMessage(null);
    }, 3000);
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
  
  const [formMessage, setFormMessage] = useState(null);

  const validateTest = () => {
    let isValid = true;
    const newErrors = { title: '' };
    
    if (!testData.title.trim()) {
      newErrors.title = 'Test title is required';
      isValid = false;
    }
    
    if (testData.questions.length === 0) {
      setFormMessage({
        type: 'error',
        text: 'Please add at least one question to the test'
      });
      isValid = false;
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const saveTest = async () => {
    if (!validateTest()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5050/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          createdBy: user?.username || 'Anonymous'
        })
      });

      if (!response.ok) throw new Error('Failed to create test');

      const createdTest = await response.json();
      console.log('Created test:', createdTest);

      setFormMessage({
        type: 'success',
        text: 'Test saved successfully!'
      });
      
      // Navigate after a short delay to allow the user to see the success message
      setTimeout(() => {
        navigate('/test');
      }, 1500);
    } catch (error) {
      console.error('Error saving test:', error);
      setFormMessage({
        type: 'error',
        text: 'Failed to save test. Please try again.'
      });
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
        <h1 className="title">Create New Test</h1>
        <p className="subtitle">Create a new test by adding questions manually</p>
      </div>
      
      {formMessage && (
        <div className={`formMessage ${formMessage.type}`}>
          {formMessage.text}
        </div>
      )}

      {!previewMode ? (
        <>
          <div className="basicInfo">
            <div className={`formGroup ${errors.title ? 'hasError' : ''}`}>
              <label htmlFor="title" className="label">Test Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={testData.title}
                onChange={handleInputChange}
                className={`input ${errors.title ? 'errorInput' : ''}`}
                placeholder="Enter test title"
              />
              {errors.title && <div className="errorText">{errors.title}</div>}
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
            <h2 className="sectionTitle">Add Questions</h2>

            <div className={`formGroup ${errors.question ? 'hasError' : ''}`}>
              <label htmlFor="question" className="label">Question</label>
              <textarea
                id="question"
                name="question"
                value={currentQuestion.question}
                onChange={handleQuestionChange}
                className={`textarea ${errors.question ? 'errorInput' : ''}`}
                rows={2}
              />
              {errors.question && <div className="errorText">{errors.question}</div>}
            </div>

            <div className="optionsGroup">
              <label className="label">Answer Options</label>
              {currentQuestion.options.map((option, idx) => (
                <div key={idx} className={`optionRow ${errors.options[idx] ? 'hasError' : ''}`}>
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
                    className={`optionInput ${errors.options[idx] ? 'errorInput' : ''}`}
                    placeholder={`Option ${idx + 1}`}
                  />
                  {errors.options[idx] && <div className="errorText optionError">{errors.options[idx]}</div>}
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
            <button 
              className="saveBtn" 
              onClick={saveTest} 
              disabled={testData.questions.length === 0}
            >
              Save Test
            </button>
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

export default CreateTest;