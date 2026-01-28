import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Quiz, QuizResponse } from '../lib/supabase';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QuizSectionProps {
  sectionId: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ sectionId }) => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [responses, setResponses] = useState<Map<string, QuizResponse>>(new Map());
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, number>>(new Map());
  const [showResults, setShowResults] = useState<Map<string, boolean>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, [sectionId]);

  const loadQuizzes = async () => {
    if (!user) return;

    try {
      const { data: quizzesData } = await supabase
        .from('quizzes')
        .select('*')
        .eq('section_id', sectionId)
        .order('order_index', { ascending: true });

      if (quizzesData) {
        const parsedQuizzes = quizzesData.map(q => ({
          ...q,
          options: JSON.parse(q.options as unknown as string)
        }));
        setQuizzes(parsedQuizzes);

        const { data: responsesData } = await supabase
          .from('quiz_responses')
          .select('*')
          .eq('user_id', user.id)
          .in('quiz_id', parsedQuizzes.map(q => q.id));

        if (responsesData) {
          const responsesMap = new Map<string, QuizResponse>();
          const selectedMap = new Map<string, number>();
          const resultsMap = new Map<string, boolean>();

          responsesData.forEach(r => {
            responsesMap.set(r.quiz_id, r);
            selectedMap.set(r.quiz_id, r.selected_answer);
            resultsMap.set(r.quiz_id, true);
          });

          setResponses(responsesMap);
          setSelectedAnswers(selectedMap);
          setShowResults(resultsMap);
        }
      }
    } catch (error) {
      console.error('Error loading quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (quizId: string, answerIndex: number) => {
    if (showResults.get(quizId)) return;

    const newSelected = new Map(selectedAnswers);
    newSelected.set(quizId, answerIndex);
    setSelectedAnswers(newSelected);
  };

  const handleSubmit = async (quiz: Quiz) => {
    if (!user) return;

    const selectedAnswer = selectedAnswers.get(quiz.id);
    if (selectedAnswer === undefined) {
      alert('Please select an answer');
      return;
    }

    const isCorrect = selectedAnswer === quiz.correct_answer;

    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .upsert([
          {
            user_id: user.id,
            quiz_id: quiz.id,
            selected_answer: selectedAnswer,
            is_correct: isCorrect,
          },
        ], { onConflict: 'user_id,quiz_id' })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newResponses = new Map(responses);
        newResponses.set(quiz.id, data);
        setResponses(newResponses);

        const newShowResults = new Map(showResults);
        newShowResults.set(quiz.id, true);
        setShowResults(newShowResults);
      }
    } catch (error) {
      console.error('Error submitting quiz answer:', error);
      alert('Failed to submit answer');
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-600">Loading quizzes...</div>;
  }

  if (quizzes.length === 0) {
    return null;
  }

  const totalQuizzes = quizzes.length;
  const correctAnswers = Array.from(responses.values()).filter(r => r.is_correct).length;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Knowledge Check</h3>
        {responses.size > 0 && (
          <div className="text-sm font-semibold text-blue-600">
            Score: {correctAnswers}/{totalQuizzes} correct
          </div>
        )}
      </div>

      <div className="space-y-8">
        {quizzes.map((quiz, index) => {
          const response = responses.get(quiz.id);
          const selected = selectedAnswers.get(quiz.id);
          const showResult = showResults.get(quiz.id);

          return (
            <div key={quiz.id} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{quiz.question}</h4>

                  <div className="space-y-3">
                    {quiz.options.map((option, optionIndex) => {
                      const isSelected = selected === optionIndex;
                      const isCorrect = optionIndex === quiz.correct_answer;
                      const showCorrect = showResult && isCorrect;
                      const showIncorrect = showResult && isSelected && !isCorrect;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(quiz.id, optionIndex)}
                          disabled={showResult}
                          className={`w-full text-left p-4 rounded-lg border-2 transition ${
                            showCorrect
                              ? 'border-green-500 bg-green-50'
                              : showIncorrect
                              ? 'border-red-500 bg-red-50'
                              : isSelected
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-300 bg-white hover:border-blue-400'
                          } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900">{option}</span>
                            {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {!showResult && selected !== undefined && (
                    <button
                      onClick={() => handleSubmit(quiz)}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Submit Answer
                    </button>
                  )}

                  {showResult && (
                    <div
                      className={`mt-4 p-4 rounded-lg border-l-4 ${
                        response?.is_correct
                          ? 'bg-green-50 border-green-600'
                          : 'bg-amber-50 border-amber-600'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {response?.is_correct ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p
                            className={`font-semibold mb-1 ${
                              response?.is_correct ? 'text-green-800' : 'text-amber-800'
                            }`}
                          >
                            {response?.is_correct ? 'Correct!' : 'Not quite right'}
                          </p>
                          {quiz.explanation && (
                            <p className="text-sm text-gray-700">{quiz.explanation}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
