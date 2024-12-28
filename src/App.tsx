import { useEffect, useState } from "react";
import "./App.css";
import FormComponent from "./components/FormComponent";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [githubUsername, setGithubUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
      const storedFullName = localStorage.getItem("fullName");
      const storedEmail = localStorage.getItem("email");
      const storedGithubUsername = localStorage.getItem("githubUsername");
      const storedAvatarUrl = localStorage.getItem("avatarUrl");
      setFullName(storedFullName);
      setEmail(storedEmail);
      setGithubUsername(storedGithubUsername);
      setAvatarUrl(storedAvatarUrl);
  }, [updateTrigger]);
  return (
    <>
      <HeaderComponent fullName={fullName} email={email} />
      <FormComponent
        onSubmitSuccess={() => setUpdateTrigger((prev) => prev + 1)}
      />
    </>
  );
}

export default App;
