import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Test.css';

const Test = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get('id');

  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const mockTest = {
          id: parseInt(testId),
          title: 'Biology Midterm',
          timeLimit: 30,
          questions: [
            { id: 1, question: 'Which organelle is responsible for photosynthesis?', options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Endoplasmic Reticulum'], correctAnswer: 1 },
            { id: 2, question: 'What is the primary function of DNA?', options: ['Energy production', 'Storage of genetic information', 'Protein synthesis', 'Cell movement'], correctAnswer: 1 },
            { id: 3, question: 'Which of the following is NOT a component of blood?', options: ['Red blood cells', 'White blood cells', 'Platelets', 'Neurons'], correctAnswer: 3 },
            { id: 4, question: 'Which system is responsible for detoxifying the body?', options: ['Respiratory system', 'Digestive system', 'Excretory system', 'Nervous system'], correctAnswer: 2 },
            { id: 5, question: 'What is the process of breaking down glucose to release energy called?', options: ['Photosynthesis', 'Respiration', 'Fermentation', 'Digestion'], correctAnswer: 1 }
          ]
        };

        setTestData(mockTest);
        setUserAnswers(Array(mockTest.questions.length).fill(null));

        if (mockTest.timeLimit) {
          const totalSeconds = mockTest.timeLimit * 60;
          setTimeRemaining(totalSeconds);

          const interval = setInterval(() => {
            setTimeRemaining(prev => {
              if (prev <= 1) {
                clearInterval(interval);
                handleTestComplete();
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          setTimer(interval);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching test:', error);
        setLoading(false);
      }
    };

    if (testId) {
      fetchTestData();
    } else {
      navigate('/test');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testId, navigate]);

  const handleAnswerSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const updated = [...userAnswers];
      updated[currentQuestion] = selectedOption;
      setUserAnswers(updated);
    }

    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(userAnswers[currentQuestion + 1]);
    } else {
      handleTestComplete();
    }
  };

  const handlePrevQuestion = () => {
    if (selectedOption !== null) {
      const updated = [...userAnswers];
      updated[currentQuestion] = selectedOption;
      setUserAnswers(updated);
    }

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(userAnswers[currentQuestion - 1]);
    }
  };

  const handleTestComplete = () => {
    if (selectedOption !== null) {
      const updated = [...userAnswers];
      updated[currentQuestion] = selectedOption;
      setUserAnswers(updated);
    }

    if (timer) clearInterval(timer);
    setShowResult(true);
  };

  const calculateScore = () => {
    if (!testData) return 0;

    let correct = 0;
    testData.questions.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswer) correct++;
    });

    return {
      correct,
      total: testData.questions.length,
      percentage: Math.round((correct / testData.questions.length) * 100)
    };
  };

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${min}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (loading) {
    return <div className="loading">Loading test...</div>;
  }

  if (!testData) {
    return <div className="error">Test not found. Please return to the test list.</div>;
  }

  if (showResult) {
    const score = calculateScore();

    return (
      <div className="container">
        <button
            onClick={() => navigate('/test')}
            className="backToTestListBtn"
        >
            Back to Test List
        </button>
        
        <div className="resultCard">
          <h2 className="resultTitle">Test Complete!</h2>

          <div className="scoreDisplay">
            <div className="scoreCircle">
              <span className="scorePercentage">{score.percentage}%</span>
            </div>
          </div>

          <div className="resultDetails">
            <p>You answered {score.correct} out of {score.total} questions correctly.</p>

            <div className="resultAnalysis">
              {score.percentage >= 80 ? (
                <p className="excellentResult">Excellent work! You've mastered this material.</p>
              ) : score.percentage >= 60 ? (
                <p className="goodResult">Good job! You've learned most of this material.</p>
              ) : (
                <p className="needsWorkResult">You might need more review on this topic.</p>
              )}
            </div>

            <div className="questionReview">
              <h3>Question Review:</h3>
              {testData.questions.map((q, i) => (
                <div
                  key={q.id}
                  className={userAnswers[i] === q.correctAnswer ? 'correctAnswer' : 'wrongAnswer'}
                >
                  <p><strong>{i + 1}.</strong> {q.question}</p>
                  <p>Your answer: <span className={userAnswers[i] === q.correctAnswer ? 'correctText' : 'wrongText'}>
                    {userAnswers[i] !== null ? q.options[userAnswers[i]] : 'No answer'}
                  </span></p>
                  {userAnswers[i] !== q.correctAnswer && (
                    <p>Correct answer: <span className="correctText">{q.options[q.correctAnswer]}</span></p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="resultActions">
            <button className="retakeBtn" onClick={() => window.location.reload()}>Retake</button>
            <button className="returnBtn" onClick={() => navigate('/test')}>Return</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
        <button
            onClick={() => navigate('/test')}
            className="backToTestListBtn"
        >
            Back to Test List
        </button>
      <div className="testHeader">
        <h1 className="testTitle">{testData.title}</h1>

        {timeRemaining !== null && (
          <div className={`timer ${timeRemaining < 60 ? 'timerWarning' : ''}`}>
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        )}

        <div className="progress">
          <span>Question {currentQuestion + 1} of {testData.questions.length}</span>
          <div className="progressBar">
            <div className="progressFill" style={{ width: `${((currentQuestion + 1) / testData.questions.length) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="questionCard">
        <div className="questionText">{testData.questions[currentQuestion].question}</div>

        <div className="options">
          {testData.questions[currentQuestion].options.map((option, idx) => (
            <div
              key={idx}
              className={`option ${selectedOption === idx ? 'selectedOption' : ''}`}
              onClick={() => handleAnswerSelect(idx)}
            >
              <div className="optionCircle">{String.fromCharCode(65 + idx)}</div>
              <div className="optionText">{option}</div>
            </div>
          ))}
        </div>

        <div className="navigation">
          <button className="prevBtn" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>Previous</button>
          {currentQuestion < testData.questions.length - 1 ? (
            <button className="nextBtn" onClick={handleNextQuestion}>Next</button>
          ) : (
            <button className="finishBtn" onClick={handleTestComplete}>Finish</button>
          )}
        </div>
      </div>

      <div className="questionDots">
        {testData.questions.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${userAnswers[idx] !== null ? 'answeredDot' : (idx === currentQuestion ? 'currentDot' : '')}`}
            onClick={() => {
              if (selectedOption !== null) {
                const updated = [...userAnswers];
                updated[currentQuestion] = selectedOption;
                setUserAnswers(updated);
              }
              setCurrentQuestion(idx);
              setSelectedOption(userAnswers[idx]);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Test;
