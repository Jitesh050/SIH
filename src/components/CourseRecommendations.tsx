import React from 'react';
import { Book, Clock, Award, ExternalLink } from 'lucide-react';
import { Course } from '../App';

interface CourseRecommendationsProps {
  courses: Course[];
  language: string;
}

const CourseRecommendations: React.FC<CourseRecommendationsProps> = ({ courses, language }) => {
  const getProviderColor = (provider: string) => {
    return provider === 'SWAYAM' 
      ? 'bg-orange-100 text-orange-700 border-orange-200'
      : 'bg-green-100 text-green-700 border-green-200';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Beginner': 'bg-blue-100 text-blue-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Book className="h-6 w-6 mr-2 text-blue-600" />
          {language === 'hi' ? 'कौशल विकास के लिए कोर्स' : 'Skill Enhancement Courses'}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {language === 'hi' 
            ? 'अपनी प्रोफ़ाइल को मजबूत बनाने के लिए ये कोर्स करें। सभी कोर्स भारत सरकार के मान्यता प्राप्त प्लेटफॉर्म पर हैं।'
            : 'Strengthen your profile with these courses. All courses are from government-recognized platforms.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              {/* Provider Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getProviderColor(course.provider)}`}>
                  {course.provider}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>

              {/* Course Title */}
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                {course.title}
              </h3>

              {/* Duration */}
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{course.duration}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6">
                {course.description}
              </p>

              {/* Enroll Button */}
              <button className="w-full bg-white border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2">
                <Award className="h-4 w-4" />
                <span>
                  {language === 'hi' ? 'नामांकन करें' : 'Enroll Now'}
                </span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Award className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              {language === 'hi' ? 'क्यों करें ये कोर्स?' : 'Why Take These Courses?'}
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• {language === 'hi' ? 'सरकारी मान्यता प्राप्त प्रमाणपत्र' : 'Government-recognized certificates'}</li>
              <li>• {language === 'hi' ? 'नि:शुल्क या बहुत कम शुल्क' : 'Free or very low cost'}</li>
              <li>• {language === 'hi' ? 'इंटर्नशिप के लिए आवश्यक कौशल' : 'Skills required for internships'}</li>
              <li>• {language === 'hi' ? 'अपनी गति से सीखें' : 'Learn at your own pace'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRecommendations;