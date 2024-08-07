import GithubIcon from "./icons/githubIcon";
import PomodoroIcon from "./icons/pomodoroIcon";

function Header() {
  return (
    <header className="flex flex-row justify-between items-center border-b my-4 mb-16 px-2">
        <section className="flex flex-row space-x-2 items-center my-3">
            <PomodoroIcon className="w-8 h-8 mr-2"/>
            <h1 className="text-4xl font-bold text-neutral-300">Pomodoro!</h1>
        </section>
        <section className="flex flex-row space-x-4">
            <a 
                href="https://github.com/daniqss/pomodoro"
                target="_blank"
                rel="noreferrer"
            >
                <GithubIcon className="w-8 h-8"/>
            </a>
        </section>
    </header>
  );
}

export default Header;