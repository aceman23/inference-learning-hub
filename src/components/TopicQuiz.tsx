import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TopicQuizProps {
  questions: QuizQuestion[];
  courseId: string;
  sectionId: string;
  topicId: string;
  onAllAnswered?: (allAnswered: boolean) => void;
}

export default function TopicQuiz({
  questions,
  courseId,
  sectionId,
  topicId,
  onAllAnswered
}: TopicQuizProps) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (user) {
      loadAnsweredQuestions();
    }
  }, [user, courseId, sectionId, topicId]);

  useEffect(() => {
    const allAnswered = answeredQuestions.size === questions.length;
    if (onAllAnswered) {
      onAllAnswered(allAnswered);
    }
  }, [answeredQuestions, questions.length, onAllAnswered]);

  const loadAnsweredQuestions = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('quiz_answers')
        .select('question_index')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('section_id', sectionId)
        .eq('topic_id', topicId)
        .eq('answered', true);

      if (data) {
        const answered = new Set(data.map(d => d.question_index));
        setAnsweredQuestions(answered);
      }
    } catch (error) {
      console.error('Error loading quiz answers:', error);
    }
  };

  const saveQuizAnswer = async (questionIndex: number) => {
    if (!user) return;

    try {
      await supabase
        .from('quiz_answers')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          section_id: sectionId,
          topic_id: topicId,
          question_index: questionIndex,
          answered: true,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,course_id,section_id,topic_id,question_index'
        });

      setAnsweredQuestions(prev => new Set([...prev, questionIndex]));
    } catch (error) {
      console.error('Error saving quiz answer:', error);
    }
  };

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);

    const newShowResults = [...showResults];
    newShowResults[questionIndex] = true;
    setShowResults(newShowResults);

    saveQuizAnswer(questionIndex);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-emerald-600" />
        <h3 className="text-xl font-bold text-slate-900">Quick Self-Check</h3>
      </div>

      {questions.map((q, qIndex) => {
        const userAnswer = answers[qIndex];
        const isCorrect = userAnswer === q.correctAnswer;
        const showResult = showResults[qIndex];

        return (
          <div
            key={qIndex}
            className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200"
          >
            <p className="font-semibold text-slate-900 mb-4">
              {qIndex + 1}. {q.question}
            </p>

            <div className="space-y-3">
              {q.options.map((option, oIndex) => {
                const isSelected = userAnswer === oIndex;
                const isCorrectOption = oIndex === q.correctAnswer;
                const showCorrect = showResult && isCorrectOption;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(qIndex, oIndex)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showCorrect
                        ? 'bg-green-50 border-green-500'
                        : showIncorrect
                        ? 'bg-red-50 border-red-500'
                        : isSelected
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-white border-slate-200 hover:border-emerald-300'
                    } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          showCorrect
                            ? 'bg-green-500 border-green-500'
                            : showIncorrect
                            ? 'bg-red-500 border-red-500'
                            : isSelected
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-slate-300'
                        }`}
                      >
                        {showCorrect && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                        {showIncorrect && (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span
                        className={`${
                          showCorrect || showIncorrect
                            ? 'font-semibold'
                            : ''
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  isCorrect ? 'bg-green-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p
                      className={`font-semibold mb-1 ${
                        isCorrect ? 'text-green-900' : 'text-blue-900'
                      }`}
                    >
                      {isCorrect ? 'Correct!' : 'Not quite!'}
                    </p>
                    <p
                      className={`text-sm ${
                        isCorrect ? 'text-green-800' : 'text-blue-800'
                      }`}
                    >
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
