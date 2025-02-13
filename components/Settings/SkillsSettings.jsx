// app/settings/SkillsSettings.jsx
import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ===== STYLES & ANIMATIONS (place into your global CSS if you prefer) =====
const styles = `
@keyframes tiltRealistic {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(1.5deg) scale(1.01); }
  50%  { transform: rotate(-1.5deg) scale(0.99); }
  75%  { transform: rotate(1deg) scale(1); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-tiltRealistic {
  animation: tiltRealistic 6s infinite ease-in-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Modify the existing diagonal background lines for stronger effect */
.bg-diagonal-lines {
  background-image: linear-gradient(
    135deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%
  ),
  linear-gradient(
    225deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%
  ),
  linear-gradient(
    45deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%
  ),
  linear-gradient(
    315deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%
  );
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

/* A soft glowing border effect for skill boxes */
.hover-glow:hover {
  border-color: rgba(255,255,255,0.3) !important;
  box-shadow: 0 0 12px rgba(255,255,255,0.15), 0 0 30px rgba(255,0,255,0.1);
  transform: scale(1.06) translateZ(0);
}
`;

/**
 * ToggleSwitch component.
 */
function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex items-center h-7 w-12 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2
        ${checked
          ? 'bg-gradient-to-r from-green-400 to-green-600 focus:ring-green-500'
          : 'bg-gradient-to-r from-gray-300 to-gray-400 focus:ring-gray-500'
        }`}
    >
      <span
        className={`transform transition-all duration-200 ease-in-out inline-block w-6 h-6 bg-white rounded-full shadow-xl
          ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
      <span className="sr-only">{checked ? 'Enabled' : 'Disabled'}</span>
    </button>
  );
}

/**
 * SortableItem using dnd-kit for grid layout.
 */
function SortableItem({ id, index, name }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col items-center justify-center p-4 bg-gray-800 dark:bg-gray-200 rounded-lg border border-transparent hover:border-transparent shadow-md transition-transform duration-200"
    >
      <span className="mb-2 text-white dark:text-gray-800 font-bold text-lg">
        {index + 1}
      </span>
      <span className="text-white dark:text-gray-800 text-center font-medium">
        {name}
      </span>
    </div>
  );
}

/**
 * PriorityModal for reordering skills using dnd-kit in a grid view.
 */
