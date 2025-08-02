import "server-only";
import { delay } from "./delay";
import prisma from "@/lib/prisma";
import { memoize } from "nextjs-better-unstable-cache";

export const getRsvps = memoize(async (userId: number) => {
  await delay();
  

  // Step 1: Get event IDs for events created by the user
  const userEvents = await prisma.event.findMany({
    where: { createdById: userId },
    select: { id: true },
  });

  const eventIds = userEvents.map((event) => event.id);

  // If user has no events, return empty array early
  if (eventIds.length === 0) return [];

  // Step 2: Get RSVPs for these events
  const rsvps = await prisma.rSVP.findMany({
    where: {
      eventId: {
        in: eventIds,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      attendee: true,
      event: true,
    },
  });

  return rsvps;
},{
  persist:true,
  revalidateTags:['dashboard:rsvps']
})
