export type Category = "All" | "Web" | "Desktop" | "Design" | "IT";

export type Project = {
  title: string;
  description: string;
  tech: string;
  image: string;
  category: Category;
};

export const projects: Project[] = [
  {
    title: "BLS School Management System",
    description:
      "Student, Attendance, Payment, Score and Report Management System",
    tech: "C#, WinForms, SQL Server",
    image: "/projects/bls.png",
    category: "Desktop",
  },
  {
    title: "Digital Media Portfolio",
    description: "Photography, Video Editing and Design Portfolio",
    tech: "React, Next.js, Tailwind CSS",
    image: "/projects/media.png",
    category: "Design",
  },
  {
    title: "IT Support Dashboard",
    description: "Track support tickets and IT assets",
    tech: "Node.js, Express, MongoDB",
    image: "/projects/support.png",
    category: "Web",
  },
];