import { PrismaClient, UserSex } from "@prisma/client"; 
const prisma = new PrismaClient();

const getThaiDate = (date: Date) => {
  return new Date(date.setHours(date.getHours() + 7));
};

// กำหนดค่า enum Day เอง
const Day = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
} as const;

async function main() {
  console.log("🌱 Seeding data...");

  // ADMIN (ใช้ upsert แทน createMany)
  await prisma.admin.upsert({
    where: { id: "user_2sRED6hIUAvzppvM4SPEH1b3Eii" },
    update: {},
    create: { id: "user_2sRED6hIUAvzppvM4SPEH1b3Eii", username: "admin1" },
  });

  await prisma.admin.upsert({
    where: { id: "user_2tjTLntihfCz47JFt9cCT3KwJRW" },
    update: {},
    create: { id: "user_2tjTLntihfCz47JFt9cCT3KwJRW", username: "admin2" },
  });

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.upsert({
      where: { level: i },
      update: {},
      create: { level: i },
    });
  }

  // CLASS
  for (let i = 1; i <= 6; i++) {
    await prisma.class.upsert({
      where: { name: `${i}A` },
      update: {},
      create: {
        name: `${i}A`,
        gradeId: i,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }

  // SUBJECT
  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];
  for (const subject of subjectData) {
    await prisma.subject.upsert({
      where: { name: subject.name },
      update: {},
      create: subject,
    });
  }

  // TEACHER
  for (let i = 1; i <= 20; i++) {
    await prisma.teacher.upsert({
      where: { id: `teacher${i}` },
      update: {},
      create: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        birthday: getThaiDate(new Date(new Date().setFullYear(new Date().getFullYear() - 30))),
      },
    });
  }

  const getRandomStartTime = () => {
    const minHour = 8;
    const maxHour = 15;
    const hours = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
    const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0);
    return startTime;
  };

  // LESSON
  for (let i = 1; i <= 20; i++) {
    const startTime = getRandomStartTime();
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);
    const dayKeys = Object.keys(Day) as (keyof typeof Day)[];
    const randomDay = Day[dayKeys[Math.floor(Math.random() * dayKeys.length)]];

    await prisma.lesson.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `Lesson${i}`,
        day: randomDay,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        subjectId: (i % 10) + 1,
        classId: (i % 6) + 1,
        teacherId: `teacher${(i % 15) + 1}`,
      },
    });
  }

  // PARENT
  for (let i = 1; i <= 10; i++) {
    await prisma.parent.upsert({
      where: { id: `parentId${i}` },
      update: {},
      create: {
        id: `parentId${i}`,
        username: `parentId${i}`,
        name: `PName${i}`,
        surname: `PSurname${i}`,
        email: `parent${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
      },
    });
  }

  // STUDENT
  for (let i = 1; i <= 20; i++) {
    await prisma.student.upsert({
      where: { id: `student${i}` },
      update: {},
      create: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        bloodType: "O-",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
        gradeId: (i % 6) + 1,
        classId: (i % 6) + 1,
        birthday: getThaiDate(new Date(new Date().setFullYear(new Date().getFullYear() - 10))),
      },
    });
  }

  console.log("✅ Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
