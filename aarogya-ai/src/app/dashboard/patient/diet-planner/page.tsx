"use client";

import { useState } from "react";
import { ChevronRight, RotateCcw, Salad, Droplets, Flame } from "lucide-react";

type Goal = "lose_weight" | "gain_weight" | "maintain" | "manage_diabetes" | "heart_health";
type Diet = "vegetarian" | "non_vegetarian" | "vegan";

interface MealPlan {
  meal: string;
  time: string;
  items: string[];
  calories: number;
}

const PLANS: Record<Goal, MealPlan[]> = {
  lose_weight: [
    { meal: "Breakfast", time: "7:00–8:00 AM", items: ["Oats with skim milk", "1 banana", "Green tea"], calories: 320 },
    { meal: "Mid-Morning Snack", time: "10:30 AM", items: ["Handful of almonds (10)", "1 apple"], calories: 180 },
    { meal: "Lunch", time: "1:00 PM", items: ["2 rotis (wheat)", "Dal + sabzi", "Salad", "Buttermilk"], calories: 480 },
    { meal: "Evening Snack", time: "4:30 PM", items: ["Roasted chana", "Lemon water"], calories: 130 },
    { meal: "Dinner", time: "7:30 PM", items: ["Brown rice (1 cup)", "Grilled fish / paneer", "Steamed vegetables"], calories: 420 },
  ],
  manage_diabetes: [
    { meal: "Breakfast", time: "7:00 AM", items: ["Vegetable upma (no sugar)", "2 boiled eggs", "Green tea (no sugar)"], calories: 310 },
    { meal: "Mid-Morning", time: "10:30 AM", items: ["Handful of walnuts", "Cucumber slices"], calories: 150 },
    { meal: "Lunch", time: "1:00 PM", items: ["2 multigrain rotis", "Methi dal", "Raita (no sugar)", "Salad"], calories: 450 },
    { meal: "Evening Snack", time: "4:30 PM", items: ["Sprout chaat", "Coconut water (unsweetened)"], calories: 140 },
    { meal: "Dinner", time: "7:00 PM", items: ["Quinoa / millets", "Palak tofu / chicken", "Sautéed vegetables"], calories: 390 },
  ],
  gain_weight: [
    { meal: "Breakfast", time: "7:30 AM", items: ["Paratha with ghee (2)", "Full-fat curd", "Banana shake"], calories: 620 },
    { meal: "Mid-Morning", time: "10:30 AM", items: ["Peanut butter toast", "Whole milk (1 glass)"], calories: 350 },
    { meal: "Lunch", time: "1:00 PM", items: ["Rice (2 cups)", "Rajma / chicken curry", "Salad", "Lassi"], calories: 750 },
    { meal: "Evening Snack", time: "4:30 PM", items: ["Dry fruits mix (50g)", "Protein shake or boiled eggs"], calories: 380 },
    { meal: "Dinner", time: "7:30 PM", items: ["3 rotis + ghee", "Paneer / mutton curry", "Dal", "Rice kheer (small)"], calories: 680 },
  ],
  maintain: [
    { meal: "Breakfast", time: "7:30 AM", items: ["Idli (3) + sambar", "Coconut chutney", "Filter coffee"], calories: 380 },
    { meal: "Mid-Morning", time: "10:30 AM", items: ["Seasonal fruit", "Handful of mixed nuts"], calories: 200 },
    { meal: "Lunch", time: "1:00 PM", items: ["2 rotis", "Sabzi + dal", "Curd", "Salad"], calories: 520 },
    { meal: "Evening Snack", time: "4:30 PM", items: ["Poha / upma", "Tea / green tea"], calories: 220 },
    { meal: "Dinner", time: "7:30 PM", items: ["Rice / 2 rotis", "Vegetable curry", "Dal"], calories: 480 },
  ],
  heart_health: [
    { meal: "Breakfast", time: "7:30 AM", items: ["Oats porridge", "Flaxseeds (1 tsp)", "Mixed berries"], calories: 290 },
    { meal: "Mid-Morning", time: "10:30 AM", items: ["Walnuts + almonds (10 each)", "Green tea"], calories: 160 },
    { meal: "Lunch", time: "1:00 PM", items: ["2 whole wheat rotis", "Beans curry", "Steamed vegetables", "Buttermilk"], calories: 490 },
    { meal: "Evening Snack", time: "4:30 PM", items: ["Sprouts salad", "Lemon water"], calories: 130 },
    { meal: "Dinner", time: "7:00 PM", items: ["Brown rice", "Grilled fish / dal", "Steamed broccoli"], calories: 420 },
  ],
};

