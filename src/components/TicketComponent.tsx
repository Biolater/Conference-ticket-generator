import Logo from "../../images/logo-mark.svg";
import Avatar from "../../images/image-avatar.jpg";
import GithubIcon from "../../images/icon-github.svg";

const TicketComponent = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="p-[2px] bg-gradient-to-r from-white/20 via-[#352e58] to-[#5c4289] rounded-md">
        <div className="flex flex-col gap-6 p-4 backdrop-blur-md rounded-md">
          <div>
            <div className="flex items-start gap-3 text-white">
              <img className="size-7 mt-2" src={Logo} alt="Logo" />
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-3xl font-medium">Coding Conf</h3>
                <p>Jan 31, 2025 / Austin, TX</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-white items-center">
            <img className="size-12 rounded-md" src={Avatar} alt="Avatar" />
            <div className="flex flex-col">
              <p className="text-xl font-medium">Jonathan Kristof</p>
              <div className="flex items-center gap-2">
                <img src={GithubIcon} alt="Github Icon" className="w-5 h-5" />
                <p>@jonathan_kristof</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketComponent;
