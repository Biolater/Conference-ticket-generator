import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import uploadIcon from "../../images/icon-upload.svg";
import { useRef, useState } from "react";

// Accepted file types and max size
const ACCEPTED_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5000 * 1024;

// Zod validation schema
const schema = z.object({
  avatar: z
    .instanceof(File, { message: "File is required" })
    .or(z.undefined())
    .superRefine((file, ctx) => {
      if (!file) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "File is required",
        });
        return;
      }
      let fileType = file?.type.split(";")[0];
      if (!fileType)
        fileType = file?.name.split(".").pop()?.toLowerCase() || "";
      if (!ACCEPTED_FILE_TYPES.includes(fileType)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File must be one of [${ACCEPTED_FILE_TYPES.join(
            ", "
          )}] but was ${fileType}`,
        });
      }
      if (file?.size && file?.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          message: `File too large. Please upload a photo under 5MB`,
          maximum: MAX_FILE_SIZE,
          inclusive: false,
          type: "number",
        });
      }
    }),
  fullName: z
    .string()
    .nonempty({ message: "Name is required" })
    .transform((name) => name.trim()),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .transform((email) => email.toLowerCase()),
  githubUsername: z
    .string()
    .nonempty({ message: "Username is required" })
    .transform((username) => username.trim()),
});

type FormComponentProps = {
  onSubmitSuccess: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onSubmitSuccess }) => {
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const dragAreaRef = useRef<HTMLDivElement | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const { register, handleSubmit, formState, setValue, trigger, clearErrors, reset } =
    useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
    });

  const onSubmit = (data: z.infer<typeof schema>) => {
    const { email, fullName, githubUsername } = data;
    localStorage.setItem("email", email);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("githubUsername", githubUsername);
    localStorage.setItem("avatarUrl", avatarUrl || "");
    setAvatarUrl(null)
    reset();
    onSubmitSuccess();
  };

  // Handle file input change
  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // test avatar from schema on file
      setValue("avatar", file);
      const isValid = await trigger("avatar");
      if (isValid) {
        const imageUrl = URL.createObjectURL(file);
        setAvatarUrl(imageUrl);
      }
    }
  };

  // Drag-and-drop event handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragAreaRef.current?.classList.add("border-orange-500");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const relatedTarget = e.relatedTarget as Node;
    if (!dragAreaRef.current?.contains(relatedTarget)) {
      dragAreaRef.current?.classList.remove("border-orange-500");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragAreaRef.current?.classList.remove("border-orange-500");

    const file = e.dataTransfer.files?.[0];
    if (file) {
      // test avatar from schema on file
      setValue("avatar", file);
      const isValid = await trigger("avatar");
      if (isValid) {
        const imgUrl = URL.createObjectURL(file);
        setAvatarUrl(imgUrl);
      }
    }
  };

  return (
    <form
      className="px-4 py-8 max-w-xl flex flex-col gap-5 text-neutral-0 container mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="avatar">Upload Avatar</label>
        <div
          ref={dragAreaRef}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 text-center justify-center flex flex-col items-center gap-4 transition-colors border-neutral-700 p-5 rounded-2xl border-dashed bg-neutral-300/10 backdrop-blur"
        >
          <div
            onClick={() => avatarInputRef.current?.click()}
            className="size-12 relative cursor-pointer border-neutral-700 bg-neutral-500/10 backdrop-blur flex place-content-center border rounded-xl"
          >
            {avatarUrl ? (
              <img
                className="rounded-xl object-cover w-full h-full"
                src={avatarUrl}
                alt="Avatar"
              />
            ) : (
              <img src={uploadIcon} alt="upload" />
            )}
          </div>
          {avatarUrl ? (
            <div className="flex gap-2">
              <button
                className="font-light text-sm bg-neutral-500/20 px-2 py-1 rounded-md"
                onClick={() => {
                  setAvatarUrl(null);
                  clearErrors("avatar");
                  setValue("avatar", undefined);
                }}
              >
                Remove Image
              </button>
              <button
                className="font-light text-sm bg-neutral-500/20 px-2 py-1 rounded-md"
                onClick={() => avatarInputRef.current?.click()}
              >
                Change Image
              </button>
            </div>
          ) : (
            <p className="text-neutral-400 text-base">
              Drag and drop or click to upload
            </p>
          )}
          <input
            type="file"
            className="absolute opacity-0 -z-10 top-0 left-0 right-0 bottom-0 w-0 h-0"
            onChange={handleAvatarChange}
            id="avatar"
            ref={(e) => {
              avatarInputRef.current = e;
              register("avatar", { required: true });
            }}
          />
        </div>
        {formState.errors.avatar &&
        typeof formState.errors.avatar.message === "string" ? (
          <p className="text-red-500 text-sm">
            {formState.errors.avatar.message}
          </p>
        ) : (
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="transparent"
              viewBox="0 0 16 16"
            >
              <path
                className="stroke-neutral-500"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
              />
              <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
              <path
                className="stroke-neutral-500"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.004 10.462V7.596M8 5.569v-.042"
              />
            </svg>
            <span className="text-[0.75rem] text-neutral-500">
              Upload your photo (JPG or PNG, max size: 500KB).
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          {...register("fullName")}
          className="outline-none border-2 focus:outline-2 focus:outline-neutral-700 border-neutral-700 p-3 rounded-xl bg-neutral-300/10 backdrop-blur"
          placeholder="e.g. Stephen King"
        />
        {formState.errors.fullName &&
          typeof formState.errors.fullName.message === "string" && (
            <p className="text-red-500 text-sm">
              {formState.errors.fullName.message}
            </p>
          )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          id="email"
          {...register("email")}
          className="outline-none border-2 focus:outline-2 focus:outline-neutral-700 border-neutral-700 p-3 rounded-xl bg-neutral-300/10 backdrop-blur"
          placeholder="example@email.com"
        />
        {formState.errors.email &&
          typeof formState.errors.email.message === "string" && (
            <p className="text-red-500 text-sm">
              {formState.errors.email.message}
            </p>
          )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="githubUsername">Github Username</label>
        <input
          type="text"
          id="githubUsername"
          {...register("githubUsername")}
          className="outline-none border-2 focus:outline-2 focus:outline-neutral-700 border-neutral-700 p-3 rounded-xl bg-neutral-300/10 backdrop-blur"
          placeholder="@yourusername"
        />
        {formState.errors.githubUsername &&
          typeof formState.errors.githubUsername.message === "string" && (
            <p className="text-red-500 text-sm">
              {formState.errors.githubUsername.message}
            </p>
          )}
      </div>
      <button
        type="submit"
        className="p-3 rounded-lg text-center w-full bg-orange-700 text-neutral-900 font-black"
      >
        Generate My Ticket
      </button>
    </form>
  );
};

export default FormComponent;
