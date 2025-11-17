
import React, { useState, useCallback } from 'react';

const ClipboardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

interface LetterPreviewProps {
    letter: string;
}

export const LetterPreview: React.FC<LetterPreviewProps> = ({ letter }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(letter).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [letter]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Bản xem trước</h2>
                <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200"
                >
                    {copied ? (
                        <>
                            <CheckIcon className="w-5 h-5" />
                            <span>Đã sao chép!</span>
                        </>
                    ) : (
                        <>
                            <ClipboardIcon className="w-5 h-5" />
                            <span>Sao chép</span>
                        </>
                    )}
                </button>
            </div>
            <div className="flex-grow bg-slate-50 rounded-lg p-4 whitespace-pre-wrap text-slate-700 overflow-y-auto font-mono text-sm leading-relaxed border border-slate-200">
                {letter || <span className="text-slate-400">Nội dung thư sẽ được hiển thị ở đây...</span>}
            </div>
        </div>
    );
};