const PriorityModal = ({ 
  isOpen, 
  onClose, 
  skills, 
  setSkills, 
  onReset 
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSkills((items) => {
      const oldIndex = items.findIndex(item => item.name === active.id);
      const newIndex = items.findIndex(item => item.name === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 animate-fadeInUp">
      <div
        className="relative bg-gray-900 dark:bg-gray-100 rounded-3xl p-10 w-full max-w-3xl shadow-2xl animate-tiltRealistic"
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white dark:text-gray-800 hover:text-red-500 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="mb-8 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-center">
          Set Skill Priorities
        </h2>
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={skills.map(skill => skill.name)} 
            strategy={rectSortingStrategy}
          >
            <div 
              className="grid grid-cols-3 gap-4 overflow-auto hide-scrollbar"
              style={{ maxHeight: 'calc(100vh - 300px)' }}
            >
              {skills.map((skill, index) => (
                <SortableItem 
                  key={skill.name} 
                  id={skill.name} 
                  index={index} 
                  name={skill.name} 
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        {/* Button Group */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
          <button 
            onClick={onReset}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-semibold transition-all shadow-lg"
          >
            Reset
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-semibold transition-all shadow-lg"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-semibold transition-all shadow-lg"
          >
            Save
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-400 dark:text-gray-600">
          Drag and drop to reorder your skills.
        </p>
      </div>
    </div>
  );
};

const SkillsSettings = () => {
  // Initial skills state (with more fields for demonstration)
  const initialIncludedSkills = [
    { name: 'API Development', active: true },
    { name: 'API Integration', active: true },
    { name: 'Android App Development', active: true },
    { name: 'Apache', active: true },
    { name: 'App Development', active: true },
    { name: 'Backend Development', active: true },
    { name: 'Blockchain', active: true },
    { name: 'Bootstrap', active: true },
    { name: 'Core PHP', active: true },
    { name: 'Cryptocurrency', active: true },
    { name: 'Database Development', active: true },
    { name: 'Desktop Application', active: true },
    { name: 'Electron JS', active: true },
    { name: 'ERP Software', active: true },
    { name: 'Express JS', active: true },
    { name: 'Facebook Marketing', active: true },
    { name: 'FastAPI', active: true },
    { name: 'Figma', active: true },
    { name: 'Full Stack Development', active: true },
    { name: 'Git', active: true },
    { name: 'Google Analytics', active: true },
    { name: 'GraphQL', active: true },
    { name: 'HTML', active: true },
    { name: 'JavaScript', active: true },
    { name: 'Machine Learning (ML)', active: true },
    { name: 'MongoDB', active: true },
    { name: 'MySQL', active: true },
    { name: 'Next.js', active: true },
    { name: 'Node.js', active: true },
    { name: 'PHP', active: true },
    { name: 'React Native', active: true },
    { name: 'React.js', active: true },
    { name: 'Redux.js', active: true },
    { name: 'Shopify', active: true },
    { name: 'Tailwind CSS', active: true },
    { name: 'TypeScript', active: true },
    { name: 'UI / User Interface', active: true },
    { name: 'UX / User Experience', active: true },
    { name: 'Vercel', active: true },
    { name: 'Web Design', active: true },
    { name: 'Web Development', active: true },
    { name: 'WordPress', active: true },
    { name: 'Zapier', active: true },
  ];

  const initialExcludedSkills = [
    'Python',
    'C# Programming',
    'Java',
    'Oracle',
    'Moodle',
    'Sharepoint',
    'Mac OS X'
  ];

  const [includedSkills, setIncludedSkills] = useState(initialIncludedSkills);
  const [excludedSkills, setExcludedSkills] = useState(initialExcludedSkills);
  const [showProjects, setShowProjects] = useState(false);
  const [newExcludedSkill, setNewExcludedSkill] = useState('');
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  // For priority modal, maintain a separate state copy so that reset/save work properly.
  const [prioritizedSkills, setPrioritizedSkills] = useState(includedSkills);

  // Toggle included skill state
  const toggleIncludedSkill = (idx) => {
    setIncludedSkills(prev =>
      prev.map((skill, i) =>
        i === idx ? { ...skill, active: !skill.active } : skill
      )
    );
  };

  // Remove an excluded skill
  const removeExcludedSkill = (idx) => {
    setExcludedSkills(prev => prev.filter((_, i) => i !== idx));
  };

  // Add a new excluded skill
  const addExcludedSkill = () => {
    if (newExcludedSkill.trim()) {
      setExcludedSkills(prev => [...prev, newExcludedSkill.trim()]);
      setNewExcludedSkill('');
    }
  };

  const openPriorityModal = () => {
    // Initialize modal with current included skills order.
    setPrioritizedSkills([...includedSkills]);
    setIsPriorityModalOpen(true);
  };

  const closePriorityModal = () => {
    setIsPriorityModalOpen(false);
  };

  const resetPriorities = () => {
    // Reset priorities to the initial included skills order.
    setPrioritizedSkills([...initialIncludedSkills]);
  };

  const savePriorities = () => {
    setIncludedSkills(prioritizedSkills);
    setIsPriorityModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10">
      {/* Insert custom styles */}
      <style>{styles}</style>

      <div className="max-w-6xl mx-auto space-y-16 animate-fadeInUp">
        {/* Manage Included Skills */}
        <section className="relative bg-white dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 overflow-hidden animate-tiltRealistic">
          {/* Animated background highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                Manage Included Skills
              </h1>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={openPriorityModal}
                  className="px-5 md:px-7 py-2 md:py-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition-transform transform hover:scale-105 shadow-md border border-gray-300 dark:border-gray-600"
                >
                  Set Priority
                </button>
                <button 
                  className="px-5 md:px-7 py-2 md:py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-transform transform hover:scale-105 shadow-lg"
                >
                  Sync Skills
                </button>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-8">
              <strong>Notice:</strong> These skills are currently synced to your profile.
              If a skill is missing, click on &ldquo;Sync Skills&rdquo; to update your list.
            </p>
            {/* Grid of Included Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {includedSkills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl transition-all transform hover:shadow-2xl hover-glow"
                >
                  <span 
                    className="flex-1 mr-2 text-lg font-medium text-gray-800 dark:text-gray-100 truncate"
                    title={skill.name}
                  >
                    {skill.name}
                  </span>
                  <ToggleSwitch 
                    checked={skill.active}
                    onChange={() => toggleIncludedSkill(idx)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold transition-all shadow-lg">
                Submit
              </button>
            </div>
          </div>
        </section>

        {/* Manage Excluded Skills */}
        <section className="relative bg-white dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="absolute inset-0 bg-diagonal-lines opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-400 mb-8">
              Manage Excluded Skills
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-8">
              <strong>Notice:</strong> Skills listed here will be excluded from auto-bidding.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Show projects for these skills on the search page?
              </span>
              <ToggleSwitch 
                checked={showProjects} 
                onChange={() => setShowProjects(!showProjects)} 
              />
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {excludedSkills.map((skill, idx) => (
                <div
                  key={skill}
                  className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-100 shadow-inner transition-transform hover:scale-105 hover:shadow-2xl"
                >
                  {skill}
                  <button
                    onClick={() => removeExcludedSkill(idx)}
                    className="ml-3 font-bold text-red-500 hover:text-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center mb-8 max-w-md bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Enter new skill"
                value={newExcludedSkill}
                onChange={(e) => setNewExcludedSkill(e.target.value)}
                className="w-full p-3 bg-transparent border-none placeholder-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none"
              />
              <button
                onClick={addExcludedSkill}
                className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white transition-transform transform hover:scale-105"
                title="Add Skill"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold transition-all shadow-lg">
                Submit
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Priority Modal */}
      <PriorityModal 
        isOpen={isPriorityModalOpen}
        onClose={closePriorityModal}
        skills={prioritizedSkills}
        setSkills={setPrioritizedSkills}
        onReset={resetPriorities}
      />
    </div>
  );
};

export default SkillsSettings;










