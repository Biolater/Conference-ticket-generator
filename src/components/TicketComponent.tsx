import Logo from "../../images/logo-mark.svg";
import Avatar from "../../images/image-avatar.jpg";
import GithubIcon from "../../images/icon-github.svg";

const TicketComponent = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="ticket-component aspect-video max-w-[500px] mx-auto relative p-4">
        <div className="flex flex-col gap-3 sm:gap-6 md:gap-12 absolute left-4 top-[40%] -translate-y-1/2">
          <div className="flex items-start gap-3 sm:gap-4 text-white">
            <img
              className="size-7 sm:size-8 md:size-9 mt-2"
              src={Logo}
              alt="Logo"
            />
            <div className="flex flex-col items-start gap-1">
              <h3 className="sm:text-3xl text-xl font-medium">Coding Conf</h3>
              <p className="text-sm sm:text-base">Jan 31, 2025 / Austin, TX</p>
            </div>
          </div>
          <div className="flex gap-4 text-white items-center">
            <img
              className="sm:size-12 size-10 md:size-14 rounded-md"
              src={Avatar}
              alt="Avatar"
            />
            <div className="flex flex-col">
              <p className="sm:text-xl md:text-2xl text-lg font-medium">
                Jonathan Kristof
              </p>
              <div className="flex items-center gap-1 sm:gap-2">
                <img src={GithubIcon} alt="Github Icon" className="size-5" />
                <p className="sm:text-base text-sm">@jonathan_kristof</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[40%] -translate-y-1/2 right-4">
          <div className="text-neutral-500 font-semibold text-2xl id-number">
            <span>#01609</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketComponent;