const GOALS: { id: Goal; label: string; icon: string }[] = [
  { id: "lose_weight", label: "Lose Weight", icon: "⚖️" },
  { id: "gain_weight", label: "Gain Weight", icon: "💪" },
  { id: "maintain", label: "Maintain Weight", icon: "🎯" },
  { id: "manage_diabetes", label: "Manage Diabetes", icon: "🩸" },
  { id: "heart_health", label: "Heart Health", icon: "❤️" },
];

export default function DietPlannerPage() {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [diet, setDiet] = useState<Diet | null>(null);
  const [showPlan, setShowPlan] = useState(false);

  const plan = goal ? PLANS[goal] : [];
  const totalCal = plan.reduce((s, m) => s + m.calories, 0);

  const reset = () => { setGoal(null); setDiet(null); setShowPlan(false); };

  if (showPlan && goal) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-extrabold text-[#0F4024]">Your Meal Plan</h1>
          <button onClick={reset} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
            <RotateCcw className="w-4 h-4" /> Change goal
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-[#1A6B3C]/5 rounded-2xl p-3 text-center">
            <Flame className="w-5 h-5 text-[#1A6B3C] mx-auto mb-1" />
            <p className="text-lg font-extrabold text-[#1A6B3C]">{totalCal}</p>
            <p className="text-[10px] text-gray-400">Total kcal/day</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-3 text-center">
            <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-lg font-extrabold text-blue-600">2.5 L</p>
            <p className="text-[10px] text-gray-400">Water/day</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-3 text-center">
            <Salad className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <p className="text-lg font-extrabold text-orange-600">{plan.length}</p>
            <p className="text-[10px] text-gray-400">Meals/day</p>
          </div>
        </div>

        <div className="space-y-3">
          {plan.map((m) => (
            <div key={m.meal} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-800">{m.meal}</p>
                  <p className="text-xs text-gray-400">{m.time}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#1A6B3C]/10 text-[#1A6B3C]">
                  {m.calories} kcal
                </span>
              </div>
              <ul className="space-y-1">
                {m.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A6B3C] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-700">
          💡 This plan is a general guideline. Consult a registered dietitian for a personalised plan, especially if you have medical conditions.
        </div>
        <div className="h-20" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Diet & Nutrition Planner</h1>
      <p className="text-sm text-gray-400 mb-5">Get a personalised Indian meal plan based on your health goal</p>

      <p className="text-sm font-semibold text-gray-700 mb-3">What's your health goal?</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {GOALS.map(g => (
          <button key={g.id} onClick={() => setGoal(g.id)}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              goal === g.id ? "border-[#1A6B3C] bg-[#1A6B3C]/5" : "border-gray-200 hover:border-gray-300 bg-white"
            }`}>
            <span className="text-2xl mb-2 block">{g.icon}</span>
            <p className="font-bold text-sm text-gray-800">{g.label}</p>
          </button>
        ))}
      </div>

      {goal && (
        <>
          <p className="text-sm font-semibold text-gray-700 mb-3">Dietary preference</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { id: "vegetarian" as Diet, label: "Vegetarian", icon: "🥗" },
              { id: "non_vegetarian" as Diet, label: "Non-Veg", icon: "🍗" },
              { id: "vegan" as Diet, label: "Vegan", icon: "🌱" },
            ].map(d => (
              <button key={d.id} onClick={() => setDiet(d.id)}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  diet === d.id ? "border-[#1A6B3C] bg-[#1A6B3C]/5" : "border-gray-200 hover:border-gray-300 bg-white"
                }`}>
                <span className="text-2xl mb-1 block">{d.icon}</span>
                <p className="font-bold text-xs text-gray-700">{d.label}</p>
              </button>
            ))}
          </div>
        </>
      )}

      <button onClick={() => setShowPlan(true)} disabled={!goal || !diet}
        className="w-full py-3.5 rounded-2xl bg-[#1A6B3C] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40">
        Generate My Meal Plan <ChevronRight className="w-4 h-4" />
      </button>
      <div className="h-20" />
    </div>
  );
}
