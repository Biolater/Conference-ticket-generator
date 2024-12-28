import CodingConfImage from "../../images/logo-full.svg";

type Nullable<T> = T | null;

type HeaderComponentProps = {
  fullName: Nullable<string>;
  email: Nullable<string>;
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  fullName,
  email,
}) => {
  return (
    <header className="text-neutral-0 text-center">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-center">
          <img
            src={CodingConfImage}
            className="max-w-44"
            alt="Coding Conf logo"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl max-w-[26rem] sm:max-w-[31rem] md:text-5xl md:max-w-[41rem] mx-auto font-semibold mt-8 sm:mt-10 md:mt-12">
          {fullName ? (
            <>
              Congrats,{" "}
              <span className="bg-gradient-to-r from-text-gradient-from to-text-gradient-to text-transparent bg-clip-text">
                {fullName}
              </span>
              ! Your ticket is ready.
            </>
          ) : (
            "Your Journey to Coding Conf 2025 Start Here!"
          )}
        </h1>
        <p className={`mt-4 text-white/70 text-lg sm:text-xl sm:mt-6 ${email ? "max-w-lg mx-auto" : ""} `}>
          {email ? (
            <> We've emailed your ticket to <span className="text-orange-500">{email}</span> and will send updates in the run up to the event </>
          ) : (
            "Secure your spot at next year's biggest coding conference."
          )}
        </p>
      </div>
    </header>
  );
};

export default HeaderComponent;
