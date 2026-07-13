import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Checkbox({ checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      disabled={disabled}
      className={`relative w-4 h-4 rounded border transition-all flex-shrink-0 ${
        checked
          ? "bg-[#00E5FF] border-[#00E5FF]"
          : "bg-[#1B1535] border border-white/20 hover:border-white/40"
      }`}
      aria-label="Toggle"
    >
      {checked && (
        <Check size={14} className="absolute inset-0 m-auto text-[#110D24]" strokeWidth={3} />
      )}
    </button>
  );
}
