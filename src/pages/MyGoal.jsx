import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import img20 from '/Caclulator.svg'
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
    secs: 0
  });

  // Calculate time difference
  useEffect(() => {
    if (!formData.deadline) return;

    const calculateTimeLeft = () => {
      const deadline = new Date(formData.deadline).getTime();
      const now = new Date().getTime();
      const difference = deadline - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000)
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
    const newActions = [...formData.actions];
    newActions[index] = value;
    setFormData({ ...formData, actions: newActions });
  };

  const handleDownloadPDF = () => {
    const content = `
MY GOALS
========

What's the best way for employers to contact you?
${formData.contactMethod || 'Not specified'}

What I want to Become:
${formData.becomeWhat || 'Not specified'}

Specific Goal for the Year:
${formData.specificGoal || 'Not specified'}

5 Actions to Achieve the Above:
${formData.actions.map((action, i) => `${i + 1}. ${action || 'Not specified'}`).join('\n')}

Is this Realistic?
${formData.isRealistic === 'yes' ? 'Yes' : 'No'}

How Long Do I Have?
${formData.deadline ? new Date(formData.deadline).toLocaleDateString() : 'Not specified'}

Time Remaining:
${timeLeft.days} Days, ${timeLeft.hours} Hours, ${timeLeft.mins} Minutes, ${timeLeft.secs} Seconds
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

  const actionPlaceholders = [
    'Write down your goal',
    'Set a deadline',
    'Work on your mindset',
    'Develop your skillset',
    'Reward yourself'
  ];

  return (
    <div className=" ml-24 mt-22">
      <div className="">
         <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">My Goals</h1>
            <p className="text-gray-500 text-sm">
              Lorem Ipsum is a placeholder text commonly used to demonstrate
            </p>
        <div className="bg-[#F8FAFC] mt-12 p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What's the best way for employers to contact you?
              </label>
              <p className="text-xs text-gray-500 mb-3">
                We suggest including an email and phone number.
              </p>
              <input
                type="text"
                value={formData.contactMethod}
                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                className="w-full placeholder:text-[#6B7280] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What I want to Become:
              </label>
              <input
                type="text"
                value={formData.becomeWhat}
                onChange={(e) => setFormData({ ...formData, becomeWhat: e.target.value })}
                className="w-full placeholder:text-[#6B7280] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="e.g Accountant"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Specific Goal for the Year:
              </label>
              <input
                type="text"
                value={formData.specificGoal}
                onChange={(e) => setFormData({ ...formData, specificGoal: e.target.value })}
                className="w-full placeholder:text-[#6B7280] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Get more organized with a daily planner"
              />
            </div>
            <div className=''>
              <label className=" text-sm font-semibold text-gray-700 mb-3">
                5 Actions to Achieve the Above:
              </label>
              <div className="grid grid-cols-5 gap-3 mt-3">
                {formData.actions.map((action, index) => (
                  <input
                    key={index}
                    type="text"
                    value={action}
                    onChange={(e) => handleActionChange(index, e.target.value)}
                    className="px-4 placeholder:text-[#6B7280] py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder={actionPlaceholders[index]}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Is this Realistic ?
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="realistic"
                    value="yes"
                    checked={formData.isRealistic === 'yes'}
                    onChange={(e) => setFormData({ ...formData, isRealistic: e.target.value })}
                    className="w-4 h-4 placeholder:text-[#6B7280] text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="realistic"
                    value="no"
                    checked={formData.isRealistic === 'no'}
                    onChange={(e) => setFormData({ ...formData, isRealistic: e.target.value })}
                    className="w-4 h-4 placeholder:text-[#6B7280] text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                How Long Do I Have?
              </label>
              <div className=" w-1/2 relative px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ">
                <input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className=" placeholder:text-[#6B7280]  [&::-webkit-calendar-picker-indicator]:hidden"
                />
                <img 
                src={img20} 
                alt="calender" 
                onClick={() =>document.getElementById("deadline").showPicker()} 
                className='absolute top-5 right-5 -translate-y-1/2'
                />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-center gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-red-500">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Days</div>
                </div>
                <div className="text-2xl sm:text-3xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-800">
                    {timeLeft.hours}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Hours</div>
                </div>
                <div className="text-2xl sm:text-3xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-800">
                    {timeLeft.mins}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Mins</div>
                </div>
                <div className="text-2xl sm:text-3xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-800">
                    {timeLeft.secs}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Secs</div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
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