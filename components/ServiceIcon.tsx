interface ServiceIconProps {
  name: string;
  className?: string;
}

export default function ServiceIcon({ name, className = "w-8 h-8" }: ServiceIconProps) {
  const icons: Record<string, React.ReactElement> = {
    truck: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
    van: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM3 5h11v10H3V5zm12 3h3l3 3v4h-6V8z"
      />
    ),
    snowflake: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07M12 6l-2 2m2-2l2 2m-2 8l-2-2m2 2l2-2M6 12l2-2m-2 2l2 2m8-2l2-2m-2 2l2 2"
      />
    ),
    cargo: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    ),
    warehouse: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 21V9l9-6 9 6v12M3 21h18M9 21v-6h6v6M9 12h6"
      />
    ),
  };

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {icons[name] || icons.truck}
    </svg>
  );
}
