interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
}

export default function Switch({
  checked,
  onChange,
  disabled = false,
  "aria-label": ariaLabel = "Toggle",
}: SwitchProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative p-0 flex-shrink-0 transition-colors duration-300 ease-in-out ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      } ${checked ? "bg-[#00E5FF]/75" : "bg-white/20"}`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform duration-300 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
