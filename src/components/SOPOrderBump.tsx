"use client";

import { useState } from "react";
import { Gift, Zap } from "lucide-react";

const bumpContents = [
    "50+ Advanced AI Prompts",
    "Industry-specific templates",
    "Prompt engineering guide",
    "Weekly prompt updates",
];

export function SOPOrderBump() {
    const [includeBump, setIncludeBump] = useState(false);

    return (
        <div
            className={`card mb-8 border-2 cursor-pointer transition-all ${includeBump
                    ? "border-gold-500 bg-gold-50"
                    : "border-dashed border-navy-300 hover:border-navy-400"
                }`}
            onClick={() => setIncludeBump(!includeBump)}
        >
            <div className="flex items-start gap-4">
                <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${includeBump
                            ? "bg-gold-500 border-gold-500"
                            : "border-navy-300"
                        }`}
                >
                    {includeBump && <span className="text-white text-xs">✓</span>}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-5 h-5 text-gold-600" />
                        <span className="font-semibold text-navy-800">
                            Add the AI Prompt Vault
                        </span>
                        <span className="text-gold-600 font-bold">+ $17</span>
                    </div>
                    <p className="text-sm text-navy-600 mb-3">
                        Expand your toolkit with 50+ additional prompts and templates!
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {bumpContents.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-navy-600">
                                <Zap className="w-3 h-3 text-gold-500" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
