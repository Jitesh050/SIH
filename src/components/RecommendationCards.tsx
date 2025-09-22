import React from 'react';
import { MapPin, Clock, DollarSign, ExternalLink, Star, TrendingUp, Target } from 'lucide-react';
import { Internship } from '../App';

interface RecommendationCardsProps {
  internships: Internship[];
  language: string;
}

const categoryIcons = {
  'best-fit': Target,
  'skill-growth': TrendingUp,
  'aspirational': Star,
};

const categoryColors = {
  'best-fit': 'green',
  'skill-growth': 'blue',
  'aspirational': 'purple',
};

const categoryLabels = {
  en: {
    'best-fit': 'Best Fit',
    'skill-growth': 'Skill Growth',
    'aspirational': 'Aspirational Pick',
  },
  hi: {
    'best-fit': 'सबसे अच्छा फिट',
    'skill-growth': 'कौशल विकास',
    'aspirational': 'आकांक्षी चुनाव',
  },
};

const RecommendationCards: React.FC<RecommendationCardsProps> = ({ internships, language }) => {
  const labels = categoryLabels[language as keyof typeof categoryLabels] || categoryLabels.en;

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-50 text-green-700 border-green-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return colors[color as keyof typeof colors];
  };

  const getMatchBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    return 'bg-purple-500';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'hi' ? 'आपके लिए सिफारिशें' : 'Your Personalized Recommendations'}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {language === 'hi' 
            ? 'हमने आपकी प्रोफ़ाइल के आधार पर ये इंटर्नशिप चुनी हैं। प्रत्येक श्रेणी अलग लक्ष्य के लिए है।'
            : 'We\'ve curated these internships based on your profile. Each category serves a different purpose.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {internships.map((internship) => {
          const IconComponent = categoryIcons[internship.category];
          const colorClasses = getColorClasses(categoryColors[internship.category]);
          
          return (
            <div key={internship.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Category Badge */}
              <div className={`px-4 py-2 border-b text-center ${colorClasses}`}>
                <div className="flex items-center justify-center space-x-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="font-medium text-sm">
                    {labels[internship.category]}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Company Logo & Title */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-4xl">{internship.logo}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {internship.title}
                    </h3>
                    <p className="text-gray-600">{internship.company}</p>
                  </div>
                </div>

                {/* Match Percentage */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'hi' ? 'मैच' : 'Match'}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {internship.matchPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getMatchBarColor(internship.matchPercentage)}`}
                      style={{ width: `${internship.matchPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {internship.matchReason}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{internship.location}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
                      {internship.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{internship.duration}</span>
                  </div>
                  
                  {internship.stipend && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm font-medium text-green-600">
                        {internship.stipend}
                      </span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'आवश्यक कौशल:' : 'Required Skills:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6">
                  {internship.description}
                </p>

                {/* Apply Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>
                    {language === 'hi' ? 'आवेदन करें' : 'Apply Now'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationCards;