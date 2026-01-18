"use client";

import { useState, useEffect, useCallback } from "react";

const TIMER_KEY = "evergreen_timer_end";
const DEFAULT_DURATION_HOURS = 48;

interface TimerState {
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    totalMilliseconds: number;
}

/**
 * Evergreen countdown timer hook
 * Creates a persistent countdown that continues across sessions
 */
export function useEvergreenTimer(durationHours = DEFAULT_DURATION_HOURS): TimerState {
    const [endTime, setEndTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<TimerState>({
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false,
        totalMilliseconds: 0,
    });

    // Initialize timer on mount
    useEffect(() => {
        if (typeof window === "undefined") return;

        const stored = localStorage.getItem(TIMER_KEY);

        if (stored) {
            const storedEndTime = parseInt(stored, 10);
            if (!isNaN(storedEndTime)) {
                setEndTime(storedEndTime);
            }
        } else {
            // First visit - create new timer
            const newEndTime = Date.now() + durationHours * 60 * 60 * 1000;
            localStorage.setItem(TIMER_KEY, newEndTime.toString());
            setEndTime(newEndTime);
        }
    }, [durationHours]);

    // Update countdown every second
    useEffect(() => {
        if (!endTime) return;

        const updateTimer = () => {
            const now = Date.now();
            const diff = endTime - now;

            if (diff <= 0) {
                setTimeLeft({
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isExpired: true,
                    totalMilliseconds: 0,
                });
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({
                hours,
                minutes,
                seconds,
                isExpired: false,
                totalMilliseconds: diff,
            });
        };

        // Initial update
        updateTimer();

        // Update every second
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return timeLeft;
}

/**
 * Reset the evergreen timer (for testing or grace periods)
 */
export function resetEvergreenTimer(durationHours = DEFAULT_DURATION_HOURS): void {
    if (typeof window === "undefined") return;
    const newEndTime = Date.now() + durationHours * 60 * 60 * 1000;
    localStorage.setItem(TIMER_KEY, newEndTime.toString());
}

/**
 * Format timer for display
 */
export function formatTimer(timer: TimerState): string {
    if (timer.isExpired) {
        return "Offer Expired";
    }

    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(timer.hours)}:${pad(timer.minutes)}:${pad(timer.seconds)}`;
}

/**
 * Countdown Timer Display Component
 */
export function CountdownTimer({
    durationHours = 48,
    className = "",
}: {
    durationHours?: number;
    className?: string;
}) {
    const timer = useEvergreenTimer(durationHours);

    if (timer.isExpired) {
        return (
            <div className={`text-center ${className}`}>
                <p className="text-red-500 font-semibold">Offer Expired</p>
            </div>
        );
    }

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <TimeBlock value={timer.hours} label="Hours" />
            <span className="text-2xl font-bold text-gold-500">:</span>
            <TimeBlock value={timer.minutes} label="Min" />
            <span className="text-2xl font-bold text-gold-500">:</span>
            <TimeBlock value={timer.seconds} label="Sec" />
        </div>
    );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
    return (
        <div className="text-center">
            <div className="bg-navy-800 text-white text-2xl font-bold px-3 py-2 rounded-lg min-w-[60px]">
                {value.toString().padStart(2, "0")}
            </div>
            <p className="text-xs text-navy-500 mt-1">{label}</p>
        </div>
    );
}
