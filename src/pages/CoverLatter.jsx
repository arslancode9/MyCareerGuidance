import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Plus, Check, Calendar, Mail, FileText } from 'lucide-react';
import img20 from '/email.svg'
import img21 from '/Drive.svg'
export default function CoverLetter() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Profile
    fullName: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    town: '',
    city: '',
    eircode: '',
    objective: '',
    
    // Education
    educations: [{
      schoolName: '',
      monthYear: '',
      examsTaken: '',
      includeJuniorCert: 'yes',
      subject: '',
      level: '',
      result: ''
    }],
    
    // Work Experience
    workExperiences: [{
      jobTitle: '',
      companyName: '',
      city: '',
      country: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyWork: false
    }],
    
    // Skills
    skills: [],
    
    // Interests
    interests: '',
    
    // References
    includeReferences: 'One',
    references: [{
      name: '',
      position: '',
      contactPhone: '',
      contactEmail: ''
    }]
  });

  const steps = [
    { number: 1, name: 'PERSONAL PROFILE', icon: '01' },
    { number: 2, name: 'EDUCATION', icon: '02' },
    { number: 3, name: 'WORK EXPERIENCE', icon: '03' },
    { number: 4, name: 'SKILLS', icon: '04' },
    { number: 5, name: 'INTERESTS', icon: '05' },
    { number: 6, name: 'REFERENCES', icon: '06' }
  ];

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      educations: [...formData.educations, {
        schoolName: '',
        monthYear: '',
        examsTaken: '',
        includeJuniorCert: 'yes',
        subject: '',
        level: '',
        result: ''
      }]
    });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [...formData.workExperiences, {
        jobTitle: '',
        companyName: '',
        city: '',
        country: '',
        startDate: '',
        endDate: '',
        description: '',
        currentlyWork: false
      }]
    });
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

 const renderStepIndicator = () => (
  <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8 pt-3 w-full gap-4">
    {steps.map((step, index) => (
      <React.Fragment key={step.number}>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
          <button
            onClick={() => setCurrentStep(step.number)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 hover:scale-110
              ${
                currentStep === step.number
                  ? 'bg-blue-600 text-white shadow-md'
                  : currentStep > step.number
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
          >
            {currentStep > step.number ? <Check size={18} /> : step.icon}
          </button>

          <span
            className={`text-[11px] sm:text-xs font-medium text-center md:text-left leading-tight
              ${currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'}
            `}
          >
            {step.name}
          </span>
        </div>

        {/* Connector line */}
        {index < steps.length - 1 && (
          <div
            className={`hidden md:block flex-1 h-0.5 mx-2 ${
              currentStep > step.number ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            style={{ minWidth: '40px' }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);
  const renderPersonalProfile = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          What's the best way for employers to contact you?
        </h2>
        <p className="text-sm text-gray-500 mb-4">We suggest including an email and phone number</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block  text-[#111928] font-semibold  mb-2">
            Full Name*
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            placeholder="e.g Maria"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-[#111928] font-semibold mb-2">
            Email Address*
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="e.g mbslucas0@gmail.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#111928] font-semibold mb-2">
          Address line 1*
        </label>
        <input
          type="text"
          value={formData.addressLine1}
          onChange={(e) => updateFormData('addressLine1', e.target.value)}
          placeholder="Temporary Address"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-[#111928] font-semibold mb-2">
          Address line 2*
        </label>
        <input
          type="text"
          value={formData.addressLine2}
          onChange={(e) => updateFormData('addressLine2', e.target.value)}
          placeholder="Permanent Address"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-[#111928] font-semibold ">
            Town*
          </label>
          <input
            type="text"
            value={formData.town}
            onChange={(e) => updateFormData('town', e.target.value)}
            placeholder="e.g Cebu City, Cebu"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-[#111928] font-semiboldmb-2">
            City*
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            placeholder="e.g Cebu City, Cebu"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-[#111928] font-semibold ">
            Eircode/Code*
          </label>
          <input
            type="text"
            value={formData.eircode}
            onChange={(e) => updateFormData('eircode', e.target.value)}
            placeholder="e.g Cebu City, Cebu"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#111928] font-semibold mb-2">
          Objective*
        </label>
        <textarea
          value={formData.objective}
          onChange={(e) => updateFormData('objective', e.target.value)}
          placeholder="Write Your Objective............"
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Tell us about your Education
        </h2>
        <p className="text-[#6B7280]  mb-4">
          Include every school, even if you're still there or didn't graduate
        </p>
      </div>

      {formData.educations.map((edu, index) => (
        <div key={index} className="space-y-4 pb-6 border-b border-gray-200 last:border-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#111928] font-semibold mb-2">
                School Name*
              </label>
              <input
                type="text"
                placeholder="e.g School Name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#111928] font-semibold mb-2">
                Month/Year*
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#111928] font-semibold mb-2">
              Exams Taken*
            </label>
            <input
              type="text"
              placeholder="Exam Taken"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-[#111928] font-semibold mb-2">
              Include Junior Cert Results*
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name={`juniorCert${index}`} value="yes" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name={`juniorCert${index}`} value="no" className="w-4 h-4" />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#111928] font-semibold ">
                Subject*
              </label>
              <input
                type="text"
                placeholder="e.g Subject"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#111928] font-semibold">
                Level*
              </label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select</option>
              </select>
            </div>
            <div>
              <label className="block text-[#111928] font-semibold ">
                Result*
              </label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Merit</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full py-3 border-2 border-dashed border-blue-400 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={20} />
        ADD ANOTHER EDUCATION
      </button>
    </div>
  );

  const renderWorkExperience = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Tell us about your most recent job
        </h2>
        <p className="text-sm text-gray-500 mb-4">We'll start there and work backwards</p>
      </div>

      {formData.workExperiences.map((work, index) => (
        <div key={index} className="space-y-4 pb-6 border-b border-gray-200 last:border-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#111928] font-semibold mb-2">
                Job Title*
              </label>
              <input
                type="text"
                placeholder="e.g Retail Sales Associate"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#111928] font-semibold mb-2">
                Company Name*
              </label>
              <input
                type="text"
                placeholder="e.g H&M"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#111928] font-semibold mb-2">
                City*
              </label>
              <input
                type="text"
                placeholder="e.g Cebu City, Cebu"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#111928] font-semibold mb-2">
                Country*
              </label>
              <input
                type="text"
                placeholder="e.g Philippines"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#111928] font-semibold mb-2">
                Start Date*
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div>
              <label className="block text-[#111928] font-semibold mb-2">
                End Date*
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#111928] font-semibold mb-2">
              Description*
            </label>
            <textarea
              placeholder="Add Description"
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="text-sm text-gray-700">I Currently Work here</span>
          </label>
        </div>
      ))}

      <button
        onClick={addWorkExperience}
        className="w-full py-3 border-2 border-dashed border-blue-400 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={20} />
        ADD ANOTHER POSITION
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Skills</h2>
        <p className="text-sm text-gray-500 mb-4">Include All skills that you have</p>
      </div>

      <div>
        <label className="block text-[#111928] font-semibold mb-2">
          Skill*
        </label>
        <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Select ONE</option>
          <option>Select TWO</option>
          <option>Select THREE</option>
          <option>Select FOURE</option>
        </select>
      </div>
    </div>
  );

  const renderInterests = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          What interests do you have?
        </h2>
        <p className="text-sm text-gray-500 mb-4">Include All Hobbies, or Intrests</p>
      </div>

      <div>
        <label className="block text-[#111928] font-semibold mb-2">
          Interest*
        </label>
        <textarea
          value={formData.interests}
          onChange={(e) => updateFormData('interests', e.target.value)}
          placeholder="Write Your Interests..................."
          rows={6}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );

  const renderReferences = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">References</h2>
        <p className="text-sm text-gray-500 mb-4">
          Add anything else you want employers to know
        </p>
      </div>

      <div>
        <label className="block text-[#111928] font-semibold mb-2">
          Do you want to Include Refrences*
        </label>
        <select
          value={formData.includeReferences}
          onChange={(e) => updateFormData('includeReferences', e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option>One</option>
          <option>Two</option>
          <option>Three</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#111928] font-semibold mb-2">
            Name*
          </label>
          <input
            type="text"
            placeholder="Daniel Brot"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-[#111928] font-semibold mb-2">
            Position*
          </label>
          <input
            type="text"
            placeholder="e.g H&M"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#111928] font-semibold mb-2">
            Contact Phone*
          </label>
          <input
            type="tel"
            placeholder="+XX-XXX-XXX-XXXX"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-[#111928] font-semibold mb-2">
            Contact Email*
          </label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1: return renderPersonalProfile();
      case 2: return renderEducation();
      case 3: return renderWorkExperience();
      case 4: return renderSkills();
      case 5: return renderInterests();
      case 6: return renderReferences();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen mt-20 p-4 sm:w-full lg:p-8">
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                  CV/Cover Letter
                </h1>
                <p className="text-sm text-gray-500">
                  Lorem Ipsum is a placeholder text commonly used to demonstrate
                </p>
              </div>
              {currentStep === 6 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">New Featured:</span>
                  <button className="px-3 py-2 flex items-center gap-2 text-[16px] text-gray-500 ">
                    <img src={img20} alt="" />
                    <span className="hidden sm:inline">Send to Email</span>
                  </button>
                  <button className="px-3 py-2 flex items-center gap-2 text-[16px] text-gray-500">
                    <img src={img21} alt="" />
                    <span className="hidden sm:inline">Save to Drive</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        <div className="bg-[#F8FAFC] p-6 sm:p-8 lg:p-10">

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="px-6 py-2.5 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center gap-2"
              >
                <ChevronLeft size={18} />
                BACK
              </button>
            ) : (
              <div />
            )}

            {currentStep === 6 ? (
              <div className="flex gap-3">
                <button className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                  View CV
                </button>
                <button className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                  Save PDF
                </button>
              </div>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
              >
                NEXT
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
    </div>
  );
}
