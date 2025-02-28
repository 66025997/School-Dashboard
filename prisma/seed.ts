import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

const getThaiDate = (date: Date) => {
  return new Date(date.setHours(date.getHours() + 7));
};

async function main() {
  console.log("🌱 Seeding data...");

  // ADMIN
  await prisma.admin.createMany({
    data: [
      { id: "admin1", username: "admin1" },
      { id: "admin2", username: "admin2" },
    ],
  });

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({ data: { level: i } });
  }

  // CLASS
  for (let i = 1; i <= 6; i++) {
    await prisma.class.create({
      data: {
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
  await prisma.subject.createMany({ data: subjectData });

  // TEACHER
  for (let i = 1; i <= 20; i++) {
    await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: (i % 10) + 1 }] },
        classes: { connect: [{ id: (i % 6) + 1 }] },
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
  
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[Object.keys(Day)[Math.floor(Math.random() * Object.keys(Day).length)] as keyof typeof Day],
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        subjectId: (i % 10) + 1,
        classId: (i % 6) + 1,
        teacherId: `teacher${(i % 15) + 1}`,
      },
    });
  }  


  // PARENT
  for (let i = 1; i <=10; i++) {
    await prisma.parent.create({
      data: {
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
    await prisma.student.create({
      data: {
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

  // EVENT
  for (let i = 1; i <= 3; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: getThaiDate(new Date(new Date().setHours(new Date().getHours() + 1))),
        endTime: getThaiDate(new Date(new Date().setHours(new Date().getHours() + 2))),
        classId: (i % 5) + 1,
      },
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 3; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: getThaiDate(new Date()),
        classId: (i % 5) + 1,
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

