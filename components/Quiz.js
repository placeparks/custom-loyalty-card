// components/Quiz.js
import React, { useState } from 'react';
import styles from "../styles/Home.module.css"
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const questions = [
  {
    question: "What is blockchain primarily used for?",
    options: ["Smart Contracts", "Data Storage", "Streaming", "Gaming"],
    answer: "Smart Contracts",
  },
  {
    question: "What consensus algorithm does Bitcoin use?",
    options: ["PoS", "PoA", "PoW", "DPoS"],
    answer: "PoW",
  },
    {
        question: "Which programming language is commonly used to write Ethereum smart contracts?",
        options: ["JavaScript", "Python", "Solidity", "Rust"],
        answer: "Solidity",
      },
      {
        question: "What is a decentralized application (dApp)?",
        options: [
          "An app run by a single entity",
          "An app that requires permission to use",
          "An app that runs on a centralized server",
          "An app that runs on a decentralized network",
        ],
        answer: "An app that runs on a decentralized network",
      },
      {
        question: "What is the main advantage of using a blockchain?",
        options: [
          "Speed",
          "Low Cost",
          "Transparency and Security",
          "Ease of Use",
        ],
        answer: "Transparency and Security",
      },
      
];

export default function Quiz({ onQuizCompletion }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const checkAnswer = () => {
    let newScore = score;
    if (questions[currentQuestion].answer === selectedOption) {
      newScore = newScore + 1;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setScore(newScore);
    } else {
      console.log("Final Score:", newScore);  // Debugging line
      console.log("Total Questions:", questions.length);  // Debugging line
      onQuizCompletion(newScore === questions.length);
    }
  };
  

  return (
    <div>
    <Card className="mb-4">
      <Card.Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Card.Title>Blockchain Quiz</Card.Title>
          <Button variant="primary" onClick={checkAnswer}>Next</Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {questions[currentQuestion].question}
        </Card.Text>
        <Form>
          <Row className="mb-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Col md={6} key={index}>
                <Form.Check 
                  type="radio"
                  id={`radio-${index}`}
                  label={option}
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </Col>
            ))}
          </Row>
        </Form>
      </Card.Body>
    </Card>
  </div>
  );
}
