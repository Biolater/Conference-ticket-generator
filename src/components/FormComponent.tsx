import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import uploadIcon from "../../images/icon-upload.svg";

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
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="px-4 py-8 text-neutral-0 container mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="avatar">Upload Avatar</label>
        <div className="border-2 text-center justify-center flex flex-col items-center gap-4 border-neutral-700 p-5 rounded-2xl border-dashed bg-neutral-300/10 backdrop-blur">
          <div className="size-12 border-neutral-700 bg-neutral-500/10 backdrop-blur p-1.5 flex place-content-center border rounded-xl">
            <img src={uploadIcon} alt="upload" />
          </div>
          {/* <input
            type="file"
            id="avatar"
            {...register("avatar", { required: true })}
          /> */}
          <p className="text-neutral-400 text-lg">Drag and drop or click to upload</p>
        </div>  
      </div>
    </form>
  );
};

export default FormComponent;
