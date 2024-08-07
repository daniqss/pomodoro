function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
        <path d="M11 7H8v10h3V7zM13 17h3V7h-3v10z" />
      </svg>
    );
  }
  
  export default PauseIcon;