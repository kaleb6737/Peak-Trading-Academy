'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Tabs, Tab, Button, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import riskManagementData from '@/data/riskmanagment.json';

const RiskManagement = () => {
  const [currentTab, setCurrentTab] = useState('Lessons'); // Manage active tab
  const [currentSection, setCurrentSection] = useState(
    riskManagementData.sections[0]?.sectionTitle || '' // Default section
  );
  const [quizIndex, setQuizIndex] = useState(0); // Track the current quiz question
  const [quizAnswer, setQuizAnswer] = useState(''); // Store user's answer
  const [score, setScore] = useState(0); // Track quiz score
  const [submitted, setSubmitted] = useState(false); // Ensure feedback shows only after submit
  const [loading, setLoading] = useState(false); // Simulate loading state for lessons

  const router = useRouter();

  const handleTabChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSectionChange = (_, newValue) => {
    setCurrentSection(newValue);
  };

  const generateQuizQuestions = () => {
    const questions = [
      {
        question: `What is the primary purpose of risk management in trading?`,
        options: [
          'To minimize financial losses.',
          'To maximize speculative opportunities.',
          'To eliminate trading risks.',
          'To regulate the market.',
        ],
        correctAnswer: 'To minimize financial losses.',
        explanation: `The primary purpose of risk management is to minimize financial losses by using tools like diversification, stop-loss orders, and proper position sizing.`,
      },
      ...riskManagementData.sections.flatMap((section) =>
        section.content.topics.flatMap((topic) => [
          {
            question: `What is "${topic.topicTitle}"?`,
            options: [
              topic.content.substring(0, 50) + '...',
              'A hypothetical trading concept.',
              'An unrelated trading technique.',
              'A random incorrect answer.',
            ],
            correctAnswer: topic.content.substring(0, 50) + '...',
            explanation: `The concept of "${topic.topicTitle}" revolves around: ${topic.content}. Understanding this is crucial for effective risk management.`,
          },
          {
            question: `Which of the following is a key takeaway from "${topic.topicTitle}"?`,
            options: [
              'Proper implementation of the concept.',
              `Avoiding the concept entirely.`,
              'Ignoring market trends.',
              'Over-leveraging trades.',
            ],
            correctAnswer: 'Proper implementation of the concept.',
            explanation: `The key takeaway is to implement "${topic.topicTitle}" properly to maximize its benefits in risk management and trading strategies.`,
          },
        ])
      ),
    ];

    return questions.slice(0, 10); // Limit to 10 questions
  };

  const quizQuestions = generateQuizQuestions();

  const handleQuizSubmit = () => {
    setSubmitted(true);
    if (quizAnswer === quizQuestions[quizIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setQuizIndex(quizIndex + 1);
    setQuizAnswer('');
    setSubmitted(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#D1C382' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: 2, bgcolor: '#121212', color: '#D1C382', minHeight: '100vh' }}>
      <Button
        onClick={() => router.back()}
        sx={{
          mb: 4,
          bgcolor: '#D1C382',
          color: '#000',
          '&:hover': { bgcolor: '#DAA520' },
        }}
      >
        Back
      </Button>

      <Typography
        variant="h4"
        sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: '#D1C382' }}
      >
        {riskManagementData.lessonTitle}
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        centered
        sx={{
          mb: 4,
          '& .MuiTabs-indicator': { backgroundColor: '#D1C382' },
          '& .MuiTab-root': { color: '#D1C382' },
          '& .Mui-selected': { color: '#DAA520' },
        }}
      >
        <Tab label="Lessons" value="Lessons" />
        <Tab label="Quiz" value="Quiz" />
      </Tabs>

      {currentTab === 'Lessons' ? (
        <>
          <Tabs
            value={currentSection}
            onChange={handleSectionChange}
            centered
            sx={{
              mb: 4,
              '& .MuiTabs-indicator': { backgroundColor: '#D1C382' },
              '& .MuiTab-root': { color: '#D1C382' },
              '& .Mui-selected': { color: '#DAA520' },
            }}
          >
            {riskManagementData.sections.map((section) => (
              <Tab key={section.sectionTitle} label={section.sectionTitle} value={section.sectionTitle} />
            ))}
          </Tabs>

          <Box
            sx={{
              bgcolor: '#1a1a1a',
              borderRadius: '12px',
              p: 4,
              boxShadow: '0 6px 18px rgba(209, 195, 130, 0.2)',
              mb: 4,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, color: '#D1C382' }}>
              {currentSection}
            </Typography>
            {riskManagementData.sections
              .find((section) => section.sectionTitle === currentSection)
              ?.content.topics.map((topic, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#DAA520', mb: 1 }}>
                    {topic.topicTitle}
                  </Typography>
                  <Typography>{topic.content}</Typography>
                </Box>
              ))}
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          {quizIndex < quizQuestions.length ? (
            <>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Question {quizIndex + 1}: {quizQuestions[quizIndex].question}
              </Typography>
              <RadioGroup
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                sx={{ mb: 4, textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}
              >
                {quizQuestions[quizIndex].options.map((option, idx) => (
                  <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
              <Button
                onClick={handleQuizSubmit}
                disabled={!quizAnswer || submitted}
                sx={{
                  bgcolor: '#DAA520',
                  color: '#000',
                  '&:hover': { bgcolor: '#D1C382' },
                }}
              >
                Submit
              </Button>
              {submitted && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      color: quizAnswer === quizQuestions[quizIndex].correctAnswer ? 'green' : 'red',
                    }}
                  >
                    {quizAnswer === quizQuestions[quizIndex].correctAnswer
                      ? 'Correct!'
                      : `Incorrect. The correct answer is: ${quizQuestions[quizIndex].correctAnswer}`}
                  </Typography>
                  <Typography sx={{ mt: 1, color: '#D1C382' }}>
                    {quizQuestions[quizIndex].explanation}
                  </Typography>
                  <Button
                    onClick={handleNextQuestion}
                    sx={{
                      mt: 2,
                      bgcolor: '#D1C382',
                      color: '#000',
                      '&:hover': { bgcolor: '#DAA520' },
                    }}
                  >
                    Next Question
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Typography variant="h5" sx={{ mt: 4 }}>
              Quiz Complete! Your score: {score}/{quizQuestions.length}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RiskManagement;
