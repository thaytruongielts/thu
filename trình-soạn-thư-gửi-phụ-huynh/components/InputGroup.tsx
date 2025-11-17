
import React from 'react';

interface InputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  isTextarea?: boolean;
  onAISuggest?: () => void;
  isGeneratingAI?: boolean;
}

const MagicWandIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M.2 10a.75.75 0 01.75-.75h4.162l1.22-2.44a.75.75 0 011.316 0l1.22 2.44h4.162a.75.75 0 010 1.5H8.858l-1.22 2.44a.75.75 0 01-1.316 0L5.122 10.75H.95a.75.75 0 01-.75-.75zM15 2a.75.75 0 01.75.75v4.162l1.22 2.44a.75.75 0 010 1.316l-1.22 2.44v4.162a.75.75 0 01-1.5 0V13.142l-1.22-2.44a.75.75 0 010-1.316l1.22-2.44V2.75A.75.75 0 0115 2z" clipRule="evenodd" />
    </svg>
);


export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  isTextarea = false,
  onAISuggest,
  isGeneratingAI = false,
}) => {
  const InputComponent = isTextarea ? 'textarea' : 'input';

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <InputComponent
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={isTextarea ? 4 : undefined}
          className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition disabled:bg-slate-50 disabled:text-slate-500"
          disabled={isGeneratingAI}
        />
        {onAISuggest && (
          <button
            type="button"
            onClick={onAISuggest}
            disabled={isGeneratingAI}
            className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-sky-600 bg-slate-100 hover:bg-sky-100 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Gợi ý bằng AI"
          >
            {isGeneratingAI ? (
                <div className="w-4 h-4 border-2 border-t-transparent border-sky-500 rounded-full animate-spin"></div>
            ) : (
                <MagicWandIcon className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
