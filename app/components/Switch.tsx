interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  // Shown as a native hover tooltip and folded into the accessible name when disabled —
  // explains *why*, not just that it's off. Requires `disabled` to also be true.
  disabledReason?: string;
  "aria-label"?: string;
}

export default function Switch({
  checked,
  onChange,
  disabled = false,
  disabledReason,
  "aria-label": ariaLabel = "Toggle",
}: SwitchProps) {
  // aria-disabled (not the native `disabled` attribute) keeps the control focusable so
  // keyboard/screen-reader users can actually reach it and hear why it's inert, rather
  // than it silently disappearing from the tab order with no explanation.
  const accessibleLabel =
    disabled && disabledReason ? `${ariaLabel}. ${disabledReason}` : ariaLabel;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      aria-label={accessibleLabel}
      title={disabled ? disabledReason : undefined}
      onClick={() => {
        if (disabled) return;
        onChange(!checked);
      }}
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
