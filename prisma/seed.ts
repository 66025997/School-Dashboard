import { PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "adminnghin",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "adminmilk",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin3",
      username: "adminpin",
    },
  });

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: {
        level: i,
      },
    });
  }

  // // CLASS
  // for (let i = 1; i <= 6; i++) {
  //   await prisma.class.create({
  //     data: {
  //       name: `${i}A`,
  //       gradeId: i,
  //       capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
  //     },
  //   });
  // }

  // // SUBJECT
  // const subjectData = [
  //   { name: "Mathematics" },
  //   { name: "Science" },
  //   { name: "English" },
  //   { name: "History" },
  //   { name: "Geography" },
  //   { name: "Physics" },
  //   { name: "Chemistry" },
  //   { name: "Biology" },
  //   { name: "Computer Science" },
  //   { name: "Art" },
  // ];

  // for (const subject of subjectData) {
  //   await prisma.subject.create({ data: subject });
  // }

  // // TEACHER
  // for (let i = 1; i <= 5; i++) {
  //   await prisma.teacher.create({
  //     data: {
  //       id: `teacher${i}`,
  //       username: `teacher${i}`,
  //       name: `TName${i}`,
  //       surname: `TSurname${i}`,
  //       email: `teacher${i}@example.com`,
  //       phone: `123-456-789${i}`,
  //       address: `Address${i}`,
  //       bloodType: "A+",
  //       sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
  //       birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
  //     },
  //   });
  // }

  // PARENT
  for (let i = 1; i <= 5; i++) {
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

  // // STUDENT
  // for (let i = 1; i <= 10; i++) {
  //   await prisma.student.create({
  //     data: {
  //       id: `student${i}`,
  //       username: `student${i}`,
  //       name: `SName${i}`,
  //       surname: `SSurname${i}`,
  //       email: `student${i}@example.com`,
  //       phone: `987-654-321${i}`,
  //       address: `Address${i}`,
  //       bloodType: "O-",
  //       sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
  //       parentId: `parentId${(i % 5) + 1}`,
  //       gradeId: (i % 6) + 1,
  //       classId: (i % 6) + 1,
  //       birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
  //     },
  //   });
  // }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: (i % 5) + 1,
      },
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: (i % 5) + 1,
      },
    });
  }

  console.log("Seeding completed successfully.");
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
