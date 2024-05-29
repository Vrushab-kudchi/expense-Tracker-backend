import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name should be at least 4 characters long" })
    .nonempty({ messge: "Name is Required" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .nonempty({ message: "Password is required" }),
  age: z
    .number()
    .int({ message: "Age must be a whole number" })
    .min(12, { message: "You must be at least 12 years old" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .nonempty({ message: "Password is required" }),
});

export const TransactionSchema = z.object({
  name: z.string().min(4, "name should be of at least 4 characters"),
  description: z
    .string()
    .min(10, "description should be of at least 10 characters"),
  money: z.number().gt(0, "it should be greater then 0"),
});

export const handleZodError = (data) => {
  const name = data.error.issues[0].path[0];
  const message = data.error.issues[0].message;
  return `${name} ${message}`.toLowerCase();
};
