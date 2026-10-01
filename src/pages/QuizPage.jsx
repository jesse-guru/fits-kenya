import React from 'react';
import FitFinderQuiz from '../components/FitFinderQuiz';

export default function QuizPage({ products, onQuickView, onAddToCart }) {
  return (
    <div className="min-h-screen bg-fits-black py-6">
      <FitFinderQuiz
        products={products}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
