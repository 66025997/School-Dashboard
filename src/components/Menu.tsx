import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const getDashboardPath = (role: string) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "teacher":
      return "/teacher";
    case "student":
      return "/student";
    case "parent":
      return "/parent";
    default:
      return "/";
  }
};

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const homePath = getDashboardPath(role);

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: "/home.png",
          label: "Home",
          href: homePath, // เปลี่ยน Home ไปตามบทบาทของผู้ใช้
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/teacher.png",
          label: "Teachers",
          href: "/list/teachers",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/student.png",
          label: "Students",
          href: "/list/students",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/parent.png",
          label: "Parents",
          href: "/list/parents",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/subject.png",
          label: "Subjects",
          href: "/list/subjects",
          visible: ["admin"],
        },
        {
          icon: "/class.png",
          label: "Classes",
          href: "/list/classes",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/lesson.png",
          label: "Lessons",
          href: "/list/lessons",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/exam.png",
          label: "Exams",
          href: "/list/exams",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/assignment.png",
          label: "Assignments",
          href: "/list/assignments",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/calendar.png",
          label: "Events",
          href: "/list/events",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/announcement.png",
          label: "Announcements",
          href: "/list/announcements",
          visible: ["admin", "teacher", "student", "parent"],
        },
      ],
    },
  ];

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-NSkyLight"
                >
                  <Image src={item.icon} alt="" width={30} height={30} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
