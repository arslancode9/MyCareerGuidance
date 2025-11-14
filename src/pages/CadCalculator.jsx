import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import img21 from '/pencil.svg';

export default function CadCalculator() {
  const [subjects, setSubjects] = useState([
    { id: 1, subject: '', level: '', grade: '', active: false },
    { id: 2, subject: '', level: '', grade: '', active: false },
    { id: 3, subject: '', level: '', grade: '', active: false },
    { id: 4, subject: '', level: '', grade: '', active: false },
  ]);

  const [totalPoints, setTotalPoints] = useState(0);

  const pointsMap = {
    Higher: { H1: 100, H2: 88, H3: 77, H4: 66, H5: 56, H6: 46, H7: 37, H8: 0 },
    Ordinary: { O1: 56, O2: 46, O3: 37, O4: 28, O5: 20, O6: 12, O7: 0, O8: 0 },
    Foundation: { F1: 20, F2: 12, F3: 0, F4: 0, F5: 0, F6: 0 },
  };

  const subjectsList = [
    'Mathematics', 'English', 'Irish', 'Biology', 'Chemistry', 'Physics',
    'History', 'Geography', 'French', 'German', 'Spanish',
    'Business', 'Accounting', 'Economics', 'Art', 'Music'
  ];

  const levels = ['Higher', 'Ordinary', 'Foundation'];

  const getGradesForLevel = (level) => {
    if (level === 'Higher') return ['H1','H2','H3','H4','H5','H6','H7','H8'];
    if (level === 'Ordinary') return ['O1','O2','O3','O4','O5','O6','O7','O8'];
    if (level === 'Foundation') return ['F1','F2','F3','F4','F5','F6'];
    return [];
  };

  const calculatePoints = () => {
    const activeSubjects = subjects.filter(s => s.active && s.subject && s.level && s.grade);
    const sortedByPoints = activeSubjects
      .map(s => ({ ...s, points: pointsMap[s.level]?.[s.grade] || 0 }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 6);

    const total = sortedByPoints.reduce((sum, s) => sum + s.points, 0);
    setTotalPoints(total);
  };

  useEffect(() => {
    calculatePoints();
  }, [subjects]);

  const addSubject = () => {
    const newId = Math.max(...subjects.map(s => s.id), 0) + 1;
    setSubjects([...subjects, { id: newId, subject: '', level: '', grade: '', active: false }]);
  };

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(s => {
      if (s.id === id) {
        const updated = { ...s, [field]: value };
        if (field === 'level') updated.grade = '';
        return updated;
      }
      return s;
    }));
  };

  const toggleActive = (id) => {
    setSubjects(subjects.map(s => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  const removeSubject = (id) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const clearAll = () => {
    setSubjects([
      { id: 1, subject: '', level: '', grade: '', active: false },
      { id: 2, subject: '', level: '', grade: '', active: false },
      { id: 3, subject: '', level: '', grade: '', active: false },
      { id: 4, subject: '', level: '', grade: '', active: false },
    ]);
    setTotalPoints(0);
  };

  const percentage = Math.min((totalPoints / 625) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 mt-16 lg:mt-20 lg:ml-23">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2">
          <div>
            <h1 className="text-[#474749] text-2xl font-semibold">My CAO Points:</h1>
            <p className="text-[#737373] text-sm">Estimate your CAO points with ease.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mt-6 sm:mt-10">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Subjects</h2>
              <button
                onClick={addSubject}
                className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-3 mb-3 px-2 text-sm font-semibold text-gray-600">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Subject</div>
              <div className="col-span-3">Level</div>
              <div className="col-span-3">Grade</div>
              <div className="col-span-1"></div>
            </div>

            {/* Subject Rows */}
            <div className="space-y-3">
              {subjects.map((subject, index) => (
                <div
                  key={subject.id}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-3 rounded-lg transition-colors border ${
                    subject.active ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="md:col-span-1 text-center">
                    <span className="text-sm font-medium text-gray-600">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="md:col-span-4">
                    <select
                      value={subject.subject}
                      onChange={(e) => updateSubject(subject.id, 'subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pick Subject</option>
                      {subjectsList.map(subj => <option key={subj} value={subj}>{subj}</option>)}
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <select
                      value={subject.level}
                      onChange={(e) => updateSubject(subject.id, 'level', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Level</option>
                      {levels.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <select
                      value={subject.grade}
                      onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                      disabled={!subject.level}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Select Grade</option>
                      {subject.level && getGradesForLevel(subject.level).map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-1 flex items-center justify-center gap-3">
                    <button
                      onClick={() => toggleActive(subject.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        subject.active
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white'
                      }`}
                      disabled={!subject.subject || !subject.level || !subject.grade}
                    >
                      <img src={img21} alt="edit" className="w-4 h-4" />
                    </button>

                    {subjects.length > 1 && (
                      <button
                        onClick={() => removeSubject(subject.id)}
                        className="w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={calculatePoints}
                className="px-8 py-3 w-full sm:w-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
              >
                Calculate
              </button>
              <button
                onClick={clearAll}
                className="px-8 py-3 w-full sm:w-auto border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="bg-liner-to-b from-white to-blue-50 rounded-2xl shadow-sm p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">My Expected Points</h2>

            {/* Circle */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
                <circle cx="128" cy="128" r="110" stroke="#E5E7EB" strokeWidth="20" fill="none" />
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="#3B82F6"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 110}
                  strokeDashoffset={2 * Math.PI * 110 * (1 - percentage / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl sm:text-5xl font-bold text-gray-800">{totalPoints}</div>
                <div className="text-gray-500 font-medium">Points</div>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mb-6 px-8">
              <span>0</span>
              <span>625</span>
            </div>

            <div className="border-t border-gray-200 pt-4 text-center">
              <div className="text-sm text-gray-500 mb-2">CAO Points</div>
              <div className="text-lg font-semibold text-gray-800">
                Expected: <span className="text-blue-500">{totalPoints}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
