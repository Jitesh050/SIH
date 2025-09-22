import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, User, Bot } from 'lucide-react';
import { UserProfile } from '../App';

interface ChatInterfaceProps {
  language: string;
  isVoiceEnabled: boolean;
  onComplete: (profile: UserProfile) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const questions = {
  en: [
    "Hi there! I'm your InternBuddy assistant. What's your name?",
    "Nice to meet you! What's your highest level of education?",
    "What skills do you feel most confident about? (You can mention multiple)",
    "Where would you prefer to work? (City name or 'Remote')",
    "What type of work interests you the most?",
    "Do you have any prior work experience or internships?",
    "Perfect! Let me analyze your profile and find the best internship matches for you."
  ],
  hi: [
    "नमस्ते! मैं आपका InternBuddy सहायक हूं। आपका नाम क्या है?",
    "आपसे मिलकर खुशी हुई! आपकी सबसे उच्च शिक्षा क्या है?",
    "आपको किन कौशलों में सबसे अधिक विश्वास है? (आप कई बता सकते हैं)",
    "आप कहां काम करना पसंद करेंगे? (शहर का नाम या 'रिमोट')",
    "आपको किस प्रकार का काम सबसे दिलचस्प लगता है?",
    "क्या आपके पास कोई पूर्व कार्य अनुभव या इंटर्नशिप है?",
    "बहुत बढ़िया! मुझे आपकी प्रोफ़ाइल का विश्लेषण करने दें और आपके लिए सबसे अच्छे इंटर्नशिप मैच खोजूं।"
  ]
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ language, isVoiceEnabled, onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const currentQuestions = questions[language as keyof typeof questions] || questions.en;

  useEffect(() => {
    // Initialize with first question
    if (messages.length === 0) {
      addBotMessage(currentQuestions[0]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isVoiceEnabled && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isVoiceEnabled, language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string) => {
    setTimeout(() => {
      addMessage(text, 'bot');
    }, 500);
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    addMessage(currentInput, 'user');
    processUserInput(currentInput);
    setCurrentInput('');
  };

  const processUserInput = (input: string) => {
    const profile = { ...userProfile };

    switch (currentQuestionIndex) {
      case 0:
        profile.name = input;
        break;
      case 1:
        profile.education = input;
        break;
      case 2:
        profile.skills = input.split(',').map(s => s.trim());
        break;
      case 3:
        profile.location = input;
        break;
      case 4:
        profile.interests = input.split(',').map(s => s.trim());
        break;
      case 5:
        profile.experience = input;
        break;
    }

    setUserProfile(profile);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      addBotMessage(currentQuestions[nextIndex]);
    } else {
      // Chat complete, show processing message then redirect
      setTimeout(() => {
        onComplete(profile);
      }, 2000);
    }
  };

  const startVoiceRecognition = () => {
    if (recognitionRef.current && isVoiceEnabled) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">InternBuddy Assistant</h2>
              <p className="text-blue-100 text-sm">Let's find your perfect internship match!</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-3 bg-gray-50 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">
              {Math.min(currentQuestionIndex + 1, currentQuestions.length)} / {currentQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(Math.min(currentQuestionIndex + 1, currentQuestions.length) / currentQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'hi' ? 'अपना उत्तर लिखें...' : 'Type your answer...'}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {isVoiceEnabled && (
              <button
                onClick={startVoiceRecognition}
                disabled={isListening}
                className={`p-3 rounded-xl transition-all ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            )}
            
            <button
              onClick={handleSendMessage}
              disabled={!currentInput.trim()}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          {isListening && (
            <div className="mt-2 text-center">
              <p className="text-sm text-red-600">🎤 Listening... Speak now</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;