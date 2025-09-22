import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, MapPin, Book, Target, TrendingUp, Award, Globe } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import RecommendationCards from './components/RecommendationCards';
import CourseRecommendations from './components/CourseRecommendations';
import LanguageSelector from './components/LanguageSelector';

export interface UserProfile {
  name?: string;
  education?: string;
  skills?: string[];
  location?: string;
  preferences?: string;
  experience?: string;
  interests?: string[];
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'remote' | 'onsite' | 'hybrid';
  matchPercentage: number;
  matchReason: string;
  category: 'best-fit' | 'skill-growth' | 'aspirational';
  skills: string[];
  duration: string;
  stipend?: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  provider: 'SWAYAM' | 'Skill India';
  duration: string;
  level: string;
  description: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState<'language' | 'chat' | 'recommendations'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [recommendations, setRecommendations] = useState<Internship[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // Mock data for internships
  const mockInternships: Internship[] = [
    {
      id: '1',
      title: 'Data Analyst Intern',
      company: 'TechCorp India',
      logo: '📊',
      location: 'Bangalore',
      type: 'hybrid',
      matchPercentage: 95,
      matchReason: 'Perfect match for your Excel and data analysis skills',
      category: 'best-fit',
      skills: ['Excel', 'Data Analysis', 'SQL'],
      duration: '3 months',
      stipend: '₹15,000/month',
      description: 'Work with real-world datasets and create impactful business insights.'
    },
    {
      id: '2',
      title: 'Digital Marketing Trainee',
      company: 'GrowthLab',
      logo: '📱',
      location: 'Remote',
      type: 'remote',
      matchPercentage: 78,
      matchReason: 'Great opportunity to learn new digital marketing skills',
      category: 'skill-growth',
      skills: ['Social Media', 'Content Creation', 'Analytics'],
      duration: '4 months',
      stipend: '₹12,000/month',
      description: 'Learn end-to-end digital marketing while working on live campaigns.'
    },
    {
      id: '3',
      title: 'AI Research Assistant',
      company: 'FutureTech Labs',
      logo: '🤖',
      location: 'Mumbai',
      type: 'onsite',
      matchPercentage: 65,
      matchReason: 'Aspirational pick to push your potential in emerging tech',
      category: 'aspirational',
      skills: ['Python', 'Machine Learning', 'Research'],
      duration: '6 months',
      stipend: '₹25,000/month',
      description: 'Join cutting-edge AI research and contribute to breakthrough innovations.'
    }
  ];

  // Mock data for courses
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Advanced Excel for Business Analytics',
      provider: 'SWAYAM',
      duration: '8 weeks',
      level: 'Intermediate',
      description: 'Master advanced Excel techniques for data analysis and business intelligence.'
    },
    {
      id: '2',
      title: 'Digital Marketing Fundamentals',
      provider: 'Skill India',
      duration: '6 weeks',
      level: 'Beginner',
      description: 'Comprehensive introduction to digital marketing strategies and tools.'
    },
    {
      id: '3',
      title: 'Introduction to Machine Learning',
      provider: 'SWAYAM',
      duration: '12 weeks',
      level: 'Advanced',
      description: 'Learn the basics of machine learning algorithms and applications.'
    }
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentStep('chat');
  };

  const handleChatComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    // Generate recommendations based on profile
    setRecommendations(mockInternships);
    setCourses(mockCourses);
    setCurrentStep('recommendations');
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  InternBuddy
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Internship Matching</p>
              </div>
            </div>
            
            {currentStep !== 'language' && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleVoice}
                  className={`p-2 rounded-lg transition-all ${
                    isVoiceEnabled 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {isVoiceEnabled ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Globe className="h-4 w-4" />
                  <span className="uppercase">{selectedLanguage}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'language' && (
          <LanguageSelector onLanguageSelect={handleLanguageSelect} />
        )}
        
        {currentStep === 'chat' && (
          <ChatInterface
            language={selectedLanguage}
            isVoiceEnabled={isVoiceEnabled}
            onComplete={handleChatComplete}
          />
        )}
        
        {currentStep === 'recommendations' && (
          <div className="space-y-12">
            {/* User Profile Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-blue-600" />
                Your Profile Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Book className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium">{userProfile.education || 'Education'}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium">{userProfile.skills?.join(', ') || 'Skills'}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium">{userProfile.location || 'Location'}</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <RecommendationCards 
              internships={recommendations}
              language={selectedLanguage}
            />
            
            {/* Course Recommendations */}
            <CourseRecommendations 
              courses={courses}
              language={selectedLanguage}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Empowering Indian youth with AI-powered internship matching
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supporting accessibility across all regions and languages
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;