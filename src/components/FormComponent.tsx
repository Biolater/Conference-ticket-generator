import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import uploadIcon from "../../images/icon-upload.svg";
import { useRef } from "react";

const ACCEPTED_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

const MAX_FILE_SIZE = 500 * 1024;

const schema = z.object({
  avatar: z.instanceof(File).superRefine((file, ctx) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `File must be one of [${ACCEPTED_FILE_TYPES.join(
          ", "
        )}] but was ${file.type}`,
      });
    }
    if (file.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        type: "number",
        message: `File too large. Please upload a photo under 500kb`,
        maximum: MAX_FILE_SIZE,
        inclusive: true,
      });
    }
  }),
  fullName: z.string().min(1).nonempty("Name is required"),
  email: z
    .string()
    .email()
    .nonempty("Email is required")
    .refine((email) => {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
      }
      return true;
    }),
  githubUsername: z.string().min(1).nonempty("Github username is required"),
});

const FormComponent = () => {
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Do something with the file, such as upload it to a server
      console.log(file);
    }
  };

  return (
    <form
      className="px-4 pt-8 pb-32 flex flex-col gap-5 text-neutral-0 container mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="avatar">Upload Avatar</label>
        <div
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            (e.target as HTMLDivElement).classList.add("border-neutral-500");
          }}
          className="border-2 text-center justify-center flex flex-col items-center gap-4 border-neutral-700 p-5 rounded-2xl border-dashed bg-neutral-300/10 backdrop-blur"
        >
          <div
            onClick={() => avatarInputRef.current?.click()}
            className="size-12 relative cursor-pointer border-neutral-700 bg-neutral-500/10 backdrop-blur p-1.5 flex place-content-center border rounded-xl"
          >
            <img src={uploadIcon} alt="upload" />
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
          <p className="text-neutral-400 text-base">
            Drag and drop or click to upload
          </p>
        </div>
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
              stroke="#D1D0D5"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.004 10.462V7.596M8 5.569v-.042"
            />
          </svg>
          <span className="text-[0.75rem] text-neutral-500">
            Upload your photo (JPG or PNG, max size: 500KB).
          </span>
        </div>
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
