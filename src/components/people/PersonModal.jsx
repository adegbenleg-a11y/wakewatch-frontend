import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { User, Mail, MapPin, GraduationCap, Image, Save } from 'lucide-react';
import { DETECTION_STATES } from '../../api/client';

export default function PersonModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student Fellow',
    cohort: 'Software Eng Cohort 4',
    location: 'Room B - Desk Pod 1',
    status: DETECTION_STATES.AWAKE,
    alertnessScore: 92,
    avatar: '',
  });

  const [error, setError] = useState('');

  const cohortOptions = [
    'Software Eng Cohort 4',
    'AI & Data Science C2',
    'Cybersecurity Cohort 3',
    'Frontend Engineering C4',
    'DevOps & Cloud Fellowship',
    'Staff / Hub Mentor',
  ];

  const defaultAvatars = [
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || 'Student Fellow',
        cohort: initialData.cohort || 'Software Eng Cohort 4',
        location: initialData.location || 'Room B - Desk Pod 1',
        status: initialData.status || DETECTION_STATES.AWAKE,
        alertnessScore: initialData.alertnessScore || 92,
        avatar: initialData.avatar || defaultAvatars[0],
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'Student Fellow',
        cohort: 'Software Eng Cohort 4',
        location: 'Room B - Desk Pod 1',
        status: DETECTION_STATES.AWAKE,
        alertnessScore: 95,
        avatar: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)],
      });
    }
    setError('');
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide the full name of the member.');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Person Profile' : 'Register New Cohort Member'}
      description={
        isEditing
          ? 'Update workstation assignment and cohort parameters.'
          : 'Enroll a student or engineer into the Bitnox Abeokuta alertness tracking perimeter.'
      }
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            icon={<Save className="w-4 h-4" />}
          >
            {isEditing ? 'Save Changes' : 'Enroll Person'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-status-sleeping-bg border border-status-sleeping-border text-xs text-status-sleeping-light">
            {error}
          </div>
        )}

        <Input
          label="Full Name"
          placeholder="e.g. Babatunde Adeleke"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          icon={<User className="w-4 h-4" />}
          required
        />

        <Input
          label="Bitnox Hub Email"
          type="email"
          placeholder="name@bitnoxsolution.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          icon={<Mail className="w-4 h-4" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wide">
              Cohort / Track
            </label>
            <select
              value={formData.cohort}
              onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
              className="w-full bg-bitnox-surface border border-bitnox-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-bitnox-primary cursor-pointer"
            >
              {cohortOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Workstation / Room"
            placeholder="e.g. Room B - Pod 2"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            icon={<MapPin className="w-4 h-4" />}
          />
        </div>

        {/* Avatar Preset Selector */}
        <div className="space-y-2 pt-1">
          <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wide">
            Select Profile Avatar Preset
          </label>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
            {defaultAvatars.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="Avatar preset"
                onClick={() => setFormData({ ...formData, avatar: url })}
                className={`w-10 h-10 rounded-xl object-cover cursor-pointer transition-all ${
                  formData.avatar === url
                    ? 'ring-2 ring-bitnox-primary scale-105'
                    : 'opacity-60 hover:opacity-100 ring-1 ring-bitnox-border'
                }`}
              />
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
