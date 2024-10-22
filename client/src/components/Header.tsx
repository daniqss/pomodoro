import { ReactNode } from "react";
import GithubIcon from "./icons/githubIcon";
import PomodoroIcon from "./icons/pomodoroIcon";

type HeaderProps = {
  children: ReactNode;
};

function Header({ children }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between items-center border-b lg:mb-16 lg:px-2 mb-8">
      <section className="flex flex-row space-x-2 items-center lg:my-3 my-1">
        <PomodoroIcon className="lg:w-8 lg:h-8 w-6 h-6 lg:mr-2" />
        <h1 className="lg:text-4xl text-2xl font-bold text-neutral-300">
          {children}
        </h1>
      </section>
      <section className="flex flex-row space-x-4">
        <a
          href="https://github.com/daniqss/pomodoro"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon className="lg:w-8 lg:h-8 w-6 h-6 lg:mr-2" />
        </a>
      </section>
    </header>
  );
}

export default Header;
