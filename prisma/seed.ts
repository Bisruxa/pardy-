import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedDatabase = async () => {
  try {
    const newUser = await prisma.user.findFirst();

    if (!newUser) {
      console.error("❌ Please create a user account first.");
      return;
    }

    // 1. Create Events
    const newEvents = await Promise.all([
      prisma.event.create({
        data: {
          name: "Tech Conference 2021",
          startOn: new Date("2024-09-10"),
          createdById: newUser.id,
          description: "A conference about the latest in tech.",
          streetNumber: 123,
          street: "Innovation Blvd",
          zip: 94043,
          bldg: "12A",
          isPrivate: false,
          status: "live",
        },
      }),
      prisma.event.create({
        data: {
          name: "Music Festival 2021",
          startOn: new Date("2024-10-05"),
          createdById: newUser.id,
          description: "Enjoy music from top artists from around the world.",
          streetNumber: 456,
          street: "Festival Road",
          zip: 94043,
          bldg: "9B",
          isPrivate: true,
          status: "draft",
        },
      }),
    ]);

    // 2. Create Attendees
    const newAttendees = await Promise.all([
      prisma.attendee.create({
        data: {
          email: "jesse.doe@example.com",
          name: "Jesse Doe",
        },
      }),
      prisma.attendee.create({
        data: {
          email: "alice.wonderland@example.com",
          name: "Alice Wonderland",
        },
      }),
    ]);

    console.log("✅ Attendees added:", newAttendees.length);

    // 3. Create RSVPs (every attendee RSVPs to every event)
    const rsvpData = newAttendees.flatMap((attendee) =>
      newEvents.map((event) => ({
        attendeeId: attendee.id,
        eventId: event.id,
        status: "going" as const, // type-safe
      }))
    );

    const newRSVPs = await Promise.all(
      rsvpData.map((rsvp) => prisma.rSVP.create({ data: rsvp }))
    );

    console.log("✅ RSVPs created:", newRSVPs.length);
    console.log("🌱 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Failed to seed database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
