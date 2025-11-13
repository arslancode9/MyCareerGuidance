import React, { useState } from 'react';
import { Clock, Plus, X } from 'lucide-react';

export default function MyStudy() {
  const [events, setEvents] = useState([
    { 
      id: 1, 
      day: 0, 
      startTime: 1, 
      endTime: 3, 
      title: 'Shooting Store', 
      tags: [{ text: '01:00', color: 'bg-blue-500' }, { text: '02:00', color: 'bg-blue-500' }] 
    },
    { 
      id: 2, 
      day: 2, 
      startTime: 5, 
      endTime: 6, 
      title: 'The Amazing Hubble', 
      tags: [{ text: '05:00', color: 'bg-blue-500' }] 
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ 
    day: 0, 
    startTime: 1, 
    endTime: 2, 
    title: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleReset = () => setEvents([]);
  const handleAddTag = () => {
    if (tagInput.trim()) {
      setNewEvent({
        ...newEvent,
        tags: [...newEvent.tags, { text: tagInput, color: 'bg-blue-500' }]
      });
      setTagInput('');
    }
  };
  const handleRemoveTag = (index) => {
    setNewEvent({
      ...newEvent,
      tags: newEvent.tags.filter((_, i) => i !== index)
    });
  };
  const handleAddEvent = () => {
    if (newEvent.title.trim() && newEvent.endTime > newEvent.startTime) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ day: 0, startTime: 1, endTime: 2, title: '', tags: [] });
      setShowModal(false);
    }
  };
  const handleDeleteEvent = (id) => setEvents(events.filter(e => e.id !== id));
  const getEventHeight = (start, end) => (end - start) * 80;
  const formatTime = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <div className="min-h-screen bg-white p-3 sm:p-6 sm:mt-43 md:p-10 md:mt-23  lg:ml-12 lg:mt-24 transition-all">
      <div className="max-w-[1400px] mx-auto relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Schedule Management
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Event</span>
              <span className="sm:hidden">Add</span>
            </button>
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none px-4 py-2 border border-blue-500 text-blue-500 text-sm rounded-lg hover:bg-blue-50"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Calendar (Desktop View) */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-8">
            <div className="p-3 bg-gray-50 flex items-center justify-center border-b border-r border-gray-200">
              <Clock size={18} className="text-gray-400" />
            </div>
            {days.map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 bg-gray-50 border-b border-gray-200">
                {day}
              </div>
            ))}
          </div>

          <div className="relative">
            {hours.slice(0, 10).map(hour => (
              <div key={hour} className="grid grid-cols-8 border-b border-gray-100">
                <div className="p-3 text-xs text-gray-500 bg-gray-50 border-r border-gray-200 flex items-start">
                  {formatTime(hour)}
                </div>
                {days.map((_, dayIndex) => {
                  const dayEvents = events.filter(e => e.day === dayIndex && e.startTime === hour);
                  return (
                    <div key={dayIndex} className="relative p-2 border-r border-gray-100">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          className="bg-blue-50 border-l-4 border-blue-500 rounded-md p-2 mb-1 group hover:shadow-md transition-all"
                          style={{ height: `${getEventHeight(event.startTime, event.endTime) - 8}px` }}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap gap-1 mb-1">
                                {event.tags.map((tag, i) => (
                                  <span key={i} className={`inline-block px-1.5 py-0.5 ${tag.color} text-white text-xs rounded`}>
                                    {tag.text}
                                  </span>
                                ))}
                              </div>
                              <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} className="text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (List Layout) */}
        <div className="block lg:hidden mt-4">
          <div className="flex flex-col gap-3">
            {events.length === 0 ? (
              <p className="text-gray-400 text-center py-6">No events added yet.</p>
            ) : (
              events.map(event => (
                <div key={event.id} className="p-4 border rounded-xl bg-blue-50 border-blue-200 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    <button onClick={() => handleDeleteEvent(event.id)}>
                      <X size={16} className="text-gray-500 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-600">
                      📅 {days[event.day]}
                    </span>
                    <span className="text-xs text-gray-600">
                      ⏰ {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {event.tags.map((tag, i) => (
                      <span key={i} className={`inline-block px-2 py-0.5 ${tag.color} text-white text-xs rounded`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Event Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Add New Event</h2>
              
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter event name"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Add tag"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {newEvent.tags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                        {tag.text}
                        <button onClick={() => handleRemoveTag(i)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Day Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                  <select
                    value={newEvent.day}
                    onChange={(e) => setNewEvent({ ...newEvent, day: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    {days.map((day, i) => (
                      <option key={i} value={i}>{day}</option>
                    ))}
                  </select>
                </div>

                {/* Time Select */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <select
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      {hours.map(h => (
                        <option key={h} value={h}>{formatTime(h)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <select
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      {hours.filter(h => h > newEvent.startTime).map(h => (
                        <option key={h} value={h}>{formatTime(h)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleAddEvent}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                >
                  Add Event
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNewEvent({ day: 0, startTime: 1, endTime: 2, title: '', tags: [] });
                    setTagInput('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
