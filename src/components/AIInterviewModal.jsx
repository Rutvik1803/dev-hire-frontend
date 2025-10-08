import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import Loading from './Loading';
import {
  generateInterviewQuestions,
  evaluateAnswer,
} from '../services/aiInterviewService';

const AIInterviewModal = ({ isOpen, onClose, techStack, jobTitle }) => {
  const [stage, setStage] = useState('intro'); // intro, loading, error, interview, results
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');
  const [isAnswerEvaluated, setIsAnswerEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [abortController, setAbortController] = useState(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage('intro');
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setSelectedAnswer('');
      setAnswers([]);
      setScore(0);
      setError('');
      setIsAnswerEvaluated(false);
      setIsCorrect(false);
      setAbortController(null);
    }
  }, [isOpen]);

  // Cleanup: Cancel API call if modal closes during loading
  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  const handleStart = async () => {
    setStage('loading');
    setError('');

    // Create abort controller for this API call
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const data = await generateInterviewQuestions(
        techStack,
        controller.signal
      );

      // Only update state if not aborted
      if (!controller.signal.aborted) {
        setQuestions(data.questions || []);
        setStage('interview');
        setAbortController(null);
      }
    } catch (err) {
      // Don't show error if request was aborted
      if (err.name === 'AbortError' || controller.signal.aborted) {
        console.log('API call cancelled');
        return;
      }

      console.error('Error generating questions:', err);
      setError(
        err.message ||
          'Failed to generate interview questions. Please try again.'
      );
      setStage('error');
      setAbortController(null);
    }
  };

  const handleAnswerSelect = (option) => {
    if (isAnswerEvaluated) return; // Prevent changing answer after evaluation
    setSelectedAnswer(option);
  };

  const handleEvaluateAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = evaluateAnswer(selectedAnswer, currentQuestion.answer);

    setIsCorrect(correct);
    setIsAnswerEvaluated(true);

    // Store the answer
    const newAnswer = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect: correct,
    };

    setAnswers([...answers, newAnswer]);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setIsAnswerEvaluated(false);
      setIsCorrect(false);
    } else {
      // Show results
      setStage('results');
    }
  };

  const handleRetry = () => {
    handleStart();
  };

  const handleClose = () => {
    // Cancel ongoing API call if in loading stage
    if (abortController && stage === 'loading') {
      abortController.abort();
      setAbortController(null);
    }
    onClose();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-surface shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <Dialog.Title className="text-xl font-semibold text-textPrimary">
                    AI Interview Preparation
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="text-textSecondary hover:text-textPrimary transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Intro Stage */}
                  {stage === 'intro' && (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                        <TrophyIcon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-textPrimary mb-3">
                        Are you ready for a short interview round?
                      </h3>
                      <p className="text-textSecondary mb-2">
                        Test your knowledge for: <strong>{jobTitle}</strong>
                      </p>
                      <p className="text-textSecondary mb-6">
                        We'll ask you 10 questions based on:{' '}
                        <strong>{techStack.join(', ')}</strong>
                      </p>
                      <button
                        onClick={handleStart}
                        className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                      >
                        Start Interview
                      </button>
                    </div>
                  )}

                  {/* Loading Stage */}
                  {stage === 'loading' && (
                    <div className="text-center py-16">
                      <Loading />
                      <p className="text-center text-textSecondary mt-4">
                        Generating interview questions...
                      </p>
                    </div>
                  )}

                  {/* Error Stage */}
                  {stage === 'error' && (
                    <div className="text-center py-8">
                      <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-textPrimary mb-2">
                        Oops! Something went wrong
                      </h3>
                      <p className="text-textSecondary mb-6">{error}</p>
                      <button
                        onClick={handleRetry}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {/* Interview Stage */}
                  {stage === 'interview' && currentQuestion && (
                    <div>
                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-textSecondary">
                            Question {currentQuestionIndex + 1} of{' '}
                            {questions.length}
                          </span>
                          <span className="text-sm font-medium text-primary">
                            Score: {score}/{questions.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Question */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-textPrimary mb-4">
                          {currentQuestion.question}
                        </h3>

                        {/* Options */}
                        <div className="space-y-3">
                          {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrectOption =
                              option === currentQuestion.answer;
                            const showCorrect =
                              isAnswerEvaluated && isCorrectOption;
                            const showIncorrect =
                              isAnswerEvaluated &&
                              isSelected &&
                              !isCorrectOption;

                            return (
                              <button
                                key={index}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={isAnswerEvaluated}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                  showCorrect
                                    ? 'border-green-500 bg-green-50'
                                    : showIncorrect
                                    ? 'border-red-500 bg-red-50'
                                    : isSelected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                                } ${
                                  isAnswerEvaluated
                                    ? 'cursor-not-allowed'
                                    : 'cursor-pointer'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`font-medium ${
                                      showCorrect
                                        ? 'text-green-700'
                                        : showIncorrect
                                        ? 'text-red-700'
                                        : isSelected
                                        ? 'text-primary'
                                        : 'text-textPrimary'
                                    }`}
                                  >
                                    {option}
                                  </span>
                                  {showCorrect && (
                                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                                  )}
                                  {showIncorrect && (
                                    <XCircleIcon className="w-6 h-6 text-red-500" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Feedback Message */}
                      {isAnswerEvaluated && (
                        <div
                          className={`mb-4 p-4 rounded-lg ${
                            isCorrect
                              ? 'bg-green-50 text-green-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          <p className="font-medium">
                            {isCorrect
                              ? '✓ Correct! Well done!'
                              : `✗ Incorrect. The correct answer is: ${currentQuestion.answer}`}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center">
                        <button
                          onClick={handleClose}
                          className="text-textSecondary hover:text-textPrimary transition-colors font-medium"
                        >
                          Exit Interview
                        </button>
                        <div className="flex gap-3">
                          {!isAnswerEvaluated ? (
                            <button
                              onClick={handleEvaluateAnswer}
                              disabled={!selectedAnswer}
                              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Submit Answer
                            </button>
                          ) : (
                            <button
                              onClick={handleNext}
                              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
                            >
                              {currentQuestionIndex < questions.length - 1
                                ? 'Next Question'
                                : 'See Results'}
                              <ArrowRightIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Results Stage */}
                  {stage === 'results' && (
                    <div className="text-center py-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                        <TrophyIcon className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-textPrimary mb-2">
                        Interview Complete!
                      </h3>
                      <p className="text-textSecondary mb-6">
                        Here's how you performed:
                      </p>

                      {/* Score Display */}
                      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 mb-6">
                        <div className="text-6xl font-bold text-primary mb-2">
                          {score}/{questions.length}
                        </div>
                        <p className="text-textSecondary">
                          {score === questions.length
                            ? 'Perfect Score! Outstanding! 🎉'
                            : score >= questions.length * 0.7
                            ? 'Great Job! Well done! 👏'
                            : score >= questions.length * 0.5
                            ? 'Good effort! Keep learning! 💪'
                            : 'Keep practicing! You can do better! 📚'}
                        </p>
                      </div>

                      {/* Percentage */}
                      <div className="mb-8">
                        <div className="inline-block bg-surface border-2 border-primary rounded-full px-6 py-2">
                          <span className="text-2xl font-bold text-primary">
                            {Math.round((score / questions.length) * 100)}%
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={handleStart}
                          className="bg-surface border border-border text-textPrimary px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          Retry Interview
                        </button>
                        <button
                          onClick={handleClose}
                          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AIInterviewModal;
