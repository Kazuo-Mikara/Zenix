import React from 'react';

/**
 * Duration Display Component
 * Shows formatted duration with customizable styles
 */
const DurationDisplay = ({
    minutes,
    format = 'smart',
    showIcon = true,
    className = ''
}) => {
    const formatDuration = (totalMinutes) => {
        if (!totalMinutes || totalMinutes < 0) return '0 min';

        const m = totalMinutes % 60;
        const h = Math.floor(totalMinutes / 60) % 24;
        const d = Math.floor(totalMinutes / (60 * 24)) % 30;
        const mo = Math.floor(totalMinutes / (60 * 24 * 30));

        const formats = {
            // Compact: "2d 2h"
            compact: () => {
                const parts = [];
                if (mo > 0) parts.push(`${mo}mo`);
                if (d > 0) parts.push(`${d}d`);
                if (h > 0 && mo === 0) parts.push(`${h}h`);
                if (m > 0 && d === 0 && mo === 0) parts.push(`${m}m`);
                return parts.slice(0, 2).join(' ') || '0m';
            },

            // Detailed: "2 days, 2 hours, 15 minutes"
            detailed: () => {
                const parts = [];
                if (mo > 0) parts.push(`${mo} ${mo === 1 ? 'month' : 'months'}`);
                if (d > 0) parts.push(`${d} ${d === 1 ? 'day' : 'days'}`);
                if (h > 0) parts.push(`${h} ${h === 1 ? 'hour' : 'hours'}`);
                if (m > 0) parts.push(`${m} ${m === 1 ? 'minute' : 'minutes'}`);
                return parts.join(', ') || '0 minutes';
            },

            // Smart: Adapts based on duration
            smart: () => {
                if (totalMinutes < 60) return `${totalMinutes}m`;
                if (totalMinutes < 1440) return `${h}h ${m}m`;
                if (totalMinutes < 43200) return `${d}d ${h}h`;
                return `${mo}mo ${d}d`;
            },

            // Hours only: "50.25 hours"
            hours: () => {
                const totalHours = (totalMinutes / 60).toFixed(2);
                return `${totalHours} ${totalHours === '1.00' ? 'hour' : 'hours'}`;
            }
        };

        return formats[format] ? formats[format]() : formats.smart();
    };

    return (
        <div className={`duration-display ${className}`}>
            {showIcon && <span className="duration-icon">⏱️</span>}
            <span className="duration-text">{formatDuration(minutes)}</span>
        </div>
    );
};

export default DurationDisplay;
