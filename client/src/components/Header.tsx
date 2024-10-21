import GithubIcon from "./icons/githubIcon";
import PomodoroIcon from "./icons/pomodoroIcon";

function Header() {
  return (
    <header className="flex flex-row justify-between items-center border-b lg:my-4 lg:mb-16 lg:px-2 mb-8">
      <section className="flex flex-row space-x-2 items-center lg:my-3 my-1">
        <PomodoroIcon className="lg:w-8 lg:h-8 w-6 h-6 lg:mr-2" />
        <h1 className="lg:text-4xl text-2xl font-bold text-neutral-300">
          Pomodoro!
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
