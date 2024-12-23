import CodingConfImage from "../../images/logo-full.svg";

const HeaderComponent = () => {
  return (
    <header className="text-neutral-0 text-center">
      <div className="container px-4 py-8">
        <div className="flex justify-center">
          <img
            src={CodingConfImage}
            className="max-w-44"
            alt="Coding Conf logo"
          />
        </div>
        <h1 className="text-3xl font-semibold mt-8">
          Your Journey to Coding Conf 2025 Start Here!
        </h1>
        <p className="mt-4 opacity-70 text-lg">
          Secure your spot at next year's biggest coding conference.
        </p>
      </div>
    </header>
  );
};

export default HeaderComponent;
