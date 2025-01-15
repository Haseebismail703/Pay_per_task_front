import React from 'react';
import { Collapse, Typography } from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;

const FAQs: React.FC = () => {
  const faqData = [
    {
      question: 'What is a Pay Per Task website?',
      answer: 'A Pay Per Task website allows users to earn money by completing simple tasks such as surveys, data entry, or mobile app testing.',
    },
    {
      question: 'How do I sign up?',
      answer: 'Click the "Sign Up" button at the top of the page and fill out the registration form with your details.',
    },
    {
      question: 'Are there any fees to join?',
      answer: 'No, joining our platform is completely free. You can start earning immediately after signing up.',
    },
    {
      question: 'When will I receive my payment?',
      answer: 'Payments are processed weekly, and you can withdraw your earnings once they reach the minimum threshold.',
    },
    {
      question: 'What types of tasks are available?',
      answer: 'Tasks include surveys, app testing, social media engagement, data entry, and more.',
    },
  ];

  return (
    <div className="faqs-section">
      <Title level={2} className="faqs-title">
        Frequently Asked Questions
      </Title>
      <Collapse accordion className="faqs-collapse">
        {faqData.map((faq, index) => (
          <Panel header={faq.question} key={index}>
            <p>{faq.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQs;
