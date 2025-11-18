import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Plus, Check, Calendar, Mail, FileText, X, Download, Save, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import img20 from '/email.svg'
import img21 from '/Drive.svg'
export default function CoverLetter() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCVModal, setShowCVModal] = useState(false);
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

  // Load saved CV from localStorage on mount
  useEffect(() => {
    const savedCV = localStorage.getItem('savedCV');
    if (savedCV) {
      try {
        const parsed = JSON.parse(savedCV);
        setFormData(parsed);
      } catch (e) {
        console.error('Error loading saved CV:', e);
      }
    }
  }, []);

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateEducation = (index, field, value) => {
    const newEducations = [...formData.educations];
    newEducations[index] = { ...newEducations[index], [field]: value };
    setFormData({ ...formData, educations: newEducations });
  };

  const updateWorkExperience = (index, field, value) => {
    const newWorkExperiences = [...formData.workExperiences];
    newWorkExperiences[index] = { ...newWorkExperiences[index], [field]: value };
    setFormData({ ...formData, workExperiences: newWorkExperiences });
  };

  const updateReference = (index, field, value) => {
    const newReferences = [...formData.references];
    newReferences[index] = { ...newReferences[index], [field]: value };
    setFormData({ ...formData, references: newReferences });
  };

  const updateSkills = (value) => {
    if (value && !formData.skills.includes(value)) {
      setFormData({ ...formData, skills: [...formData.skills, value] });
    }
  };

  // Save CV to localStorage
  const handleSaveCV = () => {
    try {
      localStorage.setItem('savedCV', JSON.stringify(formData));
      toast.success('CV saved successfully!');
    } catch (e) {
      toast.error('Failed to save CV');
    }
  };

  // View CV Modal
  const handleViewCV = () => {
    setShowCVModal(true);
  };

  // Download CV as PDF
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    const cvContent = generateCVHTML();
    printWindow.document.write(cvContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
    toast.success('PDF download initiated');
  };

  // Send CV via Email
  const handleSendEmail = () => {
    const email = prompt('Enter recipient email address:');
    if (email) {
      const subject = encodeURIComponent(`CV - ${formData.fullName || 'My CV'}`);
      const body = encodeURIComponent(`Please find attached my CV.\n\n${generateCVText()}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      toast.success(`Email client opened for ${email}`);
    }
  };

  // Save to Google Drive (simulated)
  const handleSaveToDrive = () => {
    // In a real application, this would use Google Drive API
    // For now, we'll simulate it by saving to localStorage with a special flag
    try {
      const driveData = {
        ...formData,
        savedToDrive: true,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('cvSavedToDrive', JSON.stringify(driveData));
      
      // Simulate Google Drive API call
      console.log('📧 Saving to Google Drive:', {
        fileName: `${formData.fullName || 'CV'}_${Date.now()}.pdf`,
        content: formData
      });
      
      toast.success('CV saved to Google Drive successfully!');
      alert('✅ CV saved to Google Drive!\n\n(Note: In production, this would use Google Drive API to actually save the file)');
    } catch (e) {
      toast.error('Failed to save to Google Drive');
    }
  };

  // Generate CV HTML for printing/downloading
  const generateCVHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CV - ${formData.fullName || 'My CV'}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
          h1 { color: #1476B7; border-bottom: 2px solid #1476B7; padding-bottom: 10px; }
          h2 { color: #333; margin-top: 30px; }
          .section { margin-bottom: 25px; }
          .contact-info { margin-bottom: 20px; }
          ul { list-style-type: disc; margin-left: 20px; }
        </style>
      </head>
      <body>
        <h1>${formData.fullName || 'Full Name'}</h1>
        <div class="contact-info">
          <p><strong>Email:</strong> ${formData.email || 'N/A'}</p>
          <p><strong>Address:</strong> ${formData.addressLine1 || ''} ${formData.addressLine2 || ''}, ${formData.town || ''}, ${formData.city || ''}, ${formData.eircode || ''}</p>
        </div>
        
        ${formData.objective ? `<div class="section"><h2>Objective</h2><p>${formData.objective}</p></div>` : ''}
        
        ${formData.educations && formData.educations.length > 0 ? `
          <div class="section">
            <h2>Education</h2>
            ${formData.educations.map(edu => `
              <div style="margin-bottom: 15px;">
                <strong>${edu.schoolName || 'School Name'}</strong> - ${edu.monthYear || 'Date'}<br>
                ${edu.examsTaken || ''} - ${edu.subject || ''} (${edu.level || ''}) - ${edu.result || ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${formData.workExperiences && formData.workExperiences.length > 0 ? `
          <div class="section">
            <h2>Work Experience</h2>
            ${formData.workExperiences.map(work => `
              <div style="margin-bottom: 15px;">
                <strong>${work.jobTitle || 'Job Title'}</strong> at ${work.companyName || 'Company'}<br>
                ${work.city || ''}, ${work.country || ''} | ${work.startDate || ''} - ${work.currentlyWork ? 'Present' : work.endDate || ''}<br>
                <p>${work.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${formData.skills && formData.skills.length > 0 ? `
          <div class="section">
            <h2>Skills</h2>
            <ul>
              ${formData.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${formData.interests ? `<div class="section"><h2>Interests</h2><p>${formData.interests}</p></div>` : ''}
        
        ${formData.references && formData.references.length > 0 ? `
          <div class="section">
            <h2>References</h2>
            ${formData.references.map(ref => `
              <div style="margin-bottom: 15px;">
                <strong>${ref.name || 'Name'}</strong> - ${ref.position || 'Position'}<br>
                Phone: ${ref.contactPhone || 'N/A'} | Email: ${ref.contactEmail || 'N/A'}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </body>
      </html>
    `;
  };

  // Generate CV as plain text
  const generateCVText = () => {
    let text = `${formData.fullName || 'Full Name'}\n`;
    text += `Email: ${formData.email || 'N/A'}\n`;
    text += `Address: ${formData.addressLine1 || ''} ${formData.addressLine2 || ''}, ${formData.town || ''}, ${formData.city || ''}\n\n`;
    if (formData.objective) text += `Objective:\n${formData.objective}\n\n`;
    if (formData.educations && formData.educations.length > 0) {
      text += 'Education:\n';
      formData.educations.forEach(edu => {
        text += `- ${edu.schoolName || 'School'} - ${edu.monthYear || 'Date'}\n`;
      });
      text += '\n';
    }
    if (formData.workExperiences && formData.workExperiences.length > 0) {
      text += 'Work Experience:\n';
      formData.workExperiences.forEach(work => {
        text += `- ${work.jobTitle || 'Job'} at ${work.companyName || 'Company'}\n`;
      });
      text += '\n';
    }
    return text;
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
    <div className="space-y-8">
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
                value={edu.schoolName}
                onChange={(e) => updateEducation(index, 'schoolName', e.target.value)}
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
                  value={edu.monthYear}
                  onChange={(e) => updateEducation(index, 'monthYear', e.target.value)}
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
              value={edu.examsTaken}
              onChange={(e) => updateEducation(index, 'examsTaken', e.target.value)}
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
                <input 
                  type="radio" 
                  name={`juniorCert${index}`} 
                  value="yes" 
                  checked={edu.includeJuniorCert === 'yes'}
                  onChange={(e) => updateEducation(index, 'includeJuniorCert', e.target.value)}
                  className="w-4 h-4" 
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name={`juniorCert${index}`} 
                  value="no" 
                  checked={edu.includeJuniorCert === 'no'}
                  onChange={(e) => updateEducation(index, 'includeJuniorCert', e.target.value)}
                  className="w-4 h-4" 
                />
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
                value={edu.subject}
                onChange={(e) => updateEducation(index, 'subject', e.target.value)}
                placeholder="e.g Subject"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#111928] font-semibold">
                Level*
              </label>
              <select 
                value={edu.level}
                onChange={(e) => updateEducation(index, 'level', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Higher">Higher</option>
              </select>
            </div>
            <div>
              <label className="block text-[#111928] font-semibold ">
                Result*
              </label>
              <select 
                value={edu.result}
                onChange={(e) => updateEducation(index, 'result', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="Merit">Merit</option>
                <option value="Distinction">Distinction</option>
                <option value="Pass">Pass</option>
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
                value={work.jobTitle}
                onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
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
                value={work.companyName}
                onChange={(e) => updateWorkExperience(index, 'companyName', e.target.value)}
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
                value={work.city}
                onChange={(e) => updateWorkExperience(index, 'city', e.target.value)}
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
                value={work.country}
                onChange={(e) => updateWorkExperience(index, 'country', e.target.value)}
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
                  value={work.startDate}
                  onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
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
                  value={work.endDate}
                  onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
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
              value={work.description}
              onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
              placeholder="Add Description"
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={work.currentlyWork}
              onChange={(e) => updateWorkExperience(index, 'currentlyWork', e.target.checked)}
              className="w-4 h-4 rounded" 
            />
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
        <select 
          onChange={(e) => updateSkills(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder:text-[#6B7280] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Skill</option>
          <option value="Communication">Communication</option>
          <option value="Leadership">Leadership</option>
          <option value="Problem Solving">Problem Solving</option>
          <option value="Teamwork">Teamwork</option>
          <option value="Time Management">Time Management</option>
        </select>
        {formData.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {formData.skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {skill}
                <button
                  onClick={() => {
                    const newSkills = formData.skills.filter((_, i) => i !== idx);
                    setFormData({ ...formData, skills: newSkills });
                  }}
                  className="ml-2 text-blue-900 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
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
            value={formData.references[0]?.name || ''}
            onChange={(e) => updateReference(0, 'name', e.target.value)}
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
            value={formData.references[0]?.position || ''}
            onChange={(e) => updateReference(0, 'position', e.target.value)}
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
            value={formData.references[0]?.contactPhone || ''}
            onChange={(e) => updateReference(0, 'contactPhone', e.target.value)}
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
            value={formData.references[0]?.contactEmail || ''}
            onChange={(e) => updateReference(0, 'contactEmail', e.target.value)}
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
    <div className="min-h-screen mt-20 p-4 sm:w-full  lg:ml-10 lg:p-8 ">
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
                  <button 
                    onClick={handleSendEmail}
                    className="px-3 py-2 flex items-center gap-2 text-[16px] text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <img src={img20} alt="" />
                    <span className="hidden sm:inline">Send to Email</span>
                  </button>
                  <button 
                    onClick={handleSaveToDrive}
                    className="px-3 py-2 flex items-center gap-2 text-[16px] text-gray-500 hover:text-blue-600 transition-colors"
                  >
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
                <button 
                  onClick={handleViewCV}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
                >
                  <Eye size={18} />
                  View CV
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
                >
                  <Download size={18} />
                  Download PDF
                </button>
                <button 
                  onClick={handleSaveCV}
                  className="px-6 py-2.5 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center gap-2"
                >
                  <Save size={18} />
                  Save
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

        {/* View CV Modal */}
        {showCVModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCVModal(false)}
          >
            <div 
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-800">CV Preview</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => setShowCVModal(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
                <h1 style={{ color: '#1476B7', borderBottom: '2px solid #1476B7', paddingBottom: '10px', marginBottom: '20px' }}>
                  {formData.fullName || 'Full Name'}
                </h1>
                <div style={{ marginBottom: '20px' }}>
                  <p><strong>Email:</strong> {formData.email || 'N/A'}</p>
                  <p><strong>Address:</strong> {formData.addressLine1 || ''} {formData.addressLine2 || ''}, {formData.town || ''}, {formData.city || ''}, {formData.eircode || ''}</p>
                </div>
                
                {formData.objective && (
                  <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ color: '#333', marginTop: '30px', marginBottom: '10px' }}>Objective</h2>
                    <p>{formData.objective}</p>
                  </div>
                )}
                
                {formData.educations && formData.educations.length > 0 && (
                  <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ color: '#333', marginTop: '30px', marginBottom: '10px' }}>Education</h2>
                    {formData.educations.map((edu, idx) => (
                      <div key={idx} style={{ marginBottom: '15px' }}>
                        <strong>{edu.schoolName || 'School Name'}</strong> - {edu.monthYear || 'Date'}<br />
                        {edu.examsTaken || ''} - {edu.subject || ''} ({edu.level || ''}) - {edu.result || ''}
                      </div>
                    ))}
                  </div>
                )}
                
                {formData.workExperiences && formData.workExperiences.length > 0 && (
                  <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ color: '#333', marginTop: '30px', marginBottom: '10px' }}>Work Experience</h2>
                    {formData.workExperiences.map((work, idx) => (
                      <div key={idx} style={{ marginBottom: '15px' }}>
                        <strong>{work.jobTitle || 'Job Title'}</strong> at {work.companyName || 'Company'}<br />
                        {work.city || ''}, {work.country || ''} | {work.startDate || ''} - {work.currentlyWork ? 'Present' : work.endDate || ''}<br />
                        <p>{work.description || ''}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {formData.skills && formData.skills.length > 0 && (
                  <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ color: '#333', marginTop: '30px', marginBottom: '10px' }}>Skills</h2>
                    <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                      {formData.skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {formData.interests && (
                  <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ color: '#333', marginTop: '30px', marginBottom: '10px' }}>Interests</h2>
                    <p>{formData.interests}</p>
                  </div>
                )}
                
                {formData.references && formData.references.length > 0 && (
                  <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ color: '#333', marginTop: '30px', marginBottom: '10px' }}>References</h2>
                    {formData.references.map((ref, idx) => (
                      <div key={idx} style={{ marginBottom: '15px' }}>
                        <strong>{ref.name || 'Name'}</strong> - {ref.position || 'Position'}<br />
                        Phone: {ref.contactPhone || 'N/A'} | Email: {ref.contactEmail || 'N/A'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
