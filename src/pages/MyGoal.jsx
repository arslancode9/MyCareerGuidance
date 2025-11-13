import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import img20 from '/Caclulator.svg';

export default function MyGoals() {
  const [formData, setFormData] = useState({
    contactMethod: '',
    becomeWhat: '',
    specificGoal: '',
    actions: ['', '', '', '', ''],
    isRealistic: 'yes',
    deadline: '',
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  // Calculate countdown
  useEffect(() => {
    if (!formData.deadline) return;

    const calculateTimeLeft = () => {
      const deadline = new Date(formData.deadline).getTime();
      const now = new Date().getTime();
      const diff = deadline - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [formData.deadline]);

  const handleActionChange = (index, value) => {
    const updatedActions = [...formData.actions];
    updatedActions[index] = value;
    setFormData({ ...formData, actions: updatedActions });
  };

  const handleDownload = () => {
    const content = `
MY GOALS
========
Contact: ${formData.contactMethod || 'Not specified'}
Become: ${formData.becomeWhat || 'Not specified'}
Goal: ${formData.specificGoal || 'Not specified'}
Actions:
${formData.actions.map((a, i) => `${i + 1}. ${a || 'Not specified'}`).join('\n')}
Realistic: ${formData.isRealistic === 'yes' ? 'Yes' : 'No'}
Deadline: ${formData.deadline ? new Date(formData.deadline).toLocaleDateString() : 'Not specified'}
Remaining: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.mins}m ${timeLeft.secs}s
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-goals.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const placeholders = [
    'Write down your goal',
    'Set a deadline',
    'Work on your mindset',
    'Develop your skillset',
    'Reward yourself',
  ];

  return (
    <div className=" md:ml-24 mt-16 p-4 sm:p-6 ">
      <div className="">
        {/* Header */}
        <div className="text-center md:text-left lg:w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            My Goals
          </h1>
          <p className="text-gray-500 text-sm">
            Define your goals clearly and track your progress effectively.
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#F8FAFC] mt-10 p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="space-y-6">
            {/* Contact */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Best way for employers to contact you
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Include an email or phone number.
              </p>
              <input
                type="text"
                value={formData.contactMethod}
                onChange={(e) =>
                  setFormData({ ...formData, contactMethod: e.target.value })
                }
                className="w-full placeholder:text-gray-400 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="email@example.com"
              />
            </div>

            {/* Become */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What I want to become
              </label>
              <input
                type="text"
                value={formData.becomeWhat}
                onChange={(e) =>
                  setFormData({ ...formData, becomeWhat: e.target.value })
                }
                className="w-full placeholder:text-gray-400 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="e.g. Accountant"
              />
            </div>

            {/* Specific Goal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specific goal for this year
              </label>
              <input
                type="text"
                value={formData.specificGoal}
                onChange={(e) =>
                  setFormData({ ...formData, specificGoal: e.target.value })
                }
                className="w-full placeholder:text-gray-400 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Get more organized with a daily planner"
              />
            </div>

            {/* 5 Actions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                5 Actions to achieve this goal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mt-3">
                {formData.actions.map((action, i) => (
                  <input
                    key={i}
                    type="text"
                    value={action}
                    onChange={(e) => handleActionChange(i, e.target.value)}
                    className="w-full placeholder:text-gray-400 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder={placeholders[i]}
                  />
                ))}
              </div>
            </div>

            {/* Realistic */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Is this realistic?
              </label>
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="realistic"
                    value="yes"
                    checked={formData.isRealistic === 'yes'}
                    onChange={(e) =>
                      setFormData({ ...formData, isRealistic: e.target.value })
                    }
                    className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="realistic"
                    value="no"
                    checked={formData.isRealistic === 'no'}
                    onChange={(e) =>
                      setFormData({ ...formData, isRealistic: e.target.value })
                    }
                    className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How long do I have?
              </label>
              <div className="relative w-full sm:w-2/3 lg:w-1/2">
                <input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-gray-400 [&::-webkit-calendar-picker-indicator]:hidden"
                />
                <img
                  src={img20}
                  alt="calendar"
                  onClick={() => document.getElementById('deadline').showPicker()}
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 cursor-pointer"
                />
              </div>
            </div>

            {/* Timer */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mt-6">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                {['Days', 'Hours', 'Mins', 'Secs'].map((label, i) => {
                  const value = [timeLeft.days, timeLeft.hours, timeLeft.mins, timeLeft.secs][i];
                  return (
                    <div key={label} className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-gray-800">
                        {value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
