import React, { useState } from 'react';
import { Compass, Mountain, Palmtree, Wallet } from 'lucide-react';
import { generateRecommendation } from '../utils/recommendations';
import { motion, AnimatePresence } from 'framer-motion';

type Choice = {
  beach?: string;
  activity?: string;
  budget?: string;
};

export default function DecisionTree() {
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState<Choice>({});
  const [showResult, setShowResult] = useState(false);

  const handleChoice = (key: keyof Choice, value: string) => {
    setChoices(prev => ({ ...prev, [key]: value }));
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetChoices = () => {
    setChoices({});
    setStep(1);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Travel Destination Finder
          </h1>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="space-y-8">
                  {step === 1 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                        <Mountain className="w-5 h-5" />
                        Do you prefer mountains or beach?
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {['Mountains', 'Beach'].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleChoice('beach', option)}
                            className="p-4 rounded-lg border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all duration-200"
                          >
                            {option === 'Mountains' ? (
                              <Mountain className="w-6 h-6 mx-auto mb-2" />
                            ) : (
                              <Palmtree className="w-6 h-6 mx-auto mb-2" />
                            )}
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                        <Compass className="w-5 h-5" />
                        Are you looking for adventure or relaxation?
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {['Adventure', 'Relaxation'].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleChoice('activity', option)}
                            className="p-4 rounded-lg border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all duration-200"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                        <Wallet className="w-5 h-5" />
                        What's your budget?
                      </h2>
                      <div className="grid grid-cols-3 gap-4">
                        {['Low', 'Medium', 'High'].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleChoice('budget', option)}
                            className="p-4 rounded-lg border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all duration-200"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Perfect Destination</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {generateRecommendation(choices)}
                  </p>
                </div>
                <button
                  onClick={resetChoices}
                  className="w-full py-3 px-6 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
                >
                  Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!showResult && (
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i === step ? 'bg-teal-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}