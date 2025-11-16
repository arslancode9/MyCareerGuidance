import React from 'react';

export default function EducationalGuidance() {
  const quizData = [
    { name: 'Quiz Name 06', score: 420, maxScore: 450 },
    { name: 'Quiz Name 05', score: 380, maxScore: 450 },
    { name: 'Quiz Name 04', score: 340, maxScore: 450 },
    { name: 'Quiz Name 03', score: 280, maxScore: 450 },
    { name: 'Quiz Name 02', score: 310, maxScore: 450 },
    { name: 'Quiz Name 01', score: 350, maxScore: 450 },
  ];

  const categories = [
    {
      letter: 'B',
      title: 'Clerical/Organisational 88%',
      description: 'Lorem Ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem Ipsum may be used as a placeholder before final copy is available.Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
      extraText: 'Lorem Ipsum may be used as a placeholder before final copy is available.Lorem Ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem Ipsum may be used as a placeholder before final copy is available.',
      color: 'bg-blue-500'
    },
    {
      letter: 'I',
      title: 'Influencing/Persuasive 78%',
      description: 'Lorem Ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem Ipsum may be used as a placeholder before final copy is available.Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
      extraText: 'Lorem Ipsum may be used as a placeholder before final copy is available.Lorem Ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem Ipsum may be used as a placeholder before final copy is available.',
      color: 'bg-blue-500'
    },
    {
      letter: 'U',
      title: 'Understanding/Investigative 60%',
      description: 'Lorem Ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem Ipsum may be used as a placeholder before final copy is available.Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
      extraText: 'Lorem Ipsum may be used as a placeholder before final copy is available.Lorem Ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem Ipsum may be used as a placeholder before final copy is available.',
      color: 'bg-blue-500'
    }
  ];

  const getPercentage = (score, maxScore) => {
    return (score / maxScore) * 100;
  };

  return (
    <div className="min-h-screen mt-24 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Occupational Interests
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Lorem Ipsum is a placeholder text commonly used to demonstrate
          </p>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <div className="space-y-4">
            {quizData.map((quiz, index) => (
              <div key={index} className="flex items-center gap-4">
                {/* Quiz Name */}
                <div className="w-28 sm:w-32 text-sm font-medium text-gray-700 shrink-0">
                  {quiz.name}
                </div>

                {/* Progress Bar Container */}
                <div className="flex-1 relative">
                  {/* Background Bar */}
                  <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden relative">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 border-r border-white last:border-r-0"
                        />
                      ))}
                    </div>
                    
                    {/* Progress Bar */}
                    <div
                      className="h-full bg-blue-400 transition-all duration-1000 ease-out"
                      style={{ width: `${getPercentage(quiz.score, quiz.maxScore)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* X-axis Labels */}
          <div className="flex items-center gap-4 mt-2">
            <div className="w-28 sm:w-32 shrink-0"></div>
            <div className="flex-1 flex justify-between px-1">
              <span className="text-xs text-gray-500">0</span>
              <span className="text-xs text-gray-500">50</span>
              <span className="text-xs text-gray-500">100</span>
              <span className="text-xs text-gray-500">150</span>
              <span className="text-xs text-gray-500">200</span>
              <span className="text-xs text-gray-500">250</span>
              <span className="text-xs text-gray-500">300</span>
              <span className="text-xs text-gray-500">350</span>
              <span className="text-xs text-gray-500">400</span>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center shrink-0`}>
                  <span className="text-white text-xl font-bold">{category.letter}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {category.description}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.extraText}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}