interface PlayIconProps {
    className?: string;
  }

const PlayIcon: React.FC<PlayIconProps> = ({ className }) => {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        <path d="M7 6v12l10-6z"></path>
      </svg>
    );
  };
  
  export default PlayIcon;