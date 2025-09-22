import React from 'react';
import { Globe, Users, MapPin } from 'lucide-react';

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Globe className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to InternBuddy
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Find your perfect internship match with AI-powered recommendations. 
          Choose your preferred language to get started with our conversational assistant.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
            <p className="text-gray-600">Students Helped</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <MapPin className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">500+</h3>
            <p className="text-gray-600">Partner Companies</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Globe className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">8</h3>
            <p className="text-gray-600">Regional Languages</p>
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Select Your Preferred Language
        </h2>
        <p className="text-gray-600 mb-8">
          Choose the language you're most comfortable with for the best experience
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onLanguageSelect(language.code)}
              className="group p-6 bg-gray-50 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-3xl mb-3">{language.flag}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                {language.name}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-blue-500">
                {language.nativeName}
              </p>
            </button>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> You can switch languages anytime during your conversation. 
            We also support voice input in your chosen language!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;