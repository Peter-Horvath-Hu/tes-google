/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Plus, Trash2, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [numbers, setNumbers] = useState<number[]>([]);

  const addRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * 1000);
    setNumbers((prev) => [newNumber, ...prev]);
  };

  const clearNumbers = () => {
    setNumbers([]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        <div className="p-6 border-bottom border-zinc-100 bg-zinc-50/50">
          <h1 className="text-2xl font-semibold text-zinc-900 flex items-center gap-2">
            <Hash className="w-6 h-6 text-indigo-600" />
            Véletlen Számok
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Generálj véletlen számokat a listához</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-3">
            <button
              id="add-button"
              onClick={addRandomNumber}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-sm active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Hozzáadás
            </button>
            <button
              id="clear-button"
              onClick={clearNumbers}
              className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200 py-3 px-6 rounded-xl font-medium transition-colors active:scale-95"
            >
              <Trash2 className="w-5 h-5" />
              Törlés
            </button>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Lista ({numbers.length})</h2>
            </div>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {numbers.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-zinc-400 italic border-2 border-dashed border-zinc-100 rounded-xl"
                  >
                    Nincsenek számok a listában
                  </motion.div>
                ) : (
                  numbers.map((num, index) => (
                    <motion.div
                      key={`${num}-${index}-${Date.now()}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100 group hover:border-indigo-200 transition-colors"
                    >
                      <span className="text-lg font-mono font-medium text-zinc-700">{num}</span>
                      <span className="text-xs text-zinc-400 font-mono">#{numbers.length - index}</span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
